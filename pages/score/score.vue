<template>
	<view class="score">
		<image  class="icon" src="../../static/icon4.png" mode="widthFix"></image>
		<view class="benci">
			本次答题得分
		</view>
		<view class="number">
			{{total}}
		</view>
		<view class="rescore" @click="goback">
			再次答题
		</view>
		<view class="back" @click="back">
返回足迹地图
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total:0
			}
		},
		onLoad(options) {
			this.total = options.score
		},
		methods: {
			goback(){
				let pages = getCurrentPages();
				let beforePage = pages[pages.length-2];
				beforePage.$vm.reFresh = Math.random();
				uni.navigateBack()
			},
			back(){
				uni.redirectTo({
					url: "../map/map?type="+1
				})
			}
		}
	}
</script>

<style lang="scss">
.score{
	width: 100%;
	height: 100%;
	background: url(~@/static/bg3.png) no-repeat;
	background-size: 100% 100%;
	text-align: center;
	.icon{
		margin-top: 212rpx;
		width: 132rpx;
		height: 132rpx;
	}
	.benci{
		font-size: 30rpx;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 32rpx;
		margin: 48rpx 0 64rpx 0;
	}
	.number{
		font-size: 108rpx;
		font-family: SourceHanSansCN-Bold, SourceHanSansCN;
		font-weight: bold;
		color: #000000;
		line-height: 112rpx;
	}
	.rescore{
		margin: 224rpx auto 24rpx auto;
		width: 640rpx;
		height: 96rpx;
		line-height: 96rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #FFFFFF;
		background: linear-gradient(180deg, #ED0000 0%, #D70000 100%);
		box-shadow: 0px 6rpx 16rpx 0px rgba(0, 0, 0, 0.15);
		border-radius: 6rpx;
	}
	.back{
		margin: auto;
		line-height: 96rpx;
		width: 640rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 6rpx;
		border: 2rpx solid rgba(237, 237, 237, 0.9);
		font-size: 30rpx;
		font-weight: 400;
		color: #333333;
	}
}
</style>
