# @passerelle/insider-vue

`@passerelle/insider-vue` is a Vue.js plugin that enables seamless integration of the `passerelle` library within Vue.js applications.
This plugin simplifies the integration of the `passerelle` Insider concept, allowing you to efficiently communicate with the `passerelle` Enclosure.

## Passerelle Insider

The **Insider** is a core concept in the `passerelle` library, serving as the child-side plugin responsible for communication with the parent-side Enclosure component. 
It facilitates the exchange of information between the parent and child components, including SPA transition data and other essential details.

## Support

- `vue` 2.6+ or 3.0+
- `vue-router` 3.0+ or 4.0+

NOTE: If you are using `vue` 2.6 or `vue-router` <3.6 , you must use the [Composition API](https://github.com/vuejs/composition-api)

## Usage

`@passerelle/insider-vue` allows you to harness the power of the `passerelle` Insider within your Vue and Nuxt applications with minimal effort. Here's how you can get started:

### 1. **Installation**: Install `@passerelle/insider-vue` in your project using npm or yarn

```bash
npm install @passerelle/insider-vue
```

### 2. **Import**: Import the plugin in your Vue application

e.g. If you are using Vue 3:

```ts
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { insider } from '@passerelle/insider-vue'

const app = createApp(App)

app.use(router)
app.use(insider, { router, key: 'passerelle-example', origin: '*' })

app.mount('#app')
```

e.g. If you are using Vue 2:

```ts
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'

import { insider } from '@passerelle/insider-vue'

Vue.use(VueRouter)
Vue.use(insider, { router, key: 'passerelle-example', origin: '*' })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

### ex. **Usage**: You can use the `insider` component in your Vue application

e.g. If you are using the composition API:

```vue
<script setup>
import { useCommunicator } from '@passerelle/insider-vue'

const { hooks } = useCommunicator()

hooks.on('navigate', (path) => {
  console.log('navigate', path)
})
</script>
```

## Api

### Composable: `useCommunicator`

Get passerelle communicator.

### Composable: `sendData`

Send data to enclosure.

Note: It is recommended not to send domain data.

- `key`: The key of the data to be sent.
- `data`: The data to be sent.

```ts
import { sendData } from '@passerelle/insider-vue'

sendData('login-user', loginUser)
```

### Composable: `onReceivedData`

Receive data from enclosure.

- `key`: The key of the data to be received.
- `callback`: The callback function to receive data from the enclosure.

```ts
import { onReceivedData } from '@passerelle/insider-vue'

onReceivedData('login-user', (data) => {
  console.log('login-user', data)
})
```

### Composable: `useFrameLayout`

Get the frame layout.

The value also changes when the layout changes on the enclosure side.

When using an iframe, absolute position elements such as modals do not appear in the center when viewed from outside the iframe, so this composable is used to obtain information to address this issue.


- `enclosure`
  - `window` .. The window size of the enclosure.
- `insider`
  - `window` .. The window size of the insider.
  - `offset` .. The offset of the insider.

```ts
import { useFrameLayout } from '@passerelle/insider-vue'

const layout = useFrameLayout()
```

### Context: `$passerelle`

`$passerelle` is added to the Vue context, and you can access the Communicator from here.

```vue
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  computed: {
    top(): number {
      this.$passerelle.layout.insider.offset.top
    }
  }
})
</script>
```
