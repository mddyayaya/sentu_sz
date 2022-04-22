<template>
	<view class="textDetail">
		<view class="title">{{title}}</view>
		<view class="content" v-html="content"></view>
	</view>
</template>

<script>
	
	import {userControl} from '@/request/api.js'
	let that;
	export default {
		data() {
			return {
				id:"",
				title:"",
				content:""
			}
		},
		mounted() {
			that.getDetail();
		},
		onLoad({id}) {
			that = this;
			that.id = id;
		},
		methods: {
			getDetail(){
				userControl.articleDetail({
					id:that.id
				}).then(res =>{
					if(res.data.code==200){
						that.title = res.data.data.title
						that.content = res.data.data.content
					}else{
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.textDetail{
		padding: 20rpx 20rpx;
		width: 100%;
		height: 100%;
		background: #fff;
		.title{
			font-size: 40rpx;
			font-weight: bold;
			line-height: 60rpx;
			margin: 20rpx auto;
		}
		.content{
			font-size: 28rpx;
			line-height: 44rpx;
		}
	}
</style>
