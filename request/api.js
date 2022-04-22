import { requests } from './index.js'


// 登录注册
export const userControl = {
	// 登录
	login:(data) => requests("?c=login&m=loginUser",data,'POST'),
	// 注册
	signin:(data) => requests("?c=login&m=register",data,'POST'),
	// 发送验证码
	sendPhone:(data) => requests("?c=login&m=send_phone",data,'POST'),
	// 学校列表
	schools:(data) => requests("?c=login&m=school",data,'POST'),
	// 忘记密码
	resetPwd:(data) => requests("?c=login&m=resetPwd",data,'POST'),
	// 主题分类
	type:(data) => requests("?c=footprint&m=type",data,'POST'),
	// 足迹地图
	footMap:(data) => requests("?c=footprint&m=footMap",data,'POST'),
	// 二级分类下的资源
	typeSecondResouce:(data) => requests("?c=footprint&m=typeSecondResouce",data,'POST'),
	// 二级分类下的文章推荐
	articleDetail:(data) => requests("?c=footprint&m=articleDetail",data,'POST'),
	// 相关推荐
	articleList:(data) => requests("?c=footprint&m=articleList",data,'POST'),
	// 播放结束
	insertLog:(data) => requests("?c=footprint&m=insertLog",data,'POST'),
	// 提交答案
	answer:(data) => requests("?c=footprint&m=answer",data,'POST'),
	// 隐藏全景
	vrlist:(data) => requests("?c=footprint&m=qj",data,'POST'),
	// 生成足迹
	screenshots:(data) => requests("?c=footprint&m=share",data,'POST')
}