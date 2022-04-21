<template>
	<view class="mark" v-if="show">
		<view class="zewrap">
			<view class="title">
				活动规则
			</view>
			<view class="step">
				1、点击地图上各个红色圣地图标，即可进入到相应的“红色全景”中进行“打卡学习”。
			</view>
			<view class="step">
				2、每个红色圣地图标都会根据其相应“红色全景”中“打卡学习”的时长记录而出现形态和颜色的变化。
			</view>
			<view class="step">
				3、每个红色圣地的“打卡学习”时长超过3分钟，其相应的图标会被完全点亮成“星火”，并将地图“燎原”一次而加深颜色，即视为在该红色圣地完成“打卡”。
			</view>
			<view class="step">
				4、待全部6个红色圣地都“打卡”后，即完成此次活动的“红色圣地打卡”任务，获得“星火守护者”称号。
			</view>
			<view class="step">
				5、完成“红色圣地打卡”任务后，欢迎各位“活动体验官”分享活动体验，请<text class="wenjuan" @click="goWenjuan">点击这里</text>。
			</view>
			<view class="learn" @click="hide">
				我了解了
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"guize",
		data() {
			return {
				
			}
		},
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 关闭遮层
			hide(){
				var that = this;
				that.$emit("closeGuize",false)
			},
			// 调查问卷
			goWenjuan(){
				window.location.href="https://www.wjx.cn/vj/YF3IAww.aspx"
			}
		},
		watch:{
			show(value){
				
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
	background: rgba(40, 40, 40, 0.75);
	.zewrap{
		position: relative;
		width: 89%;
		padding: 25px;
		height: 94%;
		box-sizing: border-box;
		margin: 22px;
		background: linear-gradient(180deg, #FFDDAB 0%, #FFF0D5 100%);
		border-radius: 7px;
		opacity: 0.9;
		color: #282828;
		font-family: '宋体';
		font-weight: bold;
		.title{
			text-align: center;
			line-height: 40rpx;
			font-size: 40rpx;
		}
		.step{
			font-size:26rpx;
			padding-top: 20px;
			line-height: 50rpx;
			.wenjuan{
				color: #bb0000;
				border-bottom: 1px solid #bb0000;
			}
		}
		.learn{
			position: absolute;
			bottom: 50rpx;
			cursor: pointer;
			width: 86%;
			box-sizing: border-box;
			height: 96rpx;
			font-size: 32rpx;
			line-height: 96rpx;
			border-radius: 14rpx;
			text-align: center;
			color: #C70000;
			border: 2rpx solid #C70000;
		}
	}
}
</style>
