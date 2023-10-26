const fs = require('fs')
const path = require('path')

const DEBUG = process.env.DEBUG

const dir = path.resolve(__dirname, '..', 'lib')

function loadModule(name) {
  try {
    return require(name)
  } catch (e) {
    DEBUG && error(e)
    return undefined
  }
}

function error(...args) {
  console.error(`[passerelle] `, ...args)
}

function warn(...args) {
  console.warn(`[passerelle] `, ...args)
}

function log(...args) {
  console.log(`[passerelle] `, ...args)
}

function copy(name, version, router, esm = false) {
  const src = path.join(dir, `v${version}`, name)
  const dest = path.join(dir, name)
  let content = fs.readFileSync(src, 'utf-8')
  content = esm
    ? content.replace(/from 'vue-router'/g, `from '${router}'`)
    : content.replace(/require\('vue-router'\)/g, `require('${router}')`)
  try {
    fs.unlinkSync(dest)
  } catch (error) { /* noop */ }
  fs.writeFileSync(dest, content, 'utf-8')
}

function checkVueRouter(pkg) {
  const router = loadModule(pkg)
  if (!router) {
    warn('Vue Router plugin is not found. Please run "npm install vue-router" to install.')
    return false
  }
  return true
}

function checkVCA() {
  const demi = loadModule('vue-demi')
  if (!demi) {
    return false
  }

  if (demi.Vue.version.startsWith('2.7.')) {
    return true
  }

  if (demi.Vue.version.startsWith('2.')) {
    const VCA = loadModule('@vue/composition-api')
    if (!VCA) {
      warn('Composition API plugin is not found. Please run "npm install @vue/composition-api" to install.')
      return false
    }
    return true
  }

  return false
}


function switchVersion(version, router) {
  router = router || 'vue-router'
  if (!checkVueRouter(router)) {
    return
  }

  if (version === 3 && !checkVCA()) {
    return
  }

  copy('index.cjs', version, router)
  copy('index.mjs', version, router, true)
  copy('index.d.ts', version, router, true)
}

module.exports.warn = warn
module.exports.log = log
module.exports.loadModule = loadModule
module.exports.switchVersion = switchVersion
