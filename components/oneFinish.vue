<template>
	<view class="fireWrap" v-if="showFileAnim">
		<view class="fireGif">
			
		</view>
	</view>
</template>

<script>
	import $ from 'jquery'
	export default {
		name:"onFinish",
		data() {
			return {
				
			}
		},
		props:{
			local:{
				type:Object,
				default:{}
			},
			showFileAnim:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			// 显示动画
			showAnim(x,y){
				var that = this;
				setTimeout(function(){
					$('.fireGif').animate({
						width:30,
						height:30,
						top:y,
						left:x,
						marginTop:0,
						marginLeft:0
					},1000)
				},3000)
				setTimeout(function(){
					that.$emit('closeFinishFire',false)
				},4000)
				setTimeout(function(){
					$('.fireGif').css('opacity',0)
				},4200)
			}
		},
		mounted() {
			var that = this;
		},
		created() {
			
		},
		watch:{
			showFileAnim(val){
				console.log(val)
			},
			local(val){
				var that = this;
				that.showAnim(val.local1X,val.local1Y)
			}
		}
	}
</script>

<style lang="scss">
	.fireWrap{
		position: fixed;
		top: 0;
		left: 0;
		z-index: 20;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		.fireGif{
			position: fixed;
			top: 50%;
			left: 50%;
			transition: all 0.3s;
			margin-top: -70%;
			margin-left: -200rpx;
			height: 400rpx;
			width: 400rpx;
			animation: showFire 1s linear;
			background: url(../static/images/finished.gif) no-repeat;
			background-size: 100% 100%;
		}
	}
	@-ms-keyframes showFire{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
	@-webkit-keyframes showFire{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
	@keyframes showFire{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
	@-moz-keyframes showFire{
		0%{
			transform: scale(0);
		}
		100%{
			transform: scale(1);
		}
	}
</style>
