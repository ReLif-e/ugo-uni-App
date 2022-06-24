import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 导入 cart 模块
import cartModule from './cart';

const store = new Vuex.Store({
  state: {
    msg: '测试 vuex 是否正常运行...'
  },
  modules: {
    'm_cart': cartModule
  }
})

export default store;