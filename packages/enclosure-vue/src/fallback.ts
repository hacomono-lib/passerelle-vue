import { getCurrentInstance, onUnmounted } from 'vue-demi'
import { useRouter, isVueRouter4, type RouteLocationNormalized } from '@intlify/vue-router-bridge'
import { ensureNotNil } from 'type-assurer'

/**
 * vue-router 3.5 では存在しないため、fallback として定義する
 */
export async function onBeforeRouteUpdate(
  callback: (to: RouteLocationNormalized, from: RouteLocationNormalized, next: () => void) => void
): Promise<void> {
  // await 前に実施しないと、current instance でなくなり、エラーになる (呼び出し元で await しないため.)
  const instance = ensureNotNil(getCurrentInstance(), 'instance is not found.')
  const router = useRouter()

  // onBeforeRouteUpdate が存在しない可能性があるため、動的に import する
  const vueRouter = await import('vue-router')

  if (vueRouter.onBeforeRouteUpdate) {
    vueRouter.onBeforeRouteUpdate(callback)
    return
  }

  // vue-router 4 には必ず有るはず
  if (isVueRouter4) {
    throw new Error('vue-router.onBeforeRouteUpdate is not found.')
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let target = instance.proxy as any
  while (target?.$vnode?.data?.routerViewDepth == null) {
    target = target.$parent
  }

  const depth = target?.$vnode?.data?.routerViewDepth ?? null

  if (depth != null) {
    const removeGuard = router.beforeEach((to, from, next) => {
      return isUpdateNavigation(to, from, depth) ? callback(to, from, next) : next()
    })

    onUnmounted(removeGuard)
  }
}

/**
 *
 */
function isUpdateNavigation(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  depth: number
): boolean {
  const toMatched = to.matched
  const fromMatched = from.matched
  return toMatched.length >= depth && toMatched.slice(0, depth + 1).every((r, i) => r === fromMatched[i])
}
