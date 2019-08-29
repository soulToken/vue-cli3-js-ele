let user = {
  state: {
    userInfo: {},
  },
  mutations: {
    UPDATE_USERINFOT(state,data){
      state.userInfo=data;
    },
  },
  actions: {
    setUserInfo(store,data){
      store.commit('UPDATE_USERINFOT', data);
    }
  },
  getters: {
   
  }
}
export default user
