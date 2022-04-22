<template>
	<view class="login_box" v-if="type == 2">
		<view class="inputs">
			<input type="number" 
			placeholder="请输入手机号" v-model="formData.username"/>
		</view>
		<view class="inputs">
			<input type="password" 
			placeholder="请输入密码" v-model="formData.password"/>
		</view>
		<view class="forget">
			<view class="" @click="$emit('forget')">忘记密码</view>
			<view class="" @click="$emit('signin')">没有账号，去报名</view>
		</view>
		<view class="login_btn" @click="logins">
			登录
		</view>
	</view>
</template>

<script>
	import {userControl} from '@/request/api.js'
	let that;
	export default {
		props:{
			type:Number
		},
		data() {
			return {
				formData:{
					username:"",
					password:""
				}
			}
		},
		created(){that = this},
		methods: {
			// 登录
			logins(){
				if(that.formData.username!=""){
					if(that.formData.password != ""){
						userControl.login(that.formData).then(res => {
							if(res.data.code == 200){
								uni.navigateBack()
								uni.setStorageSync("token",res.data.data.info)
							}else{
								uni.showToast({
									title:res.data.message,
									icon:"none"
								})
							}
						})
					}else{
						uni.showToast({
							title:"请输入密码",
							icon:"none"
						})
					}
				}else{
					uni.showToast({
						title:"请输入手机号",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login_box{
		width: 80%;
		margin: 120rpx auto;
		.inputs{
			border-radius: px;
			border: 2rpx solid rgba($color: #000000, $alpha: 0.2);
			padding: 0 20rpx;
			height: 80rpx;
			line-height: 80rpx;
			margin-top: 40rpx;
			background: #FFFFFF;
			input{
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
			}
		}
		.forget{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			color: #999;
			font-size: 24rpx;
			line-height: 80rpx;
		}
		.login_btn{
			margin-top: 40rpx;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			color: #fff;
			font-size: 28rpx;
			background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
			border-radius: 8rpx;
			text-align: center;
		}
	}
</style>
