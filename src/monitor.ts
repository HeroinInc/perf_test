import { PER_MON_FIXED_DIGITS } from './constants'
import { sleep } from './core'
import { randomUUID } from 'crypto'

export class PerformanceMonitor {
  marks: Map<string, number>

  constructor() {
    this.marks = new Map()
  }

  get uuid() {
    return randomUUID()
  }

  measureStart(): string {
    const mark = this.uuid
    const startTime = performance.now()
    this.marks.set(mark, startTime)
    return mark
  }

  measureEnd(mark: string): number {
    if (!mark) throw new Error('No mark passed.')

    const endTime = performance.now()
    const startTime = this.marks.get(mark)

    if (startTime === undefined) throw new Error('Start time not found.')

    const duration = endTime - startTime
    this.marks.delete(mark)

    return Number(duration.toFixed(PER_MON_FIXED_DIGITS))
  }

  measureFuncSync<F extends (...args: any[]) => any>(fn: F, ...args: Parameters<F>): number {
    const start = this.measureStart()
    fn(...args)
    return this.measureEnd(start)
  }

  measureFuncSyncTimes<F extends (...args: any[]) => any>(fn: F, ...args: Parameters<F>) {
    const self = this
    return function (times: number): number {
      let totalTime = 0

      for (let i = 0; i < times; i++) {
        totalTime += self.measureFuncSync(fn, ...args)
      }

      return Number((totalTime / times).toFixed(PER_MON_FIXED_DIGITS))
    }
  }

  /**@description in case of error returns max available number*/
  async measureFuncAsync<F extends (...args: any[]) => Promise<any>>(fn: F, ...args: Parameters<F>): Promise<number> {
    const start = this.measureStart()
    try {
      await fn(...args)
    } catch (e: any) {
      console.error(e)
      return Number.MAX_VALUE
    }
    return this.measureEnd(start)
  }

  async measureFuncAsyncWithReturnCheck<F extends (...args: any[]) => Promise<R>, R>(
    fn: F,
    chekResponseValue: R,
    ...args: Parameters<F>
  ): Promise<number> {
    const start = this.measureStart()
    try {
      const res = await fn(...args)
      if (res !== chekResponseValue) return Number.MAX_VALUE
    } catch (e: any) {
      console.error(e)
      return Number.MAX_VALUE
    }
    return this.measureEnd(start)
  }

  /**@description in case of error returns Infinity*/
  measureFuncAsyncTimes<F extends (...args: any[]) => Promise<any>>(fn: F, ...args: Parameters<F>) {
    const self = this
    return async function (times: number, delay: number = 0): Promise<number> {
      let totalTime = 0

      for (let i = 0; i < times; i++) {
        totalTime += await self.measureFuncAsync(fn, ...args)
        if (delay) await sleep(delay)
      }

      return Number((totalTime / times).toFixed(PER_MON_FIXED_DIGITS))
    }
  }
}
