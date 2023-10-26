# @passerelle/enclosure-vue

`@passerelle/enclosure-vue` is a Vue.js plugin that simplifies the integration of the `passerelle` library with Vue.js applications.
This plugin wraps the core `passerelle` enclosure concept and provides an easy-to-use interface for Vue and Nuxt applications.

## Passerelle Enclosure

The **Enclosure** is a fundamental concept in the `passerelle` library.
It serves as the parent-side component responsible for encapsulating iframes and managing communication with child components, known as **Insiders**.
The Enclosure ensures accurate transmission of SPA transition information, parent window size, iframe position, and other essential details between parent and child components.

## Support

- `vue` 2.6+ or 3.0+
- `vue-router` 3.0+ or 4.0+

NOTE: If you are using `vue` 2.6 or `vue-router` <3.6 , you must use the [Composition API](https://github.com/vuejs/composition-api)

## Usage

`@passerelle/enclosure-vue` allows you to harness the power of the `passerelle` Enclosure within your Vue and Nuxt applications with minimal effort. Here's how you can get started:

### 1. **Installation**: Install `@passerelle/enclosure-vue` in your project using npm or yarn

```bash
npm install @passerelle/enclosure-vue
```

### 2. Set the path to vue-router to use enclosure

Set the path to vue-router to use enclosure

e.g.

If you want to prepare a path for enclosure as `/bridge/(:pathMatch(.*)*)`
and the path following `/bridge/` is treated as a path following `https://(isnider-domain)/(this-paths)` in the iframe of insider.

```ts
import { createRouter } from 'vue-router'
import BridgeView from './pages/BridgeView.vue'

const router = createRouter({
  routes: [
    // ...
    {
      path: '/bridge/:pathMatch(.*)*',
      component: BridgeView
    }
  ]
})
export default router
```

### 3. **Import**: Import the plugin in your Vue application

e.g. If you are using Vue 3 with the composition API:

```vue
<script setup lang="ts">
import { useRoute } from 'vue-router'
import {
  PasserelleFrame,
  type ConvertEnclosurePathToInsiderPath,
  type ConvertInsiderPathToEnclosurePath
} from '@passerelle/enclosure-vue'

const route = useRoute()

const defaultPath = `http://(insider-app)${extractChildPath(route.path)}`

function extractChildPath(path: string): string {
  const [, matchedPath] = /^\/bridge(\/.*?)$/.exec(path) ?? []
  if (!matchedPath) {
    throw new Error(`invalid path: ${path}`)
  }
  return matchedPath
}

const parentToChild: ConvertEnclosurePathToInsiderPath = (location) => {
  return extractChildPath(location.path)
}

const childToParent: ConvertInsiderPathToEnclosurePath = ({ path, params }) => {
  if (path === '/') {
    return { path: '/' }
  }
  return { path: `/bridge${path}`, params }
}
</script>

<template>
  <PasserelleFrame
    class="frame"
    name="passerelle-bridge"
    origin="*"
    communicate-key="passerelle-example"
    :initial-src="defaultPath"
    :to-insider-path="parentToChild"
    :to-enclosure-path="childToParent"
    required-collab />
</template>

<style scoped>
.frame {
  border: 1px solid var(--color-border);
  width: 100%;
  height: 100%;
}
</style>
```

### 4. **Import**: Import the **insider** plugin in your another application

Please refer to the insider plugin.

## API

### Component: `<PasserelleFrame />`

#### Props

| Name                   | Type                                    | Required                            | Default | Description                                                                                                                                                                                    |
| ---------------------- | --------------------------------------- | ----------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                   | string                                  | true                                | -       | The name of the iframe.                                                                                                                                                                        |
| initial-src            | string                                  | false                               | -       | The src of the iframe.                                                                                                                                                                         |
| to-insider-path        | (location: Location) => string          | true                                | -       | The function to convert the location of the parent to the location of the insider.                                                                                                             |
| to-enclosure-path      | (location: NavigateMessage) => Location | true                                | -       | The function to convert the location of the insider to the location of the parent.                                                                                                             |
| origin                 | string                                  | true                                | -       | Specify the origin of postMessage. (Note: It is not recommended to set "\*")                                                                                                                   |
| collab-request-timeout | number                                  | false                               | 1000    | The timeout for the insider to request collaboration.                                                                                                                                          |
| required-collab        | boolean                                 | false                               | false   | If you want to assign an SPA to the insider, the insider plugin must be introduced, and this value must be set to true. (Note: this does not support the case where the insider is not an SPA) |
| communicate-key        | string                                  | true (if `required-collab` is true) | -       | insider side must set the same `communicate-key`                                                                                                                                               |

### Composable: `useCommunicator`

Get passerelle communicator.

```ts
import { useCommunicator } from '@passerelle/enclosure-vue'

// The argument is the same value as `name` of `<PasserelleFrame />`
const communicator = useCommunicator('bridge')
```

### Composable: `sendData`

Send some datas to insider.

Note: It is recommended not to send domain data.

- `name`: The argument is the same value as `name` of `<PasserelleFrame />`
- `key`: The key that the insider uses to identify the contents of the data.
- `data`: The data to send to the insider.

```ts
import { sendData } from '@passerelle/enclosure-vue'

sendData('bridge', 'login-user', loginUser)
```

### Composable: `onReceivedData`

Receive data from insider.

- `name`: The argument is the same value as `name` of `<PasserelleFrame />`
- `key`: The key that the insider uses to identify the contents of the data.
- `callback`: The callback function to receive data from the insider.

```ts
import { onReceivedData } from '@passerelle/enclosure-vue'

onReceivedData('bridge', 'login-user', (data) => {
  console.log('login-user', data)
})
```
