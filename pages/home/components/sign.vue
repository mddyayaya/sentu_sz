<template>
	<view class="shuoming" v-if="showSm" @click.self="closeSm">
		<image src="@/static/sm.jpg" mode="widthFix"></image>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showSm:false
			}
		},
		methods:{
			closeSm(){
				this.showSm = false
			},
			showSmWin(){
				this.showSm = true
			}
		}
	}
</script>

<style lang="scss">
	.shuoming{
		padding: 60rpx;
		overflow-y: scroll;
		text-align: center;
		z-index: 200;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,.4);
		image{
			width: 90%;
		}
	}
</style>
