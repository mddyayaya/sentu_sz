<template>
	<view class="wrapper" id="poster">
		<view class="toimg">
			<view class="titles">
				<view class="logoswrap">
					<view class="logos2">
						<image src="@/static/logo2.png" mode="widthFix"></image>
					</view>
					<view class="texts">
						红色足迹
					</view>
				</view>
			</view>
			<view class="content">
				<view class="content_title">
					恭喜你：<text>{{username}}</text>
				</view>
				<view class="conts">
					你已经点亮了<text>{{count}}</text>座城市、<text>{{count}}</text>个场馆，完成了红色足迹寻访。
				</view>
			</view>
			<view class="imgs">
				<view class="first">
					<image :src="frist.img" mode=""></image>
				</view>
				<view class="others">
					<view class="others_item" v-for="item in others">
						<image :src="item.img" mode=""></image>
					</view>
				</view>
			</view>
			<view class="saves">
				<view class="saves_btn" @click="toImg">
					保存去分享
				</view>
				<view class="saves_code">
					<view class="code">
						<image src="@/static/codes.png" mode=""></image>
					</view>
					<view class="saves_word">
						快来扫码和 我一起寻访
					</view>
				</view>
			</view>
		</view>
		<view class="shoimg" v-if="base64" @click.self="close">
			<image :src="base64" mode=""></image>
			<view class="save_inlocal">
				长按图片保存到本地
			</view>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas';
	import {
		userControl
	} from '@/request/api.js'
	let that;
	export default {
		data() {
			return {
				type: 1,
				frist: [],
				base64: '',
				count:0,
				username:"",
				first:"",
				others:[]
			}
		},
		onLoad({
			type
		}) {
			that = this;
			this.type = type;
		},
		mounted() {
			this.datas()
		},
		created() {
			
		},
		methods: {
			close(){
				that.base64 = ""
			},
			datas() {
				var that = this
				userControl.screenshots({
					type: that.type,
				}).then(res => {
					if(res.data.code == 200){
						that.frist = res.data.data.res[0];
						that.others = res.data.data.res.splice(1,res.data.data.res.length);
						that.username = res.data.data.username;
						that.count = res.data.data.count
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			},
			toImg() {
				uni.showLoading({
					title:"正在生成图片",
					icon:"loading"
				})
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				var dom = document.querySelector('#poster'); // 获取dom元素
				html2canvas(dom, {
					width: dom.clientWidth, //dom 原始宽度
					height: dom.clientHeight,
					scrollY: 0, // html2canvas默认绘制视图内的页面，需要把scrollY，scrollX设置为0
					scrollX: 0,
					useCORS: true, //支持跨域，但好像没什么用
				}).then((canvas) => {
					that.base64 = canvas.toDataURL('image/png');
					uni.hideLoading();
					// 将生产的canvas转为base64图片
				});
			}
		}
	}
</script>

<style lang="scss">
	.wrapper{
		width: 100%;
		height: 100%;
		padding: 12rpx 12rpx;
		background: url(~@/static/bg3.png) no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
		.toimg{
			width: 100%;
			height: 100%;
			background: #FFFFFF;
			padding: 26rpx 26rpx;
			overflow-y: scroll;
			.titles{
				width: 100%;
				border-top: 6rpx solid #B4091C;
				border-bottom: 6rpx solid #B4091C;
				.logoswrap{
					padding: 20rpx 0;
					margin: 45rpx 0;
					width: 100%;
					border-top: 2rpx solid #B4091C;
					border-bottom: 2rpx solid #B4091C;
					.logos2{
						width: 192rpx;
						height: 66rpx;
						margin-left: 24rpx;
						image{
							width: 100%;
						}
					}
					.texts{
						width: 100%;
						text-align: center;
						font-size: 128rpx;
						margin-top: 20rpx;
						font-weight: 800;
						color: #B4091C;
						line-height: 72px;
						letter-spacing: 16px;
						text-shadow: 0px 2rpx 8rpx rgba(0, 0, 0, 0.15);
					}
				}
			}
			.content{
				margin: 40rpx 20rpx;
				width: 100%;
				.content_title{
					font-size: 32rpx;
					color: #000;
					font-weight: bold;
					margin-bottom: 40rpx;
					text{
						font-size: 40rpx;
						color: #B4091C;
					}
				}
				.conts{
					font-size: 32rpx;
					line-height: 60rpx;
					color: #000;
					text{
						font-size: 40rpx;
						font-weight: bold;
					}
				}
			}
			.imgs{
				width: 100%;
				border-bottom: 6rpx solid #B4091C;
				.first{
					width: 100%;
					height: 380rpx;
					padding-bottom: 20rpx;
					margin-bottom: 4rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.others{
					border-bottom: 2rpx solid #B4091C;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					margin-bottom: 4rpx;
					.others_item{
						width: 49%;
						height: 184rpx;
						margin-right: 2%;
						margin-bottom: 20rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.others_item:nth-child(2n){
						margin-right: 0 !important;
					}
				}
			}
			.saves{
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 22rpx;
				&_btn{
					width: 308rpx;
					height: 88rpx;
					text-align: center;
					line-height: 88rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #FFFFFF;
					text-shadow: 0px 2rpx 10rpx rgba(0, 0, 0, 0.5);
					background: #DB153C;
					border-radius: 88rpx;
				}
				&_code{
					flex: 1;
					margin-left: 38rpx;
					display: flex;
					align-items: center;
					.code{
						width: 168rpx;
						height: 168rpx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.saves_word{
						font-size: 30rpx;
						color: #000000;
						flex: 1;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.shoimg{
		z-index: 100;
		background:rgba(0,0,0,.8);
		position:fixed;
		left:0;
		top:0;
		width: 100%;
		height:100%;
		padding:20rpx;
		text-align: center;
		image{
			margin:60rpx auto 20rpx auto;
			width:80%;
			height:80%;
		}
		.save_inlocal{
			width: 100%;
			text-align: center;
			color: #fff;
		}
	}
</style>
