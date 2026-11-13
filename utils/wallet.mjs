export function getWalletProvider(browser = globalThis.window) {
  return browser?.ethereum || browser?.web3?.currentProvider || null;
}

// Keep callback-based injected wallets working without bundling Web3's
// signing, transport, and Swarm dependencies just to read an account.
export async function requestWallet(provider, method, params = []) {
  if (!provider) {
    throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
  if (typeof provider.request === 'function') {
    return provider.request({ method, params });
  }
  if (method === 'eth_requestAccounts' && typeof provider.enable === 'function') {
    return provider.enable();
  }
  const send = provider.sendAsync || provider.send;
  if (typeof send !== 'function') {
    throw new Error('This wallet does not support Ethereum RPC requests.');
  }
  return new Promise((resolve, reject) => {
    send.call(provider, {
      jsonrpc: '2.0',
      id: Date.now(),
      method: method === 'eth_requestAccounts' ? 'eth_accounts' : method,
      params,
    }, (error, response) => {
      if (error || response?.error) {
        reject(error || response.error);
      } else {
        resolve(response?.result);
      }
    });
  });
}
