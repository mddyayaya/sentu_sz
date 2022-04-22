<template>
	<view class="login_box" v-if="type==3">
		<view class="" v-if="!next">
			<view class="inputs">
				<input type="number" 
				placeholder="请输入手机号" 
				v-model="formData.phone"/>
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
				placeholder="请设置密码" v-model="formData.password"/>
			</view>
			<view class="forget">
				<view class="" @click="$emit('login')">返回登陆</view>
			</view>
			<view class="login_btn" @click="nextStep">下一步</view>
		</view>
		<view class="" v-if="next">
			<view class="inputs">
				<input type="text" 
				placeholder="请输入姓名" v-model="formData.username"/>
			</view>
			<view class="inputs">
				<input type="text" 
				placeholder="请输入学号/工号" v-model="formData.student_id"/>
			</view>
			<view class="inputs">
				<picker mode="selector" range-key='name' :range="schoolist" @change="selectSchool">
					<view class="select">{{school}}</view>
				</picker>
			</view>
			<view class="inputs">
				<input type="text" 
				placeholder="请输入学院名称" v-model="formData.college_id"/>
			</view>
			<view class="forget">
				<view class="" @click="$emit('login')">返回登陆</view>
			</view>
			<view class="login_btn" @click="submit">
				完成
			</view>
		</view>
	</view>
</template>

<script>
	let that;
	import {userControl} from '@/request/api.js'
	export default {
		props:{
			type:Number
		},
		data() {
			return {
				showSelect:false,
				next:false,
				schoolist:[],
				time:300,
				showCode:false,
				codeInterval:null,
				formData:{
					username:"",
					code:"",
					phone:"",
					password:"",
					school_id:"",
					college_id:"",//学院名称
					student_id:""
				},
				school:'请选择学校'
			}
		},
		created(){that = this},
		mounted() {
			that.schoolList();
		},
		methods: {
			selectSchool(value){
				that.school = that.schoolist[parseInt(value.detail.value)].name
				that.formData.school_id = that.schoolist[parseInt(value.detail.value)].id
			},
			// 学校列表
			schoolList(){
				userControl.schools().then(res => {
					that.schoolist = res.data.data;
				})
			},
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
			// 下一步
			nextStep(){
				if(that.formData.code != ""){
					if(that.formData.password!=""){
						that.next = true;
					}else{
						uni.showToast({
							title:"请输入密码",
							icon:"none"
						})
					}
				}else{
					uni.showToast({
						title:"请输入验证码",
						icon:"none"
					})
				}
			},
			// 完成
			submit(){
				if(that.formData.username!=""){
					if(that.formData.student_id !=""){
						if(that.formData.school_id !=""){
							if(that.formData.college_id != ""){
								userControl.signin(that.formData).then(res => {
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
									title:"请输入学院名称",
									icon:"none"
								})
							}
						}else{
							uni.showToast({
								title:"请选择学校",
								icon:"none"
							})
						}
					}else{
						uni.showToast({
							title:"请输入学号/工号",
							icon:"none"
						})
					}
				}else{
					uni.showToast({
						title:"请输入姓名",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.code{
		padding-right: 0 !important;
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
				font-size: 28rpx !important;
			}
		}
		.select{
			color: #777;
			font-size: 28rpx;
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
