import {
  ERROR,
  STORE_UPDATED,
  CONFIGURE,
  ACCOUNT_CONFIGURED,
  ACCOUNT_CHANGED,
  TRY_CONNECT_WALLET,
} from './constants';

import stores from './'

import { getWalletProvider, requestWallet } from '../utils/wallet.mjs';

class Store {
  constructor(dispatcher, emitter) {

    this.dispatcher = dispatcher
    this.emitter = emitter

    this.store = {
      account: null,
      provider: null,
    }

    dispatcher.register(
      function (payload) {
        switch (payload.type) {
          case CONFIGURE:
            this.configure(payload);
            break;
          case TRY_CONNECT_WALLET:
            this.tryConnectWallet(payload)
            break;
          default: {
          }
        }
      }.bind(this)
    );
  }

  getStore(index) {
    return(this.store[index]);
  };

  setStore(obj) {
    this.store = {...this.store, ...obj}
    return this.emitter.emit(STORE_UPDATED);
  };

  configure = async () => {
  };

  updateAccount = () => {
    const that = this
    const res = window.ethereum.on('accountsChanged', function (accounts) {
      that.setStore({ account: { address: accounts[0] } })
      that.emitter.emit(ACCOUNT_CHANGED)
      that.emitter.emit(ACCOUNT_CONFIGURED)
    })
  }

  tryConnectWallet = async () => {
    try {
      const provider = getWalletProvider();
      const accounts = await requestWallet(provider, 'eth_requestAccounts');
      this.setStore({ account: { address: accounts[0] }, provider });
      this.emitter.emit(ACCOUNT_CONFIGURED)
    } catch (error) {
      stores.emitter.emit(ERROR, error.message ? error.message : error);
    }
  }
}

export default Store;
