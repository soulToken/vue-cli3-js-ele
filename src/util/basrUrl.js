const apis = '/'
let BASRURL;
console.log(process.env)

if(process.env.NODE_ENV === 'development'){ //uat  演示环境
  BASRURL = '/api'
}else if(process.env.NODE_ENV === 'test'){//tst  测试环境
  BASRURL = "http://tst-livebase-gw." + reLink
}else if(process.env.NODE_ENV === 'real'){  //线上
  BASRURL = "http://livebase-gw." + reLink
}else if(process.env.NODE_ENV === 'devser'){ //dev-  //开发环境
  BASRURL = "http://dev-livebase-gw." + reLink
}else{
  // BASRURL = "http://dev-game-api.yzkj.net"
  // BASRURL = "http://192.168.2.98:9390"
  // BASRURL = "http://172.16.168.166:9370" //杨青
  // BASRURL = "http://172.16.168.243:9370" + apis //李桂升
  // BASRURL = "http://172.16.168.195:9370" + apis //汪文
  BASRURL = "http://172.16.168.89:9370" + apis //吴龙
}
export default BASRURL;
