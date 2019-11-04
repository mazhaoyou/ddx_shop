<template>
	<view class="content">
		<scroll-view scroll-y class="left-aside">
			<view v-for="item in categoryList" :key="item.id" class="f-item b-b" :class="{active: item.id === currentId}" @click="tabtap(item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
			<view class="s-list">
				<text class="s-item">{{currentOne.name}}</text>
				<view class="t-list">
					<view @click="navToList(titem.id)" v-if="titem.pid === item.id" class="t-item" v-for="titem in subList" :key="titem.id">
						<image :src="titem.wap_banner_url"></image>
						<text>{{titem.name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: 1,
				categoryList: [],
				categoryId: [],
				currentOne: {},
				subList: []
			}
		},
		onLoad(){
			this.loadData();
		},
		methods: {
			async loadData(){
				//获取子类和分类
				this.indexAction();
			},
			indexAction() {
				this.$http.indexAction().then(res => {
					res = res.data;
					if(res.code == '0001') {
						this.categoryList = res.data.categoryList;
						this.categoryId = this.categoryList.map(function(v) {
							return v.id
						})
						// 通过分类的id来查询子类接口
						let data = {
							id: this.categoryId[0]
						}
						this.currentAction(data);
					} else {
						this.$api.msg(res.message);
					}
				})
				.catch(err => {
					
				})
			},
			currentAction(data) {
				this.$http.currentAction(data).then(res => {
					res = res.data;
					if(res.code == '0001') {
						this.currentOne = res.data.data.currentOne;
						this.subList = this.currentOne.subList;
					} else {
						this.$api.msg(res.message);
					}
				})
				.catch(err => {
					
				})
			},
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				this.currentId = item.id;
				let data = {
					id: this.currentId
				}
				this.currentAction(data);
			},
			//右侧栏滚动
			asideScroll(e){
				console.log(e)
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				this.sizeCalcState = true;
			},
			navToList(tid){
				console.log("tid= " + tid)
				uni.navigateTo({
					url: `/pages/product/list?tid=${tid}`
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,
	.content {
		height: 100%;
		background-color: #f8f8f8;
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		height: 100%;
		background-color: #fff;
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $base-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 8upx;
		font-size: 28upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 12upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 26upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 140upx;
			height: 140upx;
		}
	}
</style>