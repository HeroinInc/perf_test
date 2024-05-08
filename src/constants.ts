import { HTTPSMETHODS, IRouteEntity } from './interfaces'


export const PER_MON_FIXED_DIGITS = 2
export const HUOBI_API = 'https://api.huobi.pro'
export const BINANCE_API = 'https://api.binance.com'
export const BYBIT_API = 'https://api.bybit.com'
export const GATEIO_API = 'https://api.gateio.ws/api/v4'
export const KRAKEN_API = 'https://api.kraken.com'
export const KUCOIN_API = 'https://api.kucoin.com'
export const KUNA_API = 'https://api.kuna.io'
export const POLONIEX_API = 'https://api.poloniex.com'

export const WHITEBIT_API = 'https://whitebit.com'

export const enum EExchanges {
  Binance = 'Binance',
  Kucoin = 'Kucoin',
  ByBit = 'ByBit',
  Huobi = 'Huobi',
  GateIo = 'GateIo',
  Poloniex = 'Poloniex',
  Kuna = 'Kuna',
  WhiteBit = 'WhiteBit',
  Kraken = 'Kraken',
}

export const IS_ALIVE_ROUTE_BY_EXCHANGE: { [ExchangeName in keyof typeof EExchanges]: IRouteEntity } = {
  ByBit: {
    url: '/v3/public/time',
    method: HTTPSMETHODS.GET,
  },
  GateIo: {
    url: '/spot/time',
    method: HTTPSMETHODS.GET,
  },
  Huobi: {
    method: HTTPSMETHODS.GET,
    url: `/v1/common/timestamp`,
  },
  Kraken: {
    url: '/0/public/SystemStatus',
    method: HTTPSMETHODS.GET,
  },
  Kucoin: {
    url: '/api/v1/status',
    method: HTTPSMETHODS.GET,
  },
  Kuna: {
    method: HTTPSMETHODS.GET,
    url: '/v4/public/timestamp',
  },
  Poloniex: {
    url: '/timestamp',
    method: HTTPSMETHODS.GET,
  },
  WhiteBit: {
    url: '/api/v4/public/time',
    method: HTTPSMETHODS.GET,
  },
  Binance: {
    method: HTTPSMETHODS.GET,
    url: '/sapi/v1/system/status',
  },
}