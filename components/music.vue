

<script>
	let that;
	export default {
		name:"music",
		data() {
			return {
				playing:false,
				playMusic:"",
				src:require('@/static/music.mp3')
			};
		},
		watch:{
			playing:{
				handler(value){
					if(value){
						this.plays()
					}else{
						this.pauses()
					}
				},
				immediate:true,
				deep:true
			}
		},
		methods:{
			plays(){
				that.playMusic.play()
			},
			pauses(){
				that.playMusic.pause()
			}
		},
		created() {
			that = this;
			that.playMusic = uni.createInnerAudioContext();
			that.playMusic.src = that.src;
			that.playMusic.onCanplay(()=> {
				that.playing = true;
				that.plays();
			})
		},
		mounted() {
		},
	}
</script>

<style>
	.music{
		position: fixed;
		right: 5%;
		top: 4%;
		width: 60rpx;
		height: 60rpx;
	}
</style>
