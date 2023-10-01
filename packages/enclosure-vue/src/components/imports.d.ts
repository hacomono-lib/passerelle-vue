declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    BridgeFrame: typeof import('./BridgeFrame.vue')['default']
  }
}
