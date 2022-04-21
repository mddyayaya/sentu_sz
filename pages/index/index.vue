<template>
	<view class="content">
		<view class="handrad">
			<image src="../../static/images/handrad.png" mode="widthFix"></image>
		</view>
		<view class="words">
			<image src="../../static/images/cele.png" mode="widthFix"></image>
		</view>
		<view class="dk" @click="godk">
			<image src="../../static/images/dkbtn.png" mode="widthFix"></image>
		</view>
		<view class="time">
			<image src="../../static/images/time.png" mode="widthFix"></image>
		</view>
		<view class="logo">
			<image src="../../static/images/logo.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import $ from '@/common/jquery-3.5.1.min.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			setTimeout(function(){
				$('.content').fadeIn(200)
			},200)
		},
		onShow() {
			setTimeout(function(){
				$('.content').fadeIn(200)
			},200)
		},
		onUnload() {
			$('.content').fadeOut(200)
		},
		onHide(){
			$('.content').fadeOut(200)
		},
		methods: {
			godk(){
				uni.navigateTo({
					url:"../detail/index"
				})
				getApp().globalData.showId = "";
				getApp().globalData.finishList = []
			}
		}
	}
</script>

<style lang="scss">
	.content{
		display: none;
		height: 100%;
		width: 100%;
		padding: 0 5%;
		box-sizing: border-box;
		overflow: hidden;
		.handrad{
			width: 250rpx;
			height: 160rpx;
			margin: 40rpx auto 0 auto;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.words{
			width: 100%;
			height: 830rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.dk{
			position: fixed;
			width: 90%;
			bottom:260rpx;
			height: 100rpx;
			image{
				width: 100%;
				height: 100%;
			}
			&:active{
				bottom:258rpx;
			}
		}
		.time{
			position: fixed;
			left: 50%;
			bottom:150rpx;
			width: 212rpx;
			margin:30rpx auto 0 -106rpx;
			image{
				width: 100%;
			}
		}
		.logo{
			position: fixed;
			left: 50%;
			bottom: 40rpx;
			width: 212rpx;
			margin:20rpx auto 0 -106rpx;
			image{
				width: 100%;
			}
		}
	}
</style>
