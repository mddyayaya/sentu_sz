<template>
	<view class="login">
		<Forget @getCode="getCode" @signin="signin" @login="login" @checkPhone="checkPhone" :type="type"></Forget>
		<Login @signin="signin" @forget="forget" :type="type"></Login>
		<Signin @getCode="getCode" @login="login" @checkPhone="checkPhone" :type="type"></Signin>
	</view>
</template>

<script>
	import Login from './components/login.vue'
	import Forget from './components/forget.vue'
	import Signin from './components/signin.vue'
	import {userControl} from '@/request/api.js'
	let that;
	export default {
		data() {
			return {
				type:2
			}
		},
		components:{Login,Forget,Signin},
		created(){that = this},
		methods: {
			// 手机号正则
			checkPhone(value,callback){
				if (!value){
					callback(new Error('手机号不能为空'))
				}else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
					callback(new Error('手机号输入不正确'))
				}else{
					callback(200)
				}
			},
			// 获取验证码
			getCode(value,callback){
				that.checkPhone(value,(res => {
					if(res==200){
						userControl.sendPhone({
							phone:value,
						}).then(res => {
							if(res.data.code == 200){
								uni.showToast({
									title:"发送成功",
									icon:"none"
								})
								callback(true)
							}else{
								uni.showToast({
									title:res.data.message,
									icon:"none"
								})
								callback(false)
							}
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						callback(false)
					}
				}))
			},
			login(){
				this.type = 2
			},
			forget(){
				this.type = 1
			},
			signin(){
				this.type = 3
			}
		}
	}
</script>

<style lang="scss">
	.login{
		width:100%;
		height: 100%;
		background: url(~@/static/bg3.png) no-repeat;
		background-size: 100% 100%;
		overflow: hidden;
	}
</style>
