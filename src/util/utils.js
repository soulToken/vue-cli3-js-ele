import CryptoJS from 'crypto-js'
import store from '../store'
const utils = {
  /**
   * [parseTime description]  时间格式化函数
   * @param  {[type]} time    [时间对象]
   * @param  {[type]} cFormat [格式]
   * @return {[type]} timeStr [格式化后时间]
   */
  parseTime(time, cFormat) {
    if (arguments.length === 0) {
      return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    var date
    if (typeof time === 'object') {
      date = time
    } else {
      if (new Date(time) === 'Invalid Date') {
        date = new Date(time.substr(0, 10) + 'T' + time.substr(11, 8)) // 兼容safari写法
      } else {
        date = new Date(time)
      }
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    }
    const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      if (key === 'a') return ['日', '一', '二', '三', '四', '五', '六'][value]
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return timeStr
  },
  //序列化数据
  serialize(data) {
    let url = "";
    for (let k in data) {
        let value = data[k] != undefined ? data[k] : '';
        url += `&${k}=${encodeURIComponent(value)}`;
    }
    return url ? url.substring(1) : '';
  },
  //大于10个字符省略中间文字
  /**
   * @param {*} str 要分割的字符串
   * @param {*} len 长度限制 (默认为10)
   * 汉字为两个字符，符号英文为一个字符
   */
  getSubStr (str,len=10){
    if(str.replace(/[^\x00-\xff]/g,"01").length>len){
      var subStr1 = str.substr(0,2);
      var subStr2 = str.substr(str.length-2,2);
      var subStr = subStr1 + "..." + subStr2 ;
      return subStr;
    }else{
      return str
    }
  },
  /**
   * [formatPrice description] 价格规范展示
   * @param  {[type]} number [description] 传入值（带两位小数或者是整数）
   * @return {[type]} decimalStatus  [description] (是否带小数点,true代表不要小数点)
   */
  formatPrice(number, decimalStatus) {
    var decimalStatus = decimalStatus || false
    if (!number) number = 0
    var arr = (number + '').split('.')
    var integer = arr[0]
    var decimal = arr[1] || '00'
    decimal = decimal.substr(0, 2) //截取两位小数
    if (integer < 4) {
      if (decimalStatus) {
        return integer
      } else {
        return integer + '.' + decimal
      }
    } else {
      var r = integer.split('').reverse()
      var t = ''
      for (var i = 0; i < r.length; i++) {
        t += r[i] + ((i + 1) % 3 === 0 && (i + 1) !== r.length ? ',' : '')
      }
      if (decimalStatus) {
        return t.split('').reverse().join('')
      } else {
        return t.split('').reverse().join('') + '.' + decimal
      }
    }
  },
   //格式化时间格式
   formatTime(obj){
    let date = obj.offset
    for(let key in date){
      if(date[key]<10){
        date[key] = '0'+ date[key]
      }
    }
    if(date.years>0){
      return  date.year +'年'+ date.months +'月'+ date.days + '天'+ date.hours+':'+date.minutes+':'+date.seconds
    }else if(date.months>0){
      return  date.months +'月'+ date.days + '天'+ date.hours+':'+date.minutes+':'+date.seconds
    }else if(date.days >0){
      return date.days + '天'+ date.hours+':'+date.minutes+':'+date.seconds
    }else if(date.hours >0){
      return  date.hours+':'+date.minutes+':'+date.seconds
    }else if(date.minutes >0){
      return  date.minutes+':'+date.seconds
    }else if(date.seconds > 0){
      return  date.seconds +'s'
    }
  },
  //加密
  encrypt(password, tokenKey){ 
    //加密数据
    tokenKey = CryptoJS.enc.Utf8.parse(tokenKey);
    password = CryptoJS.enc.Utf8.parse(password);
    // AES CBC加密模式
    let encrypt = CryptoJS.AES.encrypt(password, tokenKey, {iv: tokenKey, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    return encrypt.toString();
  },
  //解密
  decrypt(password, tokenKey){  
    tokenKey = CryptoJS.enc.Utf8.parse(tokenKey);
    let  decrypt = CryptoJS.AES.decrypt(password, tokenKey, {iv: tokenKey,mode:CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  },
  //权限匹配
  /**
   * 
   * @param {*} str [权限参数]
   */
  permissions(str){
    let matchStr = store.state.user.permissions.find(item=> item === str)
    return matchStr?true:false
  },
  //将时间戳转化为24H标准时间
  changeTimestamp(values) {
    let date = new Date(values);

    let Y = date.getFullYear();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let time = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
    return time;
  },
	//获取当月1号的年月日时间
	getMonthonedayTime(values) {
		let date = new Date(values);
		
		let Y = date.getFullYear();
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		let time = Y + '-' + M + '-01';
		return time
	},
	/**
	 * 导出excel
	 * urls:	请求下载地址 参数需做好拼接
	 * name:	自定义下载名
	 * call:	返回回调
	 * */
	downloadExcel(urls, name, call){
		let _self = this;
		let xmlResquest = new XMLHttpRequest();
		xmlResquest.open("get", urls, true);
		xmlResquest.setRequestHeader("appid", localStorage.getItem("uid"));
		xmlResquest.setRequestHeader("authorization", localStorage.getItem("jwt"));
		xmlResquest.responseType = "blob";
		xmlResquest.onload = function (oEvent) {
			let content = xmlResquest.response;
			if(content.type == "application/json"){ //非文件流格式统一返回权限限制
				let data = {
					code: 400,
					msg: "没有下载权限"
				}
				if(call) return call(data)
				return;
			}
			let elink = document.createElement('a');
			elink.download = `${name}_${_self.parseTime(new Date(), '{y}{m}{d}')}.xls`;
			elink.style.display = 'none';
			let blob = new Blob([content]);
			elink.href = URL.createObjectURL(blob);
			document.body.appendChild(elink);
			elink.click();
			document.body.removeChild(elink);
			if(call) return call({code:200});
		};
		xmlResquest.send();
  },
  //将金额超过三位间隔逗号,并向下取保留两位小数.
	toolMoney(values) {
    return parseInt(values * 100) / 100
    // let result = '';
    // if((values!== 0 && values == undefined) || (values!== 0 && values == "") ){
    //   result = '';
    //   return result;
    // }else if(values == 0 && (values != undefined || values != '')){
    //   result = 0;
    //   return result;
    // }else{
    //   let vals  = (Math.abs(parseInt(values * 100) / 100)).toString();
    //   let ints = '',flots = '';
    //   if(vals.indexOf('.') > -1){
    //     ints = vals.substr(0,vals.indexOf('.'))
    //     flots = vals.substr(vals.indexOf('.'))
    //   }else{
    //     ints = vals;
    //   }
    //   let num = (ints || 0).toString();
    //   while (num.length > 3) {
    //     result = ',' + num.slice(-3) + result;
    //     num = num.slice(0, num.length - 3);
    //   }
    //   if (num) { 
    //     if(values > 0){
    //       result = num + result; 
    //       result = result + flots;
    //     }else{
    //       result = num + result; 
    //       result = '-' + result + flots;
    //     }
    //   }
    //   return result
    // }
  },
  handleNumber(ID) {
    if (/^[0-9]+$/.test(ID)) {
      return true
    }else {
     return false
    }
  },

}
export default utils
// this.pageSize = 20; //展示类的pageSize最低为20  操作Dom类的为10
// 分页中page-size列表中统一为
// :page-sizes="[ 20, 30, 50, 100]"
// 重置 或 重新筛选  this.pageSize = 20;
// DatePicker 日期控件暂时不使用:picker-options 
// 输出的时间格式format参考element日期格式。