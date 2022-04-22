
import Swiper, {Autoplay} from 'swiper';
Swiper.use([Autoplay]);
import {userControl} from '@/request/api.js'
let that;
export default {
	data(){
		return {
		}
	},
	created(){},
	onLoad(){that = this;},
	onShow(){
		that.showSwiper = false;
		that.getVr();
	},
	methods:{
		getVr(){
			userControl.vrlist().then(res => {
				if(res.data.code == 200){
					that.arrList1 = res.data.data.splice(0,Math.floor(res.data.data.length/2));
					that.arrList2 = res.data.data.splice(Math.floor(res.data.data.length/2),res.data.data.length);
					setTimeout(() => {
						that.showSwiper = true;
						that.swipers1()
						that.swipers2()
					},3000)
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		swipers1(){
			this.$nextTick(() => {
				new Swiper(".swiper", {
					speed:2500,//匀速时间
					autoplay: {
					    delay: 0,
					    stopOnLastSlide: false,
					    disableOnInteraction: false,
					},
					offsetPxBefore:50,
					loop:true,
					slidesPerView: 3,
					slidesPerColumnFill:'row',
					spaceBetween: 16,
				  });
			})
		},
		swipers2(){
			this.$nextTick(() => {
				new Swiper(".swiper1", {
					speed:2500,//匀速时间
					autoplay: {
						delay: 0,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					offsetPxBefore:50,
					loop:true,
					slidesPerView: 3,
					slidesPerColumnFill:'row',
					spaceBetween: 16,
				  });
			})
		}
	}
}