<template>
  <view class="index">
    <view class="logos">
      <image src="@/static/logo.png" mode="widthFix"></image>
    </view>
    <view class="swipers swipers1">
		 <u-swiper
			:list="list1"
			@change="change"
			@click="godetail"
			:previousMargin="40"
			:nextMargin="40"
			height="880rpx"
			circular
			:current="(active-1)"
			:autoplay="false"
			radius="5"
			bgColor=""
		></u-swiper>
		<view class="swiper-button-prev prev" @click="prev"></view>
		<view class="swiper-button-next next" @click="next"></view>
    </view>
    <view class="pagepoint">
        <view class="point"></view>
        <view class="active">{{active}}</view>
        <view class="point"></view>
    </view>
  	<view class="music" @click="plays">
  		<u-icon name="volume-fill" v-if="playing" size="50rpx" color="#FBE291"></u-icon>
  		<u-icon name="volume-off-fill"  v-else size="50rpx" color="#FBE291"></u-icon>
  	</view>
  </view>
</template>

<script>
import Swiper, {Autoplay} from 'swiper';
Swiper.use([Autoplay]);
import {userControl} from '@/request/api.js'
let that;
export default {
  name: 'index',
  data(){
      return{
		  list1:[
			require('@/static/swiper1.png'),
			require('@/static/swiper2.png'),
			require('@/static/swiper3.png'),
			require('@/static/swiper4.png'),
			require('@/static/swiper5.png')
		  ],
          active:1,
          swiper:null,
		  playing:true
      }
  },
  onLoad() {
	that = this
  	getApp().plays()
  },
  created(){},
  onShow() {
  	that.playing = true;
	that.active = 1
	getApp().plays()
  },
  mounted(){
  },
  methods:{
	change(current){
		that.active = (current.current+1)
	},
	plays(){
		if(that.playing){
			that.playing = false;
			getApp().pauses()
		}else{
			that.playing = true;
			getApp().plays()
		}
	},
	onHide(){
		getApp().pauses()
	},
	onUnload(){
		getApp().pauses()
	},
    prev(){
		if( that.active>1){
			that.active-=1
		}else{
			uni.showToast({
				title:"没有更多了",
				icon:"none"
			})
		}
    },
    next(){
		if( that.active<5){
			that.active+=1
		}else{
			uni.showToast({
				title:"没有更多了",
				icon:"none"
			})
		}
    },
    godetail(){
		if(uni.getStorageSync("token")){
			if(that.active!=1){
				uni.showToast({
					title:"敬请期待",
					icon:"none"
				})
			}else{
				uni.navigateTo({
					url:"../map/map?type="+(that.active)
				})
			}
		}else{
			uni.redirectTo({
				url:'../form/form'
			})
		}
    }
  }
}
</script>

<style lang="scss" scoped>
    .index{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        .swipers{
            position: relative;
            width: 100% !important;
            height: 850rpx !important;
            margin:32% auto 0 auto;
        }
        .pagepoint{
			position: fixed;
			bottom: 8%;
			left: 50%;
			transform: translateX(-50%);
            width: 256rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .point{
                height: 32rpx;
                width: 32rpx;
                background: rgba(255,255,255,.6);
                border-radius: 50%;
            }
            .active{
                height: 60rpx;
                width: 60rpx;
                line-height: 60rpx;
                text-align: center;
                background: url(~@/static/active.png) no-repeat;
                background-size: 100% 100%;
                color: #7E1A1F;
                font-size: 36rpx;
                font-weight: bold;
            }
        }
        .prev{
            z-index: 10;
            position: absolute;
            top: 50%;
			transform: translateY(-50%);
            left: 0 !important;
            background: url(~@/static/prev.png) no-repeat;
            background-size: 100% 100%;
            height: 136rpx;
            width: 136rpx;
        }
        .next{
            z-index: 10;
            position: absolute;
            top: 50%;
			transform: translateY(-50%);
            right: 0 !important;
            background: url(~@/static/next.png) no-repeat;
            background-size: 100% 100%;
            height: 136rpx;
            width: 136rpx;
        }
    }
.music{
	position: fixed;
	right: 5%;
	top: 4%;
	width: 60rpx;
	height: 60rpx;
}
</style>
