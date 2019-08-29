import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
const files = require.context('.', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  if (key === './index.js' || key === './motations-types.js') return
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    ...modules
  },
  plugins: debug ? [createLogger()] : []
})
export default store