<template>
	<view class="vrwrap">
		<web-view :src="vrSrc"></web-view>
	</view>
</template>

<script>
	import urlConfig from '@/common/config.js'
	export default {
		data() {
			return {
				vrSrc:"",
				startTime:0,
				endTime:0,
				studyTime:0
			}
		},
		methods: {
			// 全景
			qjDetail(){
				var that = this;
				uni.request({
					url: urlConfig+'/?c=d_qjdk&m=qjDetail',
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'  
					},
					method:"POST",
					data:{
						'id':that.id
					},
					success: (res) => {
						if(res.statusCode == 200){
							if(res.data.status == 200){
								that.vrSrc = res.data.data.yd_url;
								uni.setNavigationBarTitle({
									title:res.data.data.ar_title
								});
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:"none"
								})
							}
						}else{
							uni.showToast({
								title:"请检查网络连接",
								icon:"none"
							})
						}
					},
				})
			}
		},
		created() {
			var that = this;
			getApp().pauseM();
			that.startTime = new Date().getTime() / 1000
		},
		onLoad(options) {
			var that = this;
			that.id = options.id;
			that.qjDetail();
		},
		onUnload() {
			var that = this;
			that.vrSrc = ""
		},
		onUnload() {
			var that = this;
			that.endTime = new Date().getTime() / 1000;
			that.studyTime = parseInt(that.endTime - that.startTime);
			uni.request({
				url: urlConfig+'/?c=d_qjdk&m=lookLog',
				header: {
					'Content-Type': 'application/x-www-form-urlencoded'  
				},
				method:"POST",
				data:{
					'id':that.id,
					'time':that.studyTime,
					// 'time':180,
					'openid':sessionStorage.getItem("openid"),
					'nickname':sessionStorage.getItem("nickname"),
				},
				success: (res) => {
					if(res.statusCode == 200){
						if(res.data.status == 200){
							that.time = null;
							that.studyTime = 0;
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
						}
					}else{
						uni.showToast({
							title:"请检查网络连接",
							icon:"none"
						})
					}
				},
			})
		}
	}
</script>

<style>
	.uni-web-view{
	    position: absolute;
	    left: 0;
	    right: 0;
		width: 100%;
		height:100%;
	    top: 0;
	    bottom: 0;
	}
</style>
