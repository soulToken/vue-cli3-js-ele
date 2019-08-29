
let API = {};
const apiContext = require.context('./', true, /\.js$/)
apiContext.keys().forEach(component => {
  const apiConfig = apiContext(component)
  /**
  * 兼容 import export 和 require module.export 两种规范
  */
  const ctrlObj = apiConfig.default || apiConfig
	API = {...API, ...ctrlObj}
	// Object.assign(API,ctrlObj)
	// for(var i in ctrl){
	// 	API[i] = ctrl[i];
	// }
})
export default API;