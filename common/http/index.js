/* 该文件已全局引入，无需每个界面在引入 */
import http from './config';

/* 获取首页banner */
const getBanner = (data) => {
	return http.request({
		url: '/index/banner',
		method: 'get',
		data,
	})
}

/* 首页icon list */
const getChannel = (data) => {
	return http.request({
		url: '/home/getChannel',
		method: 'get',
		data,
	})
}

/* 首页推荐商品 */
const newGoods = (data) => {
	return http.request({
		url: '/home/newGoods',
		method: 'get',
		data,
	})
}

/* 
	商品详情接口
	传值 userId 用户id 可以空 id 商品id
*/
const detailAction = (data) => {
	return http.request({
		url: '/goods/detailaction',
		method: 'get',
		data,
	})
}

/* 获取商品列表 */
const goodsList = (data) => {
	return http.request({
		url: '/goods/goodsList',
		method: 'get',
		data,
	})
}

/* 2 首页品牌制造商直供的详情内的列表数据 */
const listAction = (data) => {
	return http.request({
		url: '/brand/listaction',
		method: 'get',
		data,
	})
}

/* 3 首页品牌制造商直供的详情数据 */
const homeDetailAction = (data) => {
	return http.request({
		url: '/brand/detailaction',
		method: 'get',
		data,
	})
}

/**
 *  分类
 */
//1.分类和子类
const indexAction = (data) => {
	return http.request({
		url: '/category/indexaction',
		method: 'get',
		data,
	})
}

// 2.通过分类的id来查询子类接口
const currentAction = (data) => {
	return http.request({
		url: '/category/currentaction',
		method: 'get',
		data,
	})
}

//3.获取导航数据
const categoryNav = (data) => {
	return http.request({
		url: '/category/categoryNav',
		method: 'get',
		data,
	})
}

/* 分类商品 */
const getCategoryList = (data) => {
	return http.request({
		url: '/home/getCategoryList',
		method: 'get',
		data,
	})
}

/* 首页品牌商品 */
const getBrandList = (data) => {
	return http.request({
		url: '/home/getBrandList',
		method: 'get',
		data,
	})
}

/* 首页品牌商品 */
const detailaction = (data) => {
	return http.request({
		url: '/goods/detailaction',
		method: 'get',
		data,
	})
}


export default {
	getBanner,
	getChannel,
	newGoods,
	detailAction,
	goodsList,
	listAction,
	homeDetailAction,
	indexAction,
	currentAction,
	categoryNav,
	getCategoryList,
	getBrandList,
	detailaction
	
}
