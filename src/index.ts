import { EExchanges } from './constants'
import { checkIsAliveByExchange, sleep } from './core'
import { PerformanceMonitor } from './monitor'

async function main() {
  const mon = new PerformanceMonitor()
  const runCondition = 1

  while (runCondition) {
    const measures: { [Exchange in keyof typeof EExchanges]?: number } = {
      Binance: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Binance),
      ByBit: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.ByBit),
      Huobi: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Huobi),
      Poloniex: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Poloniex),
      WhiteBit: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.WhiteBit),
      Kraken: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Kraken),
      // Kuna: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Kuna),
      Kucoin: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.Kucoin),
      GateIo: await mon.measureFuncAsyncWithReturnCheck(checkIsAliveByExchange, true, EExchanges.GateIo),
    }
    console.clear()
    console.table(measures)
    await sleep(3_000)
  }
}

main().then()
