// export default {
//   namespaced: true,
//   state() {
//     return {
// 		// mutations中把添加得数据加入本地，
// 		// 在每次打开页面得时候都在本地读取一下，如果没有就返回一个空数组
//       carts: uni.getStorageInfoSync('carts') || []
//     }
//   },

//   getters: {
// 	 cartCount(state){
// 		 return state.carts.length;
// 	 } ,
// 全选状态
	// allChecked(state){
	// 	return state.carts.every(item => item.goods_state)
	// }
//   },
  
//   mutations: {
// 	  addToCart(state,goods){
// 		  // console.log(state.carts)
// 		  // console.log(goods)
		  
// 		  // result是表示点击得商品在不在购物车当中
// 		  let result = state.carts.find(item => item.goods_id === goods.goods_id)
		  
// 		  // 如果购物车中没有那就加入到购物车中，如果有那就让商品得数量加一
// 		  if(!result){
// 		  state.carts.push(goods)
// 		  }else{
// 			  result.goods_count += 1
// 		  }
// 		  // 存入本地,调用存入本地的方法
// 		  this.commit('m_cart/saveToStorage')
// 	  },
	  
// 	  // 存入本地得方法
// 	  saveToStorage(state){
// 		  uni.setStorageSync('carts',state.carts)
// 	  },
	// 修改选中状态
	// toggerState(state,index){
	// state.carts[index].goods_state = !state.carts[index].goods_state;
	// }
//   }
// }



export default {
  namespaced: true,
  state() {
    return {
      carts: uni.getStorageSync('carts') || []
    }
  },

  getters: {
    cartCount(state) {
      // 购物车中商品数量统计出来
      return state.carts.length;
    },
	
	// 全选状态
	allChecked(state){
		return state.carts.every(item => item.goods_state)
	},
	
	// 选中状态商品数量
	checkedCount(state){
		// count是初始值，是每次去加得值，item是遍历的每一项
	return	state.carts.reduce((count,item)=>{
			if(!item.goods_state) return count
			
			return count += item.goods_count
		},0)
	}
	
  },

  mutations: {
    // 添加购物车
    addToCart(state, goods) {
      // 如果购物车中存在了相同的商品那就不要继添加了
      // 而是将其数量加 1

      // 查找购物车中相同的商品
      let result = state.carts.find(item => item.goods_id === goods.goods_id);
      if (!result) {
        // 如果没有找到相同的
        state.carts.push(goods);
      } else {
        // 如果找到相同的
        result.goods_count += 1
      }

      // 存入本地
      this.commit('m_cart/saveToStorage');
    },

    saveToStorage(state) {
      // 将购物车数据存入本地
      uni.setStorageSync('carts', state.carts)
    },
	
	// 修改选中状态
	toggerState(state,index){
	state.carts[index].goods_state = !state.carts[index].goods_state;
	
	// 修改状态后把状态存入本地，刷新不会丢失
	this.commit('m_cart/saveToStorage')
	},
	
	ToggleAll(state,goods_state){
		// 遍历carts里面得数据，把里面得goods_state得状态改变成传递来得状态并取反
		state.carts.forEach(item => item.goods_state = !goods_state)
		
		// 修改状态后把状态存入本地，刷新不会丢失11
		this.commit('m_cart/saveToStorage')
	},
	
	// 减法
	DelCount(state,index){
		if(state.carts[index].goods_count <= 1) return
		state.carts[index].goods_count -= 1
		
		// 修改状态后把状态存入本地，刷新不会丢失
		this.commit('m_cart/saveToStorage')
	},
	
	// 加法
	AddCount(state,index){
		state.carts[index].goods_count += 1
		
		// 修改状态后把状态存入本地，刷新不会丢失
		this.commit('m_cart/saveToStorage')
	}
	
	
  }
}