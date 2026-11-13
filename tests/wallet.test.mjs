import assert from 'node:assert/strict';
import test from 'node:test';
import { getWalletProvider, requestWallet } from '../utils/wallet.mjs';

test('SSR has no provider and modern wallets take precedence over legacy wallets', () => {
  assert.equal(getWalletProvider(), null);
  const modern = { request() {} };
  const legacy = { sendAsync() {} };
  assert.equal(getWalletProvider({ ethereum: modern, web3: { currentProvider: legacy } }), modern);
  assert.equal(getWalletProvider({ web3: { currentProvider: legacy } }), legacy);
});

test('connecting requests account permission through the injected wallet', async () => {
  const calls = [];
  const provider = { request: async (args) => { calls.push(args); return ['0x123']; } };
  assert.deepEqual(await requestWallet(provider, 'eth_requestAccounts'), ['0x123']);
  assert.deepEqual(calls, [{ method: 'eth_requestAccounts', params: [] }]);
});

test('a rejected permission request is returned without retrying a legacy API', async () => {
  const denial = Object.assign(new Error('User rejected request'), { code: 4001 });
  const provider = {
    request: async () => { throw denial; },
    enable: () => assert.fail('must not retry a rejected permission request'),
  };
  await assert.rejects(requestWallet(provider, 'eth_requestAccounts'), (error) => error === denial);
});

test('legacy wallets use enable for account permission when available', async () => {
  assert.deepEqual(await requestWallet({ enable: async () => ['0x456'] }, 'eth_requestAccounts'), ['0x456']);
});

for (const transport of ['sendAsync', 'send']) {
  test(`legacy ${transport} keeps provider context and reads exposed accounts`, async () => {
    const provider = {
      [transport](payload, callback) {
        assert.equal(this, provider);
        assert.equal(payload.method, 'eth_accounts');
        assert.equal(payload.jsonrpc, '2.0');
        callback(null, { result: ['0x789'] });
      },
    };
    assert.deepEqual(await requestWallet(provider, 'eth_requestAccounts'), ['0x789']);
  });
}

test('adding a network passes the single chain parameter without account data', async () => {
  const chain = { chainId: '0x38', rpcUrls: ['https://rpc.example.invalid'] };
  const calls = [];
  await requestWallet({ request: async (args) => { calls.push(args); return null; } }, 'wallet_addEthereumChain', [chain]);
  assert.deepEqual(calls, [{ method: 'wallet_addEthereumChain', params: [chain] }]);
});

test('legacy transport and RPC failures reject instead of reporting success', async () => {
  const transportError = new Error('disconnected');
  await assert.rejects(requestWallet({ sendAsync: (_args, cb) => cb(transportError) }, 'eth_accounts'), /disconnected/);
  const rpcError = { code: 4001, message: 'User rejected request' };
  await assert.rejects(requestWallet({ sendAsync: (_args, cb) => cb(null, { error: rpcError }) }, 'wallet_addEthereumChain', [{}]), (error) => error === rpcError);
});

test('missing and incompatible wallets return actionable errors', async () => {
  await assert.rejects(requestWallet(null, 'eth_requestAccounts'), /Non-Ethereum browser/);
  await assert.rejects(requestWallet({}, 'eth_requestAccounts'), /does not support/);
});
