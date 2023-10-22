declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

declare module '@intlify/vue-router-bridge' {
  export * from '@intlify/vue-router-bridge/lib/index.d.ts'
}
