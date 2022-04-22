<template>
	<view class="toast" v-if="showToast" @click.self="hideWin">
		<view class="boxes">
			<view class="boxes_title">
				{{title}}
			</view>
			<view class="boxes_time">
				{{time}}总书记参观
			</view>
			<view class="boxes_go_now">
				<view class="go_now" @click.stop="$emit('goStudy',id)">
					开始学习
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"",
				time:"",
				showToast:false,
				id:""
			}
		},
		methods: {
			bindData(data){
				this.title = data.title;
				this.time = data.time;
				this.id = data.id;
			},
			showToastWin(data){
				this.showToast = true;
				this.bindData(data.data.name);
			},
			hideWin(){
				this.showToast = false;
			}
		}
	}
</script>

<style lang="scss">
</style>
