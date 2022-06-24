<template>
  <!-- 搜索 -->
  <div class="search" :class="{ focused: focused }">
    <!-- 搜索框 -->
    <div class="input-wrap" @click="goSearch">
      <input class="input"    @confirm="addHistory" v-model="query" @input="input" type="text" :placeholder="placeholder" />
      <span class="cancle" @click.stop="cancleSearch">取消</span>
    </div>
    <!-- 搜索结果 -->
    <div class="content">
      <div class="title">
        搜索历史
        <span class="clear" @click="remove"></span>
      </div>
      <div class="history">
        <navigator v-for="item in queryHistory " 
		:key="item"
		 class="navigator" 
		 :url="`/subpkg/pages/list/index?queery=${item}`"
		 
		 >{{item }}</navigator>
       
      </div>
      <!-- 结果 -->
      <scroll-view scroll-y class="result" v-if="searchList.length">
        <navigator
		 class="navigator" 
		 v-for="item in searchList"
		 :key="item.goods_id"
		 :url="`/subpkg/pages/goods/index?id=${item.goods_id}`"

		 >
		 {{item.goods_name}}
		 </navigator>
       
      </scroll-view>
    </div>
  </div>
</template>

<script>
	// 导入鲁大师防抖函数
	import {debounce} from 'lodash'
export default {
  data() {
    return {
      focused: false,
      placeholder: '',
	  query:'',
	  searchList:'',
	  queryHistory: uni.getStorageSync('history') || []
    };
  },
  methods: {
    goSearch(ev) {
      this.focused = true;
      this.placeholder = '请输入您要搜索的内容';

      // 触发父组件自定义事件
      this.$emit('search', {
        pageHeight: uni.getSystemInfoSync().windowHeight
      });

      // 隐藏tabBar
      uni.hideTabBar();
    },
    cancleSearch() {
      this.focused = false;
      this.placeholder = '';

      // 触发父组件自定义事件
      this.$emit('search', {
        pageHeight: 'auto'
      });

      // 显示tabBar
      uni.showTabBar();
    },
	// 防抖
	input:debounce(async function(){
		if(this.query.trim() === '') return
		const {data:res} = await uni.$http.get('/api/public/v1/goods/search',{
			query:this.query
		});
		
		// 如果返回值有问题,退出函数
		if(res.meta.status !== 200){
			return uni.showToast({
				title: '获取数据失败',
				icon:"none"
			});
		}
		console.log(res)
		
		// 重新赋值
	  this.searchList = res.message.goods
	},1000),
	
	addHistory(){
		if( this.queryHistory.includes(this.query)) return
 		   this.queryHistory.push(this.query)
		   console.log(this.queryHistory)
		    // uni.setStorageSync('history', this.queryHistory);
			uni.setStorageSync('history', this.queryHistory);
	},
	
	// 删除本地
	remove(){
		this.queryHistory = []
		uni.removeStorageSync('history')
		console.log('1')
		
	}
   }
  }
		
	// 获取用户输入得数据
 // 	async input(){
	// 	// console.log(this.query)
	// 	//发送请求
	// 	const {data:res} = await uni.$http.get('/api/public/v1/goods/search',{
	// 		query:this.query
	// 	})
		
	// 	// 如果返回值有问题,退出函数
	// 	if(res.meta.status !== 200){
	// 		return uni.showToast({
	// 			title: '获取数据失败',
	// 			icon:"none"
	// 		});
	// 	}
	// 	console.log(res)
		
	// 	// 重新赋值
	// 	this.searchList = res.message
	// }
//   }
// };
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;

  // 搜索框
  .input-wrap {
    display: flex;
    height: 100rpx;
    padding: 20rpx 30rpx;
    background-color: #ea4451;
    box-sizing: border-box;
    position: relative;

    &::before,
    &::after {
      height: 44rpx;
      line-height: 1;
      background-image: url(http://static.botue.com/ugo/images/icon_search%402x.png);
      background-size: 32rpx;
      background-position: 6rpx center;
      background-repeat: no-repeat;

      position: absolute;
      top: 28rpx;
      z-index: 9;
    }

    &::before {
      content: '搜索';
      display: block;

      width: 100rpx;
      padding: 11rpx 0 10rpx 44rpx;
      box-sizing: border-box;
      color: #666;
      font-size: 24rpx;
      left: 325rpx;
    }

    &::after {
      display: none;
      content: '';
      width: 44rpx;
      left: 40rpx;
    }

    .input {
      flex: 1;
      height: 60rpx;
      padding: 0 20rpx 0 64rpx;
      background-color: #fff;
      border-radius: 8rpx;
      font-size: 24rpx;
      color: #666;
    }

    span.cancle {
      display: none;
      width: 80rpx;
      text-align: right;
      line-height: 60rpx;
      font-size: 27rpx;
      color: #666;
    }
  }

  // 搜索结果
  .content {
    display: none;
    flex: 1;
    padding: 27rpx;
    background-color: #fff;
    position: relative;

    .title {
      font-size: 27rpx;
      line-height: 1;
      color: #333;
    }

    .clear {
      display: block;
      width: 27rpx;
      height: 27rpx;
      float: right;
      background-image: url(http://static.botue.com/ugo/images/clear.png);
      background-size: cover;
    }

    .history {
      padding-top: 30rpx;

      .navigator {
        display: inline-block;
        line-height: 1;
        padding: 15rpx 20rpx 12rpx;
        background-color: #ddd;
        font-size: 24rpx;
        margin-right: 20rpx;
        margin-bottom: 15rpx;
        color: #333;
      }
    }

    .result {
      // display: none;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;

      .navigator {
        line-height: 1;
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #666;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }

  // 获得焦点状态
  &.focused {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;

    .input-wrap {
      background-color: #eee;

      &::before {
        display: none;
      }

      &::after {
        display: block;
      }
    }

    span.cancle {
      display: block;
    }

    .content {
      display: block;
    }
  }
}
</style>
