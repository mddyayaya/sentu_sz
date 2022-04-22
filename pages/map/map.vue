<template>
	<view class="map_wrapper">
		<view class="toast" v-if="showToasts" @click.self="showToasts = false">
			<view class="boxes">
				<view class="boxes_title">
					{{time}}
				</view>
				<view class="boxes_time">
					习近平总书记到{{title}}参观考察
				</view>
				<view class="boxes_go_now">
					<view class="go_now" @click="goStudy">
						开始学习
					</view>
				</view>
			</view>
		</view>
	  <view class="logos">
		<image src="@/static/logo.png" mode="widthFix"></image>
	  </view>
	  <view class="text">
	  	红色足迹
	  </view>
	  <view class="map">
		  <view  id="map" ref="ele"></view>
		  <!-- <view  id="maps"></view> -->
	  </view>
	  <view class="danmu" v-if="showSwiper&&totalArea>=10">
		  <view class="danmu_top swiper swiper">
			  <view class="swiper-wrapper">
			  	<view class="danmu_top_item swiper-slide"
				@click="godetails(item.id)"
				 v-for="item in arrList1">
		  		{{item.title}}
			  	</view>
			  </view>
		  </view>
		  <view class="danmu_top swiper1">
			  <view class="swiper-wrapper">
			  	<view class="danmu_top_item swiper-slide" 
				@click="godetails(item.id)"
				v-for="item in arrList2">
			  		{{item.title}}
			  	</view>
			  </view>
		  </view>
	  </view>
	  <view class="save">
	  	<image src="@/static/save.png" @click="saves" mode="widthFix"></image>
	  </view>
	</view>
</template>

<script>
	import Swiper from './vr.js'
	import Toast from './components/toast.vue'
	import Map from './map.js'
	let that;
	export default {
		mixins:[Map,Swiper],
		data() {
			return {
				showSwiper:false,
				type:"",
				totalArea:0,
				width:'',
				arrList1:[],
				arrList2:[],
				showToasts:false,
				title:"",
				time:"",
				id:""
			}
		},
		components:{Toast},
		onLoad(options) {
			that = this;
			that.type = options.type
		},
		created(){},
		mounted() {
			this.footMaps();
			this.showSwiper = false;
			this.getVr();
		},
		methods:{
			saves(){
				if(this.totalArea >= 1){
					uni.navigateTo({
						url:"../screenShot/screenShot?type="+that.type
					})
				}else{
					uni.showToast({
						title:"没有已解锁场馆",
						icon:"none"
					})
				}
			},
			godetails(id){
				uni.navigateTo({
					url:"../vr/vr?id="+id
				})
			},
			goStudy(){
				this.showToasts = false;
				uni.navigateTo({
					url:'../study/study?vid='+that.id+'&type='+that.type
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.map_wrapper{
		height: 100%;
		width: 100%;
		.text{
			width: 100%;
			padding-top: 200rpx;
			text-align: center;
			font-size: 80rpx;
			font-weight: 800;
			color: #FBE291;
			line-height: 144rpx;
			text-shadow: 0px 6rpx 14rpx rgba(0, 0, 0, 0.1);
			background: linear-gradient(180deg, #FDE29D 0%, #FFFCF1 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}
		.map{
			position: relative;
			z-index: 10;
			height: 55%;
			width: 90%;
			margin:16rpx auto;
			>view{
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			#maps{
				width: 100% !important;
				height: 100% !important;
				z-index: -1;
				canvas{
					width: 100% !important;
					height: 100% !important;
				}
			}
		}
		.danmu{
			z-index: 1000;
			width: 100%;
			position: fixed;
			bottom: 260rpx;
			.danmu_top{
				width: 100%;
				margin-bottom: 30rpx;
				.danmu_top_item{
					padding: 0 10px;
					width: auto !important;
					height: 64rpx;
					background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
					box-shadow: 0px 4rpx 14rpx 0px rgba(0, 0, 0, 0.21), inset 0px 2rpx 6rpx 0px rgba(0, 0, 0, 0.5);
					border-radius: 88rpx;
					color: #fff;
					line-height: 64rpx;
					text-align: center;
					font-size: 28rpx;
					color: #FFFFFF;
					overflow: hidden;
					border: 4rpx solid rgba(255, 225, 179, 0.92); 
				}
				.danmu_top_item:nth-child(2n){
					
				}
				.swiper-wrapper{
					transition-timing-function: linear !important;
				}
			}
			.swiper1{
				transform: translateX(60rpx);
			}
		}
		.save{
			position: fixed;
			right: 60rpx;
			bottom: 60rpx;
			display: flex;
			width: 344rpx;
			justify-content: flex-end;
			image{
				width: 100%;
			}
		}
	}
	.toast{
		z-index: 100;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 0 40rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.boxes{
			text-align: center;
			padding: 60rpx 20rpx;
			border-radius: 30rpx;
			background: rgba($color: #fff, $alpha: .8);
			&_title{
				font-size: 40rpx;
				font-weight: bold;
			}
			&_time{
				margin-top: 20rpx;
				font-size: 32rpx;
			}
			&_go_now{
				width: 100%;
				margin-top: 40rpx;
				display: flex;
				justify-content: center;
				.go_now{
					width: 200rpx;
					height: 60rpx;
					line-height: 60rpx;
					font-size: 24rpx;
					border-radius: 60rpx;
					text-align: center;
					color: #fff;
					background-color: rgb(221,71,80);
				}
			}
		}
	}
</style>
