<template>
	<view class="xxyl">
		<view class="mark" v-if="showMark"></view>
		<view class="test_box">
			<view class="test_title">
				{{now+1}}.{{playList.title}}
			</view>
			<view class="options">
				<view class="options_item" ref="options"
				 v-for="(items,keys) in playList.option"
				 @click="selectAnwser(keys,items)">
					<view class="point"></view>
					<view class="text">
						{{items.title}} 、{{items.content}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let that;
import {userControl} from '@/request/api.js'
	export default{
		props:{
			anwserList:{
				type:Array,
				default:[]
			},
			type:{
				type:Number|String,
				default:[]
			},
			vid:{
				type:Number|String,
				default:[]
			}
		},
		data(){
			return{
				anwser:'正确',
				check:[],
				formData:{
					type:"",
					vid:"",
					qid:[],
					answer:[]
				},
				result:"",
				realIndex:-1,
				trueIndex:-2,
				showtrue:false,
				now:0,
				total:0,
				playList:"",
				showMark:false
			}
		},
		created() {
			that = this
		},
		watch:{
			anwserList(){
				that.playList = that.anwserList[that.now];
				that.total = that.anwserList.length-1
				that.anwserList.forEach(item => {
					that.formData.qid.push("")
					that.formData.answer.push("")
				})
				that.updateTrue();
			}
		},
		mounted() {
			that.formData.type = this.type
			that.formData.vid = this.vid;
		},
		methods:{
			// 更新正确答案
			updateTrue(){
				for(let i=0;i<that.playList.option.length;i++){
					if(that.playList.option[i].title == that.playList.answer){
						that.trueIndex = i;
					}
				}
			},
			selectAnwser(index,items){
				that.formData.qid[that.now] = that.anwserList[that.now].id;
				that.formData.answer[that.now] = items.title;
				if(index == that.trueIndex){
					that.$refs.options[index].$el.setAttribute("class", "success options_item")
				}else{
					that.$refs.options[index].$el.setAttribute("class", "error options_item")
					that.$refs.options[that.trueIndex].$el.setAttribute("class", "success options_item")
				}
				that.showMark = true;
				setTimeout(() => {
					for(let i=0;i<that.$refs.options.length;i++){
						that.$refs.options[i].$el.removeAttribute("class", "error")
						that.$refs.options[i].$el.removeAttribute("class", "success")
						that.$refs.options[i].$el.setAttribute("class", "options_item")
					}
					
					that.now += 1;
					that.trueIndex = -1
					that.showMark = false;
					if(that.now<=that.total){
						that.playList = that.anwserList[that.now]
						that.updateTrue();
					}else{
						if(that.now > that.total){
							that.now = that.total
							userControl.answer(that.formData).then(res =>{
								if(res.data.code == 200){
									that.$emit('ended')
									that.$emit('goScore',res.data.data)
								}else{
									uni.showToast({
										title:res.data.message,
										icon:"none"
									})
								}
							})
						}
					}
				},1000)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.mark{
		position: fixed;
		top: 0%;
		left: 0%;
		z-index:10;
		width:100%;
		height: 100%;
	}
	.xxyl{
		width: 100%;
		border-top: 1px dashed #D70000;
		.test_box{
			width: 100%;
			.test_title{
				margin: 28px 0;
				font-size: 15px;
				font-family: SourceHanSansCN-Bold, SourceHanSansCN;
				font-weight: bold;
				color: #000000;
				line-height: 22px;
			}
			.options{
				&_item{
					display: flex;
					align-items: center;
					padding: 10px 12px;
					margin-bottom: 10px;
					border-radius: 3px;
					border: 1px solid #D2D2D2;
					.point{
						width: 8px;
						height: 8px;
						border-radius: 50%;
						margin-right: 12px;
						background: #D8D8D8;
					}
					.text{
						font-size: 14px;
						font-weight: 400;
						color: #333333;
						line-height: 16px;
						flex: 1;
					}
					.anwser{
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.success{
					background: #FFFFFF;
					box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.15);
					border-radius: 3px;
					.point{
						background: #00B81E !important;
					}
					.anwser{
						color: #00B33C;
					}
				}
				.error{
					background: #FFFFFF;
					box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.15);
					border-radius: 3px;
					.point{
						background: #CE2741 !important;
					}
					.anwser{
						color: #CE2741;
					}
				}
			}
		}
	}
</style>
