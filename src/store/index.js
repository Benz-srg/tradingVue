import { createStore } from 'vuex'

const slugs = {
  algorand: 'ALGO',
  bnb: 'BNB',
  bittorrent: 'BTT',
  cardano: 'ADA',
  bitcoin: 'BTC',
  polkadot: 'DOT',
  ethereum: 'ETH',
  solana: 'SOL',
  ripple: 'XRP'
}

export default createStore({
  state: {
    symbol: [
      'bnbusdt',
      'btcusdt',
      'ethusdt',
      'solusdt',
      'xrpusdt'
    ],
    tickers: {},
    infos: {},
    metas: {
      BNB: {
        name: 'BNB',
        slug: 'bnb',
        symbol: 'bnb',
        urls: {
          website: 'https://www.binance.com'
        },
        about: 'Launched in July 2017, Binance is the biggest cryptocurrency exchange globally based on daily trading volume. Binance aims to bring cryptocurrency exchanges to the forefront of financial activity globally.',
        logo: require('../assets/img/bnb.png')
      },
      BTC: {
        name: 'Bitcoin',
        slug: 'bitcoin',
        symbol: 'btc',
        urls: {
          website: 'https://bitcoin.org'
        },
        logo: require('../assets/img/btc.png')
      },
      ETH: {
        name: 'Ethereum',
        slug: 'ethereum',
        symbol: 'eth',
        urls: {
          website: 'https://www.ethereum.org'
        },
        logo: require('../assets/img/eth.png')
      },
      SOL: {
        name: 'Solana',
        slug: 'solana',
        symbol: 'sol',
        urls: {
          website: 'https://solana.com'
        },
        logo: require('../assets/img/sol.png')
      },
      XRP: {
        name: 'Ripple',
        slug: 'ripple',
        symbol: 'xrp',
        urls: {
          website: 'https://xrpl.org'
        },
        logo: require('../assets/img/xrp.png')
      }
    },
    units: {
      USDT: 'Tether'
    },
    baseUnits: 'usdt',
    graphOptions: {
      interval: '15m'
    },
    graphStats: {
      min: 0,
      max: 0
    }
  },
  getters: {
    topCurrencies: state => {
      return state.top.map(symbol => (({ about, logo, name, slug, symbol }) => ({ about, logo, name, slug, symbol }))(state.metas[symbol]))
    },
    getCurrencyBySlug: (state) => (slug) => {
      return state.metas[slugs[slug]] || {}
    },
    getTickerBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.tickers[pair] || {}
    },
    getInfoBySlug: (state) => (slug) => {
      const pair = slugs[slug].toLowerCase() + '' + state.baseUnits
      return state.infos[pair] || {}
    },
    getGraphStats: (state) => () => {
      return state.graphStats || {}
    }
  },
  mutations: {
    UPDATE_INFO: (state, payload) => {
      state.infos[payload.pair] = {
        ...state.infos[payload.pair],
        ...payload
      }
    },
    UPDATE_TICKER: (state, payload) => {
      state.tickers[payload.pair] = {
        ...state.tickers[payload.pair],
        ...payload
      }
    },
    UPDATE_GRAPH_OPTIONS: (state, payload) => {
      state.graphOptions = {
        ...state.graphOptions,
        ...payload
      }
    },
    UPDATE_GRAPH_STATS: (state, payload) => {
      state.graphStats = {
        ...state.graphStats,
        ...payload
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
