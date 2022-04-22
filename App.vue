<script>
	let that;
	export default {
		globalData:{
			playMusic:null
		},
		onLaunch: function() {
			that = this;
			that.setting();
			that.music();
		},
		onShow: function() {
			that.setting();
		},
		onHide: function() {
			that.pauses();
		},
		methods:{
			music(){
				that = this;
				that.globalData.playMusic = uni.createInnerAudioContext();
				that.globalData.playMusic.loop = true;
				that.globalData.playMusic.src = require('@/static/music.mp3');
			},
			plays(){
				that.globalData.playMusic.play()
			},
			pauses(){
				that.globalData.playMusic.pause()
			},
			// 占位图
			setting() {
				let that = this;
				if(typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
					that.handleFontSize();
				} else {
				if(document.addEventListener) {
						document.addEventListener("WeixinJSBridgeReady", that.handleFontSize, false);
					} else if(document.attachEvent) {
						document.attachEvent("WeixinJSBridgeReady", that.handleFontSize);
						document.attachEvent("onWeixinJSBridgeReady", that.handleFontSize);
					}
				}
			},
			handleFontSize() {
				// 设置网页字体为默认大小
				WeixinJSBridge.invoke('setFontSizeCallback', {
					'fontSize': 0
				});
				// 重写设置网页字体大小的事件
				WeixinJSBridge.on('menu:setfont', function() {
					WeixinJSBridge.invoke('setFontSizeCallback', {
					'fontSize': 0
					});
				});
			}
		}
	}
</script>

<style lang="scss">
html,body{
  height: 100%;
  width: 100%;
  font: normal 100% Helvetica, Arial, sans-serif;
  background: url(~@/static/bg2.png) no-repeat;
  background-size: 100% 100%;
}
*{
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}
  page {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
	-webkit-text-size-adjust: 100% !important;
  }
  
  .logos{
    position: fixed;
    margin: 27px 0 0 24px;
    width: 111px;
    image{
      width: 100%;
    }
  }
</style>