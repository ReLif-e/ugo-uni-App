<template>
  <view>
    <!-- 搜索 -->
    <search />
    <!-- 分类 -->
    <view class="category">
      <!-- 顶级分类 -->
      <view class="sup">
        <scroll-view scroll-y>
          <text 
		  :class="{active: index===CreatedId }" 
		  v-for="item,index in categoryList" 
		  :key="item.cat_id"
		  @click="setActiveIndex(index)"
		  >
		  {{item.cat_name}}</text>

        </scroll-view>
      </view>
      <!-- 子级分类 -->
      <view class="sub">
        <scroll-view scroll-y>
          <!-- 封面图 -->
          <image src="http://static.botue.com/ugo/uploads/category.png" class="thumb"></image>
          <view class="children" v-for="item in subCategoryList" :key="item.cat_id">
            <view class="title">{{item.cat_name}}</view>
            <!-- 品牌 -->
            <view class="brands">
              <navigator :url="`/subpkg/pages/list/index?query=${brand.cat_name}`" v-for="brand in item.children" :key="brand.cat_id">
                <image :src="bannd.cat_icon"></image>
                <text>{{brand.cat_name}}</text>
              </navigator>
           
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
	// 导入组件
  import search from '@/components/search';

  export default {
	  
	  data(){
		  return{
			  categoryList:[],
			  CreatedId:0
		  }
	  },
	  
	// 注册组件
    components: {
      search
    },
	
	// 计算属性
	computed:{
		subCategoryList(){
			// 判断初始是否有数据
			// if(this.categoryList[this.CreatedId]){
			// 	return this.categoryList[this.CreatedId].children
			// }
		return this.categoryList[this.CreatedId] ? this.categoryList[this.CreatedId].children : []
		}
	},
	
	// 打开页面触发
	onLoad() {
		this.getCategoryList()
	},
	
	// 事件
	methods:{
		async getCategoryList(){
			const {data:res} =  await  uni.$http.get('/api/public/v1/categories');
			// console.log('数据',res)
			if(res.meta.status !== 200){
				return uni.showToast({
					title:'获取数据失败',
					icon:'none'
				})
			}
			// 获取的数据赋值给变量以便渲染
			this.categoryList = res.message
		},
		
		// 改变类得位置，通过下标
		setActiveIndex(index){
			this.CreatedId = index
		}
	}
  }
</script>

<style scoped lang="scss">
  scroll-view {
    height: 100%;
  }

  .category {
    display: flex;
    width: 100%;
    position: absolute;
    top: 100rpx;
    bottom: 0;

    .sup {
      width: 196rpx;
      background-color: #f4f4f4;

      text {
        display: block;
        height: 100rpx;
        text-align: center;
        line-height: 100rpx;
        font-size: 27rpx;
        color: #333;
        border-bottom: 1rpx solid #eee;

        &:last-child {
          border-bottom: none;
        }

        &.active {
          background-color: #FFF;
          color: #ea4451;
          position: relative;

          &::before {
            content: '';
            display: block;
            width: 8rpx;
            height: 60rpx;
            transform: translateY(-50%);
            background-color: #ea4451;

            position: absolute;
            left: 0;
            top: 50%;
          }
        }
      }
    }

    .sub {
      flex: 1;
      padding: 20rpx 18rpx;

      .thumb {
        width: 100%;
        height: 180rpx;
      }

      .children {
        text-align: center;
        color: #333;

        .title {
          display: inline-block;
          margin: 40rpx 0 20rpx;
          font-size: 30rpx;

          &::before {
            content: '/';
            margin-right: 20rpx;
            color: #666;
          }

          &::after {
            content: '/';
            margin-left: 20rpx;
            color: #666;
          }
        }
      }

      .brands {
        display: flex;
        flex-wrap: wrap;

        navigator {
          width: 33%;
          margin-bottom: 20rpx;
        }

        image {
          width: 120rpx;
          height: 120rpx;
        }

        text {
          display: block;
          font-size: 24rpx;
        }
      }
    }
  }
</style>
