<template>
	<view class="study">
		<view class="top_type">
			<view class="top_item" 
			@click="selectNav(index)"
			:class="{top_item_select:index ==select} " v-for="(item,index) in datalist">
				<image class="icon" v-if="index == select" :src="item.selectIcon" mode="widthFix"></image>
				<image class="icon" v-else :src="item.icon" mode="widthFix"></image>
				<view>{{item.name}}</view>
			</view>
		</view>
		<view class="play_area">
			<view class="" v-if="select != 2">
				<view class="resource">
					<view class="play_img">
						<view class="" v-if="select == 0">
							<view class="swiperss swiper-container">
								<view class="swiper-wrapper">
									<view class="swiper-slide" v-for="item in list1">
										<image :src="item" mode=""></image>
									</view>
								</view>
							</view>
							<view class="progress">
								<view class="step" :style="{width:width+'%'}">
									<view class="pointers"></view>
								</view>
							</view>
						</view>
						<video id="myVideo" 
						@timeupdate="listenPlay"
						autoplay
						:src="playVideo" v-if="select == 1" controls></video>
					</view>
					<view class="play_list">
						<view class="play" v-show="select==0" @click="reset">
							<u-icon :name="require('@/static/reset.png')" 
							color="#bb0000" size="38rpx"></u-icon>
							<text>重播</text>
						</view>
						<view class="" v-show="select==0">
							<view class="play" v-if="!playing" @click="play()">
								<u-icon :name="require('@/static/play.png')" color="#bb0000" size="120rpx"></u-icon>
							</view>
							<view class="play" v-else @click="pause()">
								<u-icon :name="require('@/static/stop.png')" color="#bb0000" size="120rpx"></u-icon>
							</view>
						</view>
						<view class="" style="flex:1" v-if="select==1">
							
						</view>
						<view class="play" @click="$refs.share.show()">
							<u-icon :name="require('@/static/share.png')" 
							color="#bb0000" size="38rpx"></u-icon>
							<text>分享</text>
						</view>
					</view>
				</view>
				<view class="xxys">
					<view class="textarea">
						<view class="title">
							{{title}}
						</view>
						<view class="content">
							<view class="texts" :class="{show_lines:!open}" v-html="content"></view>
							<view class="opens" v-if="!open" @click="open=!open">
								展开
								<u-icon name="arrow-down" color="rgb(40,120,255)"> </u-icon>
							</view>
							<view class="opens" v-else @click="open=!open">
								收起
								<u-icon name="arrow-up" color="rgb(40,120,255)"> </u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="lists">
					<view class="title">
						相关推荐
					</view>
					<view class="list">
						<view class="list_item" v-for="item in lists" @click="detail(item)">
							<view class="list_item_left">
								<image :src="item.img"></image>
								<view class="tips">{{changeBsid(item.bsid)}}</view>
							</view>
							<view class="list_item_right">
								<view class="title">
									{{item.title}}
								</view>
								<view class="content" v-html="item.content"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<Xxyl @goScore="goScore" @ended="ended" v-else :vid="vid" :type="type" :anwserList="anwserList"></Xxyl>
		</view>
		<Share ref="share"></Share>
	</view>
</template>

<script>
	import Playing from './playing.js'
	import Texts from './text.js'
	import List from './list.js'
	import Xxyl from './components/xxyl.vue'
	import Share from './components/share.vue'
	let that;
	export default {
		mixins:[Playing,Texts,List],
		data() {
			return {
				select:0,
				reFresh:"",
				open:false,
				datalist:[
					{icon:require('@/static/icon1.png'),
					selectIcon:require('@/static/icon11.png'),
					name:"学习有声"},
					{icon:require('@/static/icon2.png'),
					selectIcon:require('@/static/icon22.png'),
					name:"学习有思"},
					{icon:require('@/static/icon3.png'),
					selectIcon:require('@/static/icon33.png'),
					name:"学习有力"}
				],
				select:0,
				vid:"",
				type:1,
				anwserList:[],
				title:"",
				content:"",
				width:""
			}
		},
		components:{Xxyl,Share},
		onLoad(options) {
			that = this;
			that.vid = options.vid;
			that.type = options.type;
		},
		onUnload() {
			that.playUrl.stop();
		},
		destroyed() {
			that.playUrl.stop();
		},
		onHide(){
			that.playUrl.stop();
		},
		watch:{
			reFresh(){
				that.select = 0
				that.getResource();
				that.getList();
			}
		},
		methods: {
			selectNav(index){
				that.anwserList = [];
				that.select=index;
				if(that.playUrl){
					that.playUrl.stop();
				}
				that.getList();
				that.getResource();
			},
			goScore(data){
				uni.navigateTo({
					url:"../score/score?score="+data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	$line:2;
	@mixin show_line($line:2) {
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
		-webkit-line-clamp:$line;
		overflow: hidden;
		display: -webkit-box;
	}
	.show_lines{
		-webkit-box-orient:vertical;
		text-overflow:ellipsis;
		-webkit-line-clamp:3;
		overflow: hidden;
		display: -webkit-box;
	}
	.study{
		padding: 0 24rpx 24rpx 24rpx;
		width: 100%;
		overflow: hidden;
		height: 100%;
		background: url(~@/static/bg3.png) no-repeat;
		background-size: 100% 100%;
		.resource{
			.play_img{
				position: relative;
				width: 100%;
				margin: auto;
				height: 380rpx;
				background: #ededed;
				video{
					width: 100%;
					height: 100%;
				}
				.swiperss{
					position: absolute;
					width: 100%;
					height: 100% !important;
					left: 0;
					top:0;
					image{
						width: 100% !important;
						height: 100% !important;
					}
				}
				.progress{
					z-index: 10;
					position: absolute;
					bottom: 34rpx;
					left: 34rpx;
					right: 34rpx;
					height: 4rpx;
					background: #D8D8D8;
					.step{
						position: absolute;
						left: 0;
						top: 0;
						height: 4rpx;
						background: #CE2741;
						transition: all 0.2s;
						.pointers{
							position: absolute;
							width: 12rpx;
							height: 12rpx;
							right: -6rpx;
							margin-top: -5rpx;
							border-radius: 50%;
							background: #FFFFFF;
							border: 4rpx solid #E0003B;
						}
					}
				}
			}
			.play_list{
				display: flex;
				width: 90%;
				margin: 32rpx auto;
				align-items: center;
				justify-content: space-between;
				>view{
					display: flex;
					align-items: center;
					text{
						margin-left: 8rpx;
						font-size: 26rpx;
					}
				}
			}
		}
		.textarea{
			width: 100%;
			.title{
				font-size: 30rpx;
				font-family: SourceHanSansCN-Bold, SourceHanSansCN;
				font-weight: bold;
				color: #000;
				line-height: 46rpx;
				margin-bottom: 20rpx;
			}
			.content{
				.texts{
					font-size: 26rpx;
					font-family: SourceHanSansCN-Regular, SourceHanSansCN;
					font-weight: 400;
					color: #666666;
					line-height: 40rpx;
				}
				.opens{
					text-align: center;
					margin-bottom: 30rpx;
					margin-top: 30rpx;
					font-size: 24rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					color: rgb(40,120,255);
				}
			}
		}
		.lists{
			width: 100%;
			border-top:  1rpx dashed #D70000;
			.title{
				line-height: 108rpx;
				font-size: 28rpx;
				font-family: SourceHanSansCN-Bold, SourceHanSansCN;
				font-weight: bold;
				color: #333333;
			}
			.list{
				&_item{
					display: flex;
					align-items: center;
					margin-bottom: 32rpx;
					&_left{
						position: relative;
						width: 304rpx;
						height: 172rpx;
						border-radius: 8rpx;
						margin-right: 34rpx;
						image{
							top: 0;
							left: 0;
							position: absolute;
							width: 100%;
							height: 100%;
							border-radius: inherit;
						}
						.tips{
							z-index: 2;
							width: 80rpx;
							left: 0;
							top: 24rpx;
							height: 36rpx;
							background: #D70000;
							border-radius: 0px 200rpx 200rpx 0px;
							opacity: 0.89;
							position: absolute;
							font-size: 22rpx;
							color: #fff;
							text-align: center;
							line-height: 36rpx;
						}
					}
					&_right{
						flex: 1;
						.title{
							font-size: 28rpx;
							font-family: SourceHanSansCN-Bold, SourceHanSansCN;
							font-weight: bold;
							color: #333333;
							line-height: 42rpx;
							margin-bottom: 22rpx;
						}
						.content{
							@include show_line(2);
							font-size: 24rpx;
							font-family: SourceHanSansCN-Medium, SourceHanSansCN;
							font-weight: 500;
							color: #333333;
							line-height: 32rpx;
						}
					}
				}
			}
		}
		.top_type{
			z-index: 10;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			padding-left: 54rpx;
			padding-right: 54rpx;
			padding-bottom: 34rpx;
			display: flex;
			justify-content: space-between;
			background: linear-gradient(180deg, rgb(218,220,223) 0%, rgb(232,232,232) 100%);
			.top_item{
				padding: 30rpx;
				height: 100%;
				width: 180rpx;
				font-size: 30rpx;
				font-weight: bold;
				text-align: center;
				color: #333333;
				.icon{
					width: 108rpx;
					height: 108rpx;
					margin-bottom: 24rpx;
					border-radius: 50%;
				}
			}
			.top_item_select{
				color: #fff;
				background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
				border-radius: 0px 0px 40rpx 40rpx;
				.icon{
					box-shadow: 0px 4rpx 12rpx 0px rgba(0, 0, 0, 0.15);
				}
			}
		}
		.play_area{
			width: 100%;
			height: 100%;
			padding-top: 288rpx;
			overflow-y: scroll;
		}
	}
</style>
