<template>
  <view class="home">
	<view class="signs" @click="$refs.sm.showSmWin">
		<view class="" style="display: flex;justify-content: center;">
			<u-icon name="question-circle-fill" size="40rpx" color="#FBE291"></u-icon>
		</view>
		<view class="">
			活动说明
		</view>
	</view>
    <view class="logos">
      <image src="@/static/logo.png" mode="widthFix">
    </view>
    <view class="anim">
      <view class="anim_left">
        <image class="dove1" src="@/static/dove1.png" mode="widthFix">
        <image class="word1" src="@/static/word1.png" mode="widthFix">
        <image class="star2" src="@/static/star2.png" mode="widthFix">
      </view>
      <view class="anim_right">
        <image class="dove2" src="@/static/dove2.png" mode="widthFix">
        <image class="word2" src="@/static/word2.png" mode="widthFix">
        <image class="star1" src="@/static/star1.png" mode="widthFix">
      </view>
    </view>
	<view class="login">
		<image src="@/static/start.png" mode="widthFix" class="start" @click="gostart">
	</view>
	<Sign ref="sm"></Sign>
  </view>
</template>

<script>
	import Sign from './components/sign.vue'
	export default {
	  name: 'home',
	  components: {
		Sign
	  },
	  onLoad() {
		
	  },
	  methods:{
		gostart(){
		  uni.navigateTo({
			url:"../index/index"
		  })
		}
	  }
	}
</script>

<style lang="scss" scoped>
.home{
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: url(~@/static/bg.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
  .logos{
    position: fixed;
    margin: 5% 0 0 5%;
    width: 111px;
    image{
      width: 100%;
    }
  }
  .anim{
    padding-top: 20%;
    height: 95%;
    display: flex;
    justify-content: space-between;
    &_left{
      margin-left: -49%;
      width: 49%;
      transform: scale(0);
      animation: left 0.8s linear forwards;
      position: relative;
      image{
        position: absolute;
      }
      .dove1{
        width:43%;
        left: 15%;
        top: 2%;
      }
      .word1{
        width: 39%;
        top: 0;
        right: 0;
      }
      .star2{
        width: 120%;
        bottom: 12%;
        left: -55%;
      }
    }
    &_right{
      margin-left: -49%;
      width: 49%;
      transform: scale(0);
      animation: right 0.8s linear forwards;
      position: relative;
      image{
        position: absolute;
      }
      .dove2{
        width: 43%;
        right: 12%;
        top: 38%;
      }
      .word2{
        width: 39%;
        top:9%;
        left: 0;
      }
      .star1{
			width: 120%;
			top: 0;
			right: -55%;
      }
    }
  }
  .login{
	opacity: 0;
	animation: start 0.5s linear forwards;
	animation-delay:1s;
	-webkit-animation-delay:1s; /* Safari 和 Chrome */
	width: 100%;
	position: fixed;
	left: 50%;
	transform: translate(-50%);
	bottom: 7%;
	display: flex;
	align-items: center;
	justify-content: center;
	image{
		width: 70%;
	}
  }
  .signs{
	color: #FBE291;
	font-size: 24rpx;
	text-align: center;
	position: fixed;
	top: 3%;
	z-index: 100;
	right: 5%;
  }
}
@keyframes left{
  0%{
    margin-left: -49%;
      transform: scale(0);
  }
  100%{
    margin-left: 0;
      transform: scale(1);
  }
}
@keyframes right{
  0%{
    margin-right: -49%;
      transform: scale(0);
  }
  100%{
    margin-right: 0;
      transform: scale(1);
  }
}
@keyframes start{
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>
