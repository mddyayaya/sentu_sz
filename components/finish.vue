<template>
	<view class="mark" v-if="finish">
		<view class="finish">
			<view class="star"></view>
			<view class="finishwords">
				<view>恭喜你完成红色圣地打卡的全部挑战！</view>
				<view>成为第<text>{{showNum}}</text>位“星火守护者”</view>
			</view>
			<view class="surebtn" @click="closeFinish">确定</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"finish",
		data() {
			return {
				
			}
		},
		props:{
			finish:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Number,
				default:0
			}
		},
		methods:{
			closeFinish(){
				var that = this;
				that.$emit("closeFinish",false)
			}
		}
	}
</script>

<style lang="scss">
.mark{
	z-index: 100;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	font-family: '宋体';
	align-items: center;
	justify-content: center;
	font-weight: bold;
	background: rgba(40, 40, 40, 0.75);
	.finish{
		position: absolute;
		width: 85%;
		height: 720rpx;
		background: url(@/static/images/finish_bg.png) no-repeat;
		background-size: 100% 100%;
		padding: 0 28px;
		box-sizing: border-box;
	}
	.star{
		width: 76%;
		margin: -60rpx 14% 0 auto;
		height: 500rpx;
		background: url(../static/images/finish.png) no-repeat;
		background-size: 100% 100%;
	}
	.finishwords{
		margin-top: 40rpx;
		color: #282828;
		font-size: 30rpx;
		text-align: center;
		line-height: 50rpx;
		text{
			color: rgb(197,14,13);
			font-weight: bold;
			margin: 0 20rpx;
		}
	}
	.surebtn{
		text-align: center;
		margin-top: 30rpx;
		color: #DC0008;
		font-size: 30rpx;
	}
}
</style>
