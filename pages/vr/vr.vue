<template>
	<view class="textDetail">
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	
	import {userControl} from '@/request/api.js'
	let that;
	export default {
		data() {
			return {
				id:"",
				src:""
			}
		},
		onBackPress(options) {
			if(options.from == "backbutton"){
				this.back();
				return true;
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
					if(res.data.code == 200){
						that.src = res.data.data.url
					}else{
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.textDetail{
		padding: 10px 10px;
		width: 100%;
		height: 100%;
		background: #fff;
		content: "加载中...";
	}
</style>
