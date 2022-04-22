<template>
	<view class="login_box" v-if="type==1">
		<view class="inputs">
			<input type="number" 
			placeholder="请输入手机号" v-model="formData.phone"/>
		</view>
		<view class="inputs code">
			<view class="">
				<input type="number" 
				placeholder="请输入验证码" v-model="formData.code"/>
			</view>
				<view class="getcode" @click="getCode">发送验证码<text v-if="showCode">{{time}}s</text></view>
		</view>
		<view class="inputs">
			<input type="password" 
			placeholder="请输入新密码" v-model="formData.password"/>
		</view>
		<view class="inputs">
			<input type="password" 
			placeholder="再次输入新密码" v-model="formData.password2"/>
		</view>
		<view class="forget">
			<view class="" @click="$emit('login')">返回登陆</view>
			<view class="" @click="$emit('signin')">没有账号，去报名</view>
		</view>
		<view class="login_btn" @click="finish">
			完成
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
					phone:"",
					code:"",
					password:"",
					password2:""
				},
				showCode:false,
				time:300
			}
		},
		created(){that = this},
		methods: {
			// 获取验证码
			getCode(){
				that.$emit('getCode',that.formData.phone,(res) => {
					if(res){
						that.codeInterval = setInterval(() => {
							if(that.time <= 300&&that.time>0){
								that.time-=1;
								that.showCode = true;
							}else{
								that.time=300
								that.showCode = false;
								clearInterval(that.codeInterval)
								that.codeInterval = null;
							}
						},1000)
					}
				})
			},
			// 提交
			finish(){
				that.$emit("checkPhone",that.formData.phone,(res) => {
					if(res == 200){
						if(that.formData.code!=""){
							if(that.formData.password!=""){
								if(that.formData.password2!=""){
									if(that.formData.password2===that.formData.password){
										userControl.resetPwd(that.formData).then(res => {
											if(res.data.code == 200){
												that.$emit("login")
											}else{
												uni.showToast({
													title:res.data.message,
													icon:"none"
												})
											}
										})
									}else{
										uni.showToast({
											title:"两次密码输入不一致",
											icon:'none'
										})
									}
								}else{
									uni.showToast({
										title:"请再次输入新密码",
										icon:'none'
									})
								}
							}else{
								uni.showToast({
									title:"请输入新密码",
									icon:'none'
								})
							}
						}else{
							uni.showToast({
								title:"请输入验证码",
								icon:'none'
							})
						}
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login_box{
		width: 80%;
		margin: 120rpx auto;
		.inputs{
			border-radius: 8rpx;
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
		.code{
			padding-right: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 28rpx;
			input{
				flex: 1;
			}
			.getcode{
				padding: 0 16rpx;
				text-align: center;
				background: linear-gradient(180deg, #B4091C 0%, #DB153C 100%);
				color: #FFFFFF;
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
