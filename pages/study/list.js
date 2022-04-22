
import {userControl} from '@/request/api.js'
let that;
export default{
	data(){
		return{
			lists:[]
		}
	},
	created(){that = this},
	mounted() {
		that.getList();
	},
	methods:{
		getList(){
			userControl.articleList({
				type:that.type,
				type2:(parseInt(that.select)+1),
				vid:that.vid
			}).then(res => {
				if(res.data.code == 200){
					that.lists = res.data.data;
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		// 资源转化
		changeBsid(bsid){
			if(bsid == 1){
				// 音频
				bsid="音频"
			}else if(bsid == 2){
				// 视频
				bsid="视频"
			}else if(bsid == 2){
				// 答题
				bsid="答题"
			}else if(bsid == 4){
				// 全景
				bsid="全景"
			}else if(bsid == 5){
				// 文本
				bsid="文本"
			}else{
				bsid="未知"
			}
			return bsid;
		},
		detail(item){
			if(item.bsid == 1){
				// 音频
				that.vid = item.id;
				that.getResource()
			}else if(item.bsid == 2){
				// 视频
				that.vid = item.id
				that.getResource()
			}else if(item.bsid == 4){
				// 全景
				uni.navigateTo({
					url:"../vr/vr?id="+item.id
				})
			}else if(item.bsid == 5){
				// 文本
				uni.navigateTo({
					url:'../textDetail/textDetail?id='+item.id
				})
			}
		}
	}
}