
import {userControl} from '@/request/api.js'
import Swiper, {Autoplay} from 'swiper';
Swiper.use([Autoplay]);
let that;
export default{
	data(){
		return{
			list1: [],
			currentTime:0,
			max:0,
			playing:true,
			playdata:[],
			playUrl:"",
			playVideo:"",
			reFresh:""
		}
	},
	created(){
		that = this;
	},
	mounted() {
		this.getResource();
	},
	watch:{
		list1(){
			this.$nextTick(() => {
					this.swiper = new Swiper('.swiperss', {
						speed: 1500,
						autoplay: {
							delay: 1500,
							stopOnLastSlide: false,
							disableOnInteraction: false,
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						on:{
							slideChangeTransitionStart: function(){
								that.active = this.realIndex+1
							},
						},
						slidesPerView: 1,
						spaceBetween: 20
					});
			})
		}
	},
	methods:{
		pause(){
			that.playUrl.pause();
			that.playing = false
		},
		play(){
			that.playUrl.play();
			that.playing = true
		},
		reset(){
			that.playUrl.stop();
			that.playUrl.play();
			that.playing = true
		},
		// 结束请求
		ended(){
			// 播放结束
			that.playing = false;
			userControl.insertLog({
				type:that.type,
				vid:that.vid,
				type2:(parseInt(that.select)+1)
			})
		},
		// 视频监听
		listenPlay(e){
			if(e.detail){
				if(e.detail.duration == e.detail.currentTime){
					that.ended();
				}
			}
		},
		// 音频
		getTimes(src){
			if(that.select == 0){
				that.playUrl = uni.createInnerAudioContext();
				that.playUrl.src = src;
				that.playUrl.play();
				that.playUrl.autoplay =  true;
				that.playUrl.onCanplay(()=> {
					that.playing = true;
					// 音频时长
					that.max = parseFloat(that.playUrl.duration.toFixed(0));
				})
				// 结束
				that.playUrl.onEnded(() => {
					that.ended();
				})
				// 音频时长监听
				that.playUrl.onTimeUpdate(() => {
					that.currentTime = parseInt(that.playUrl.currentTime);
					that.width = Math.ceil((that.currentTime/that.max)*100)
				})
			}
		},
		getResource(){
			// 资源获取
			that.playUrl = null;
			userControl.typeSecondResouce({
				type:that.type,
				vid:that.vid,
				type2:(parseInt(that.select)+1)
			}).then(res => {
				if(res.data.code == 200){
					if(that.select == 0){
						if(res.data.data[0].img){
							for(let i=0;i<res.data.data[0].img.length;i++){
								res.data.data[0].img[i] = res.data.data[0].img[i]
							}
						}
						that.list1 = res.data.data[0].img;
						that.title = res.data.data[0].title;
						that.content = res.data.data[0].content;
						that.getTimes(res.data.data[0].url)
					}else if(that.select == 1){
						that.playVideo = res.data.data[0].url
						that.playUrl = uni.createVideoContext('myVideo');
					}else{
						that.anwserList = res.data.data;
					}
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		}
	}
}