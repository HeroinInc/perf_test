import {
  BINANCE_API,
  BYBIT_API,
  EExchanges,
  GATEIO_API,
  HUOBI_API,
  IS_ALIVE_ROUTE_BY_EXCHANGE,
  KRAKEN_API,
  KUCOIN_API,
  KUNA_API,
  POLONIEX_API,
  WHITEBIT_API,
} from './constants'
import axios, { AxiosRequestConfig } from 'axios'

export async function sleep(ms: number): Promise<any> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function getBaseApiLink(ex: EExchanges): string {
  switch (ex) {
    case EExchanges.Binance:
      return BINANCE_API
    case EExchanges.Kucoin:
      return KUCOIN_API
    case EExchanges.ByBit:
      return BYBIT_API
    case EExchanges.Huobi:
      return HUOBI_API
    case EExchanges.GateIo:
      return GATEIO_API
    case EExchanges.Poloniex:
      return POLONIEX_API
    case EExchanges.Kuna:
      return KUNA_API
    case EExchanges.WhiteBit:
      return WHITEBIT_API
    case EExchanges.Kraken:
      return KRAKEN_API
  }
}

export function getCheckerFunctionByExchange(ex: EExchanges): Function {
  switch (ex) {
    case EExchanges.Binance:
      return (data: any): boolean => data?.status === 0 && data?.msg === 'normal'
    case EExchanges.Kucoin:
      return (data: any): boolean => data?.code === '200000' && data?.data?.status === 'open'
    case EExchanges.ByBit:
      return (data: any): boolean => data?.retCode === 0 && data?.retMsg === 'OK'
    case EExchanges.Huobi:
      return (data: any): boolean => data?.status === 'ok'
    case EExchanges.GateIo:
      return (data: any): boolean => Boolean(data?.server_time)
    case EExchanges.Poloniex:
      return (data: any): boolean => Boolean(data?.serverTime)
    case EExchanges.Kuna:
      return (data: any): boolean => Boolean(data?.data?.timestamp)
    case EExchanges.WhiteBit:
      return (data: any): boolean => Boolean(data?.time)
    case EExchanges.Kraken:
      return (data: any): boolean => data?.result?.status === 'online'
  }
}

export async function checkIsAliveByExchange(ex: EExchanges): Promise<boolean> {
  const config: AxiosRequestConfig = {
    baseURL: getBaseApiLink(ex),
    url: IS_ALIVE_ROUTE_BY_EXCHANGE[ex].url,
    method: IS_ALIVE_ROUTE_BY_EXCHANGE[ex].method,
  }

  const { data } = await axios(config)
  return getCheckerFunctionByExchange(ex)(data)
}