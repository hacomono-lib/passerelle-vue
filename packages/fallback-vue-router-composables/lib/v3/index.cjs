Object.defineProperties(exports, '__esModule', { value: true })

const { getCurrentInstance, onUnmounted } = require('vue-demi')
const { useRouter } = require('@intlify/vue-router-bridge')

function onBeforeRouteUpdate(callback) {
  const instance = getCurrentInstance()
  const router = useRouter()

  if (!instance) {
    throw new Error('instance is not found.')
  }

  let target = instance.proxy
  while(target?.$vnode?.data?.routerViewDepth == null) {
    target = target.$parent
  }

  const depth = target?.$vnode?.data?.routerViewDepth ?? null

  if (depth !== null) {
    const removeGuard = router.beforeEach((to, from, next) => {
      return isUpdateNavigation(to, from, depth) ? callback(to, from, next) : next()
    })

    onUnmounted(removeGuard)
  }
}

function isUpdateNavigation(to, from, depth) {
  const toMatched = to.matched
  const fromMatched = from.matched
  return toMatched.length >= depth && toMatched.slice(0, depth + 1).every((r, i) => r === fromMatched[i])
}

exports.default = { onBeforeRouteUpdate }
module.exports = exports.default
