<template>
	<view class="mapwrap">
		<Guize
			:show="showGuize"
			@closeGuize="closeGuize"></Guize>
		<Tishi
			:isFisrt="showTishi"
			@closeTishi="closeTishi"></Tishi>
		<Finish
			:showNum = "showNum"
			:finish = "showFinish"
			@closeFinish="closeFinish"></Finish>
		<oneFinish
			:local="local"
			@closeFinishFire="closeFinishFire"
			:showFileAnim="showFileAnim">
		</oneFinish>
		<view class="top">
			<view class="top_bar">
				<view class="top_musice">
					<image src="../../static/images/play.png" @click="play" v-if="!stop" mode="widthFix"></image>
					<image src="../../static/images/stop.png" @click="paused" v-if="stop" mode="widthFix"></image>
				</view>
				<view class="top_help" @click="gohelp">
					<image src="../../static/images/help.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="top_words">
				<view class="item" v-for="item in wordlist">
					<image :class="item.id <= finishNum?'finished':''" :src="item.img" mode="widthFix"></image>
				</view>
			</view>
			<view class="top_title">
				<view class="title_item">
					<image src="../../static/images/subtitle.png" mode="widthFix"></image>
				</view>
				<view class="title_item">
					<image src="../../static/images/title.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="map">
				<view class="local" @click="goStudy(item.ar_id,index,item.status)" :class="'local'+(index+1)" v-for="(item,index) in localList">
					<view class="point " v-if="item.status == 1"></view>
					<view class="fire second_step" v-if="item.status == 2"></view>
					<view class="fire third_step" v-if="item.status == 3"></view>
					<view class="fire finished_step" v-if="item.status == 4"></view>
					<!-- 地标图片 -->
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<image :src="'../../static/images/map'+(finishNum==6?5:finishNum)+'.png'" mode="widthFix"></image>
			</view>
			<view class="map1">
				<image :src="'../../static/images/map'+(finishNum==6?5:finishNum)+'_'+(finishNum==6?5:finishNum)+'.png'" mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import Guize from '@/components/guize.vue'
	import Tishi from '@/components/tishi.vue'
	import Finish from '@/components/finish.vue'
	import oneFinish from '@/components/oneFinish'
	import urlConfig from '@/common/config.js'
	import $ from '@/common/jquery-3.5.1.min.js'
	export default {
		data() {
			return {
				showGuize:false,
				showTishi:false,
				showFinish:false,
				finishNum:1,
				showNum:0,
				showFileAnim:false,
				stop:false,
				// 河北石家庄火焰坐标
				local:{
					local1X:0,
					local1Y:0,
				},
				localList:[],
				wordlist:[
					{
						id:6,
						img:"../../static/images/word1.png",
						finish:true,
					},
					{
						id:5,
						img:"../../static/images/word2.png",
						finish:true,
					},
					{
						id:4,
						img:"../../static/images/word3.png",
						finish:true,
					},
					{
						id:3,
						img:"../../static/images/word4.png",
						finish:false,
					},
					{
						id:2,
						img:"../../static/images/word5.png",
						finish:false,
					},
					{
						id:1,
						img:"../../static/images/word6.png",
						finish:false,
					},
				]
			}
		},
		components:{
			Guize,Tishi,Finish,oneFinish
		},
		methods: {
			// 学习进度
			progress(){
				var that = this;
				uni.request({
					url: urlConfig+'/?c=d_qjdk&m=lists',
					method:"POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'  
					},
					data:{
						'openid':sessionStorage.getItem("openid")
					},
					success: (res) => {
						if(res.statusCode == 200){
							if(res.data.status == 200){
								that.finishNum = 0;
								for(var i=0;i<res.data.data.length;i++){
									if(res.data.data[i].status == 4){
										that.finishNum++
									}
								}
								that.localList = res.data.data;
							}
						}else{
							uni.showToast({
								title:"请检查网络连接",
								icon:"none"
							})
						}
					}
				})
			},
			// 关闭火焰点亮对应地标
			closeFinishFire(val){
				var that = this;
				setTimeout(function(){
					that.showFileAnim = val;
					$('.local').eq(getApp().globalData.showIndex).find('.fire').animate({
						opacity:1
					},1000)
					$('.local').eq(getApp().globalData.showIndex).find('.fire').addClass('finishedFire')
					
				},300)
			},
			// 开始学习
			goStudy(id,index,status){
				var that = this;
				uni.navigateTo({
					url:"../vrDetial/vrDetial?id="+id
				})
				if(status != 4){
					getApp().globalData.showId = id;
					getApp().globalData.showIndex = index;
				}else{
					getApp().globalData.showId = "";
					getApp().globalData.showIndex = "";
				}
			},
			// 暂停音乐
			play(){
				var that = this;
				that.stop = true;
				getApp().globalData.stop = true;
				getApp().pauseM();
			},
			// 播放音乐
			paused(){
				var that = this;
				that.stop = false;
				getApp().globalData.stop = false;
				getApp().playM();
			},
			// 打开规则
			gohelp(){
				var that = this;
				that.showGuize = true;
			},
			// 关闭规则
			closeGuize(){
				var that = this;
				that.showGuize = false;
			},
			// 关闭提示
			closeTishi(){
				var that = this;
				that.showTishi = false;
				getApp().globalData.showTishi = false;
			},
			// 关闭完成
			closeFinish(){
				var that = this;
				that.showFinish = false;
				getApp().globalData.showFinish = false;
				sessionStorage.setItem("isFinish",false);
			}
		},
		onShow() {
			var that = this;
			that.progress();
			setTimeout(function(){
				$('.mapwrap').fadeIn(200)
			},200)
			getApp().firstOpen();
			getApp().globalData.finishList = []
			// 背景音乐 
			that.stop = getApp().globalData.stop;
			if(getApp().globalData.stop){
				getApp().pauseM();
			}else{
				getApp().playM();
			}
			if(getApp().globalData.showId != '' || getApp().globalData.showIndex != '' ){
				setTimeout(function(){
					for(var i=0;i<that.localList.length;i++){
						if(getApp().globalData.showId == that.localList[i].ar_id && that.localList[i].status == 4){
							that.showFileAnim = true;
							that.local = {
								local1X:$('.local').eq(i).find('.fire').offset().left,
								local1Y:$('.local').eq(i).find('.fire').offset().top
							}
						}
						if(that.localList[i].status == 4){
							getApp().globalData.finishList.push(that.localList[i].ar_id)
						}
					}
					if(getApp().globalData.finishList.length == 6){
						setTimeout(function(){
							that.showFinish = getApp().globalData.showFinish;
							that.showNum = getApp().globalData.showNum;
						},6000)
					}
				},300)
			}
		},
		onLoad() {
			var that = this;
			// 是否完成
			getApp().firstOpen();
			that.showTishi = getApp().globalData.showTishi;
			that.showFinish = getApp().globalData.showFinish;
			that.showNum = getApp().globalData.showNum;
			setTimeout(function(){
				$('.mapwrap').fadeIn(200)
			},300)
			getApp().playVoice();
		},
		onUnload() {
			getApp().pauseM();
			$('.mapwrap').fadeOut(200);
		},
		onHide() {
			getApp().pauseM();
			$('.mapwrap').fadeOut(200);
		}
	}
</script>

<style lang="scss">
	.top{
		width: 100%;
		padding: 0 5%;
		box-sizing: border-box;
		height: 47%;
		position: fixed;
		top: 35rpx;
		display: flex;
		justify-content: space-between;
		&_bar{
			width: 60rpx;
			image{
				width: 100%;
			}
			.top_help{
				margin-top: 15rpx;
			}
		}
		&_words{
			display: flex;
			.item{
				margin-left: 45rpx;
				width: 30rpx;
				image{
					opacity: 0.6;
					width: 100%;
				}
			}
		}
		&_title{
			display: flex;
			.title_item{
				width: 30rpx;
				image{
					width: 100%;
				}
				&:nth-child(2){
					margin-left: 35rpx;
					width: 50rpx;
				}
			}
		}
	}
	.bottom{
		width: 100%;
		padding: 0 5%;
		box-sizing: border-box;
		height: 46%;
		position: fixed;
		bottom: 0rpx;
		.map{
			position: relative;
			top: 0rpx;
			left: 0rpx;
			.local{
				cursor: pointer;
				z-index: 10;
				position: absolute;
				width: 180rpx;
				height: 48rpx;
				&1{
					// 河北石家庄
					top: 230rpx;
					right: 30rpx;
					.point{
						top: 50%;
						margin-top: -12rpx;
						left: -20rpx;
					}
					.fire{
						top: 50%;
						margin-top: -30rpx;
						left: -30rpx;
					}
				}
				&2{
					// 山西阳泉
					top: 290rpx;
					left: 330rpx;
					width: 140rpx;
					height: 70rpx;
					.point{
						top: -12rpx;
						left: 50%;
						margin-left: -12rpx;
					}
					.fire{
						top: -55rpx;
						left: 50%;
						margin-left: -30rpx;
					}
				}
				&3{
					// 河北冉庄
					top: 90rpx;
					left: 450rpx;
					width: 140rpx;
					height: 80rpx;
					.point{
						bottom: -24rpx;
						left: 50%;
						margin-left: -12rpx;
					}
					.fire{
						bottom: -60rpx;
						left: 50%;
						margin-left: -30rpx;
					}
				}
				&4{
					// 贵州遵义
					top: 440rpx;
					left: 340rpx;
					width: 140rpx;
					height: 70rpx;
					.point{
						top: -16rpx;
						left: 50%;
						margin-left: -12rpx;
					}
					.fire{
						top: -55rpx;
						left: 50%;
						margin-left: -30rpx;
					}
				}
				&5{
					// 陕西延安
					top:240rpx;
					left: 150rpx;
					.point{
						right: -12rpx;
						top: 50%;
						margin-top: -12rpx;
					}
					.fire{
						right: -50rpx;
						top: 50%;
						margin-top: -40rpx;
					}
				}
				&6{
					// 江西吉安
					top: 390rpx;
					right: 10rpx;
					.point{
						top: 50%;
						margin-top: -12rpx;
						left: -20rpx;
					}
					.fire{
						top: 50%;
						margin-top: -40rpx;
						left: -45rpx;
					}
				}
				image{
					position: absolute;
					height: 100%;
					height: 100%;
				}
				.point{
					z-index: 15;
					position: absolute;
					width: 24rpx;
					height: 24rpx;
					background: url(../../static/images/point.png) no-repeat;
					background-size: 100% 100%;
				}
				.fire{
					z-index: 100;
					position: absolute;
					width: 32px;
					height: 32px;
				}
			}
			image{
				left: 0;
				position: absolute;
				width: 100%;
			}
			&1{
				width: 140rpx;
				position: absolute;
				left: 0;
				bottom: 0rpx;
				image{
					width: 100%;
				}
			}
		}
	}
	.second_step{
		width: 25px !important;
		height: 32px !important;
		background: url(../../static/images/first.png) no-repeat !important;
		background-size:100% 100% !important;
	}
	.third_step{
		width: 15px !important;
		height: 25px !important;
		background: url(../../static/images/second.png) no-repeat !important;
		background-size:100% 100% !important;
	}
	.finished_step{
		background: url(../../static/images/finished.gif) no-repeat !important;
		background-size:100% 100% !important;
	}
	.finished{
		opacity: 1 !important;
	}
	.finishedFire{
		opacity: 0;
		opacity: 1 !important;
		animation: showFire 1s linear;
	}
	@-ms-keyframes showFire{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@-webkit-keyframes showFire{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@keyframes showFire{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	@-moz-keyframes showFire{
		0%{
			opacity: 0;
		}
		100%{
			opacity: 1;
		}
	}
	.mapwrap{
		display: none;
	}
</style>
