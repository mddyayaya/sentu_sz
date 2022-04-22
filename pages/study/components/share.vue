<template>
	<view class="share" @click.self="close" v-if="showShare">
		<view class="shares">
			<image src="@/static/sharecion.png" mode="widthFix"></image>
			<view >
				分享精彩内容
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				showShare:false
			}
		},
		methods:{
			show(){
				this.showShare = true;
			},
			close(){
				this.showShare = false;
			}
		}
	}
</script>

<style lang="scss">
	.share{
		position: fixed;
		left: 0;
		top: 0;
		padding: 20px 5px;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: .5);
		z-index: 20;
		color: #fff;
		font-size: 14px;
		display: flex;
		justify-content: flex-end;
		.shares{
			text-align: center;
		}
		image{
			width: 39px;
		}
	}
</style>
