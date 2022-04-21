<template>
	<view class="mark" v-if="isFisrt" @click="closeTishi">
		<view class="box">
			<view class="box_item">
				<view class="">
					点选任一“红色圣地”图标，进入全景页面“云”打卡学习吧~
				</view>
				<view class="">
					学习满3分钟即在该圣地打卡成功！退回本页面后，该图标会燃起“星火”，并将地图“燎原”一次哦~
				</view>
			</view>
			<view class="pointer" >
				<image src="../static/images/pointer.png" mode="widthFix"></image>
			</view>
			<!-- <uni-link href="" text=""></uni-link> -->
		</view>
	</view>
</template>

<script>
	export default {
		name:"tishi",
		data() {
			return {
				
			}
		},
		props:{
			isFisrt:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			closeTishi(){
				var that = this;
				that.$emit("closeTishi",false)
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
	align-items: center;
	justify-content: center;
	background: rgba(40, 40, 40, 0.75);
	.box{
		position: relative;
		width: 262px;
		height: 442rpx;
		&_item{
			height: 376rpx;
			background: linear-gradient(180deg, rgba(255,221,171,.26) 0%, rgba(255,240,213,.26) 100%);
			color: #FFDDAB;
			font-weight: bold;
			font-family: '宋体';
			font-size: 28rpx;
			border-radius: 14rpx;		
			padding: 40rpx 40rpx;
			box-sizing: border-box;
			line-height: 45rpx;
			view{
				margin-bottom: 30rpx;
			}
		}
		.pointer{
			left: 50%;
			margin-left: -20rpx;
			bottom: -10rpx;
			position: absolute;
			height: 48rpx;
			width: 40rpx;
			image{
				width: 100%;
			}
		}
	}
}
</style>
