<script>
	import wx from './common/index.js'
	import urlConfig from '@/common/config.js'
	import { getcode } from "@/common/quanju.js"
	export default {
		onLaunch: function() {
			var that = this;
			that.getWxcode();
			// sessionStorage.setItem("openid",'oy83swD1OZyrqZC42d1SFVGb6Quw')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			musice:"http://dj.gxsentu.net/hsdk/dkMusice.mp3",
			stop:false,
			openid:"",
			backgroundM:uni.createInnerAudioContext(),
			showTishi:false,
			showFinish:false,
			showFirst:false,
			showNum:0,
			showId:0,
			showIndex:0,
			finishList:[]
		},
		methods:{
			// 暂停背景音乐
			pauseM(){
				var that = this;
				that.globalData.backgroundM.pause();		// 暂停
			},
			// 暂停背景音乐
			playM(){
				var that = this;
				that.globalData.backgroundM.play();		// 播放
			},
			playVoice() { // url即为音频路径
				var that = this;
				if (that.globalData.musice) {
					that.globalData.backgroundM.src = that.globalData.musice;
					that.globalData.backgroundM.play();		// 播放
					that.globalData.backgroundM.loop = true	// 是否循环播放
				}
			},
			// 是否首次进入
			firstOpen(){
				var that = this;
				uni.request({
					url: urlConfig+'/?c=d_qjdk&m=firstOpen',
					method:"POST",
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'  
					},
					data:{
						'openid':sessionStorage.getItem("openid")
					},
					success: (res) => {
						if(res.statusCode == 200){
							if(res.data.status == -1){
								that.globalData.showTishi = true
							}else if(res.data.status == -2){
								that.globalData.showTishi = false;
							}else{
								if(sessionStorage.getItem("isFinish") == null){
									that.globalData.showFinish = true;
									that.globalData.showNum = res.data.data;
								}else{
									that.globalData.showFinish = false;
									that.globalData.showNum = res.data.data;
								}
							}
						}else{
							uni.showToast({
								title:"请检查网络连接",
								icon:"none"
							})
						}
					},
				})
			},
			// 获取微信code
			getWxcode(){
				var that = this;
				var oauth_url = 'https://dj.gxsentu.net/?c=d_qjdk&m=redirect_url';
				var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx74a2d1b3d0feed2e&redirect_uri=" + location.href.split('#')[0] + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
				var code = getcode("code");
				if(!code){
					window.location = url;
				}else{
					uni.request({
						url:urlConfig+'?c=d_qjdk&m=redirect_url',
						method:"GET",
						data: {
							'code': code
						},
						success(res){
							if(res.errMsg == "request:ok"){
								if(res.data.status == 200){
									// alert(res.data.data.openid)
									sessionStorage.setItem("openid",res.data.data.openid)
									// sessionStorage.setItem("openid",123456)
									sessionStorage.setItem("nickname",res.data.data.nickname)
									that.firstOpen();
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
						}
					})
				}
			}
		}
	}
</script>

<style>
	page {
		position: relative;
		width: 100%;
		height: 100%;
		background:url(static/images/bg.png) #C4090B no-repeat; 
		/* background:url(static/images/bg.png) no-repeat; */
		background-size: 100% 100%;
		overflow: hidden;
	}
	/*每个页面公共css */
	div{
		outline: none;
	}
</style>
