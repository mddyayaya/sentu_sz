import config_url from './config.js'
import qs from 'qs'

//请求封装
export const requests = (url,data,method) => {
	return new Promise((resolve,reject) => {
		let token = uni.getStorageSync("token")
		data = {
			token,
			...data
		}
		if(method == "GET"){
			data.t = new Date().getTime();
		}else{
			data = qs.stringify(data)
		}
		uni.request({
			url:config_url+url,
			data:data,
			method:method,
			header:{
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			dataType:'json',
			success:res => {
				if(res.statusCode==200){
					if(res.data.code == -1){
						uni.showToast({
							title:res.data.message,
							icon:"none"
						})
						setTimeout(()=> {
							uni.redirectTo({
								url:'/pages/form/form'
							})
						},2000)
					}else{
						resolve(res)
					}
				}else{
					uni.showToast({
						title:"内置服务器错误",
						icon:"none"
					})
				}
			},
			fail:error => {
				uni.hideToast()
				uni.showToast({
					title:"请求失败",
					icon:"none",
					position:"bottom"
				})
			}
		})
	})
}
