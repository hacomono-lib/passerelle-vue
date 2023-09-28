import type { InjectionKey } from 'vue-demi'

export interface Log {
  time: string
  event: string
  key?: string
  value: object
}

export const logKey: InjectionKey<Log[]> = Symbol('log')
