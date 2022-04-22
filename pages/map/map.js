import china from './china.js'
import {userControl} from '@/request/api.js'
let that;
export default{
	data(){
		return{
			axisList:[],
			chart:null
		}
	},
	onLoad(option) {
		this.type = option.type;
	},
	methods:{
		footMaps(){
			userControl.footMap({
				type:that.type,
			}).then(res => {
				if(res.data.code == 200){
					that.axisList = res.data.data.venues;
					that.totalArea = res.data.data.count;
					that.$nextTick(() => {
						that.draw()
					})
				}else{
					uni.showToast({
						title:res.data.message,
						icon:"none"
					})
				}
			})
		},
		// 实体地图
		draw(){
			let iconRQ1=
			"image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAAxZJREFUSEu1lUtoXGUYhp/3TKbpoGlr0S4sdVObaPHSNGdapG7ceUFsBy2kiFgEqwvp1itWUHQlFBdeQCoiDahkCqLdFNxYhJ5JUytKk9pN2goqQUm0l0zmvHLOGZvJZDIZMX4wDHPm/97nu55f/M+mf6PvMzt6kvO67fh0p34dA3z21m5PrT4jyfT8cbs2/XS1E0jngJFwn+G9NAN4RgOV95cN4E/JsTEcM2ysA85xrtKn3dSWgnSUgaNw0AGHG8UUs0fFytCyAOKRgVOgu+eL+btgYGTLfwZ4NHzQMV+2ElLAQ+qvfNUO0rZEPkDgh8NvgHsWEflWX1Tu1QHixSDXAP568/X0FHoJ1IfojWv0BWKroW+JCMdiczLIMYYZJ/YY05fHdd+Pf6YD4ZHwbcRjNuuzCVwWs8RFzGeKj4aX6KbASmDFMiBmgMvZR1d1RS4Xd1P1kK2AAFhpUlgB6Ib0WTurApfmRKllRZAck9dg+svl4uOu+mOSxJqtuwGYgN0glkQ626KqspXXE9oVfTLX5OHiXs/6w5aQf6DXJerAX21alYh36SmVokP1rZ8L2UfCfZ7h3ZaQpFS3OMtgQtl3syXiK3hWO+feUwtCcXnbc1R90G6aqHWGVXXF34HJ+a4SJq/92nXinUZuy1zj4eJpqtx57WDBcHPDhCXRnwdmGtzzfB+UorsWJNVqQFwuTniGDdk41EuTbzp5BbgwD3AhKEWZT4O1zMCfF6uu0ZWeu9GwZpE5/RWYqo9ljlk9GjWHsXBzfWz7Zk/GP6SSyViu9+L7ndwGScPrt4JWc4fujzLfui1s8tHik57iUIre4Gy721lyO/9Sz2IVe/VA9FF7wHD4kqt6nbWGtfOUpyQdTJ7Y3s/cTMHPyTYL5f2ySpU32gJqw+FhicG0xVlgVcEHqPaato7+lgJO9t+Ec68angbyJK+LCeEuD+VKlT3tMygXx73Om1TAWEfI6XltOTHeqko+ta2Xmt9C3ulJxLTOBqWot30GxwZeCW7QdgLeVH/l+BIdSP/2aLiDGi9wUaf1SPRio8/f5sgbyi3vPckAAAAASUVORK5CYII=";
			let iconRQ2=
			"image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAaCAYAAACtv5zzAAAAAXNSR0IArs4c6QAAA8pJREFUSEu1lV9oW1Ucx3+/c2/S5N67gbXrug4qTZuWNokFkYEMn9YH91BcXP7QWsUHRRQUBMEHfYigD8LAB0ERfRB1KcmyddKHPiyCIEMQEWuSZknabGIFs7oFyb1pcu8998iJS2nTJI1snrfL+f2+n9/5/s7vXIT/eeF/0c9kMgqP93g8aq95PQMKhUKfWa9/D4yB6HA86Xa7671Aegbk0unnLYAPuCgBeGvS6/3ygQHi8bjgnZ6+jgCPcFEG8Ft6ff10KBSih0F6OsF6KuVHxI/3ijHGXp32+ZYfCCCbTn8LANMtYutTXu+Z+wbkMpkzFmNftxMiiIuTHg+Hd1xdLYpEIiQcCHwDAI93UPgplkg8HYlErE6EXcDa2ppst9tdzDTHEWAMCXExxh4FgLFDbNhExF+ZZRUZwCaK4oau68WZmRmN52E2nX4XAOYAYIh/H+Zpj/sMAP4EgBVMrq7ecjqdiqQotK+vz0K8P0a9ViOaqgqqpom1nR0Vr0SjT1GAJUC0E0KYJMum7HRSSZKoU5YpIaRr0Yauo1qpiFxQ0zTBNM1/ExjTGcB8o9xENDrHEL8CAFuLGnM4HJYsyyYHSrLcGCwuWK1WBVVVRcMw2lVgIGPPBRYWVnb9uLy05KeMfYGIYqeSjxw9avC3qFKptBaym8IYMwXEF87PzzeGcJ/hiVgsZFH6WTsIt29iYkLl3cvncgpj7ECzuDgRhJcC4XC8STwQFItGFxHgE0Tcd/Thkyd3+vv7DZ64ffu2vVQqOVqeDosBvBJeWNg3lG2vzJV4PEkpfaIpwHswOjpahXs3jDEGGxsbcr1WE5oxgiD88EwoNNtqb1vA8qVLP5umOdnwELFhjc1u5+7srqqmCcViUWraLIpizh8MPtYT4HIs9pdlWU4ePHTiRG1gYEBv1/g/trYc5XLZzvcIITvnw+GBQwHJZNJV3t5O8UCnJJkul6vaafgsSiGXzyv03t1/6Ngx3+zsbHEv5IBFqysrflVVeaPYuNut8TnoNml/l8vi71tb3CpQFGXx7Nzcvn/EAcDVROINwzDeGxwcrA0eP77XmgoCfN4YUoAXAeBIE3yzWJQ0TRNtNts75wKBD7ueYDke/1QQxXlePbcGAQwKcJEIwoWpqak7PDmbzT5sUfqmAPAsA7Dpuo6FfF4RCLnoD4Ve7gq4mkhcHxkZGXdKkgWMrZoA7/t8vs12NqVSqTER4G1APLtdKtnv3L17wx8Mnu4K+O7atdeGhodPIcBHkx7Pj938b+7lMplTJqWvF3K5X84Fgxf25vwDt8+CVSGJqaIAAAAASUVORK5CYII=";
			this.$echarts.registerMap('china', china);
			that.chart = this.$echarts.init(document.getElementById('map'));
			let series = [];
			that.axisList.forEach(item => {
				series.push({
					data: [{
						name: item,
						value:[parseInt(item.address[0]),parseInt(item.address[1])],
					}],
					symbol: item.status==1?iconRQ1:iconRQ2,
					silent:false,
					type: "scatter",
					coordinateSystem: "geo",
					zlevel: 2,
					label: {
						normal: {
							show: false,
							position: "right",
							formatter: "{b}"
						}
					},
					symbolSize: 20,
					itemStyle: {
						normal: {
							color: "rgba(0,0,0,0)",
							borderColor:'#660101',
							borderWidth:2,
							areaColor: "#660101", //区域颜色
							opacity:1
						},
						emphasis: {
							areaColor: "#660101"
						}
					}
				})
			})
			that.chart.setOption({
				geo:{
					top:20,
					bottom:0,
					left:13,
					right:15,
					geoIndex:1,
					zoom:1.1,
					mapOptions:{
						enableMapClick:false
					},
					scaleLimit:{
					 min:1.1,
					 max:6
					},
					roam:true,
					type: 'map',
					map: 'china',
					itemStyle: {
						normal: {
							borderWidth: 1.8, //区域边框宽度
							borderColor: '#ff0000', //区域边框颜色
							areaColor: "rgb(94,5,5)", //区域颜色
							opacity:0.5
						},
						emphasis: { // 对应的鼠标悬浮效果
							areaColor: "rgb(94,5,5)"
						},
					},
				},
				series: series
			});
			// 点击事件
			that.chart.on('click',  (params) => {
				if(params.componentType == 'series'){
					// that.openWin(params);
					that.showToasts = true;
					this.title = params.data.name.title;
					this.time = params.data.name.time;
					this.id = params.data.name.id;
				}
			});
		}
	},
	created(){that = this},
	mounted() {
	}
}