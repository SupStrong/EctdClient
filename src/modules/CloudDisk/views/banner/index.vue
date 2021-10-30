<template>
	<div class="main">
		<!-- 轮播图 -->
		<div class="tool-swiper">
			<div class="swiper-container G-Mb-10">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(element, index) in swiperBanner" :key="index">
						<img :src="element" alt="" />
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<div></div>
			<div class="fl-row-justy tool-btn">
				<!-- <el-button type="primary" @click="generateImg()">生成图片</el-button>
				<el-button type="success" @click="clearSingleStyle()">清除单张</el-button>
				<el-button type="warning" @click="clearAllStyle()">清除所有</el-button> -->
			</div>
		</div>
		<div>
			<!-- 数据 -->
			<bannerData></bannerData>
			<br />
			<!-- 图片操作 -->
			<bannerImage></bannerImage>
			<br />
			<!-- 文字表格 -->
			<bannerText></bannerText>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import $ from 'jquery';
import bannerData from './components/dataNav.vue';
import bannerImage from './components/imageNav.vue';
import bannerText from './components/textNav.vue';

export default {
	components: {
		bannerData,
		bannerImage,
		bannerText,
	},
	data() {
		return {
			tableData: [
				{
					date: '2016-05-02',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1518 弄',
					zip: 200333,
				},
				{
					date: '2016-05-04',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1517 弄',
					zip: 200333,
				},
				{
					date: '2016-05-01',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1519 弄',
					zip: 200333,
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					province: '上海',
					city: '普陀区',
					address: '上海市普陀区金沙江路 1516 弄',
					zip: 200333,
				},
			],
			siwperIndex: 0,
			swiperBanner: [
				'https://img0.baidu.com/it/u=3122136587,3938996930&fm=26&fmt=auto',
				'https://img1.baidu.com/it/u=1948442199,1328853331&fm=26&fmt=auto',
				'https://img1.baidu.com/it/u=1783594224,1234800221&fm=26&fmt=auto',
			],
		};
	},
	created() {
		this.init();
	},
	mounted() {
		const self = this;
		new Swiper('.swiper-container', {
			loop: true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			loop: false,
			initialSlide: this.siwperIndex,
			onSlideChangeStart: (swiper) => {
				this.siwperIndex = swiper.activeIndex;
			},
		});
	},
	methods: {
		handleChange(val) {
			console.log(val);
		},
		handleClick(row) {
			console.log(row);
		},
		generateImg() {},
		clearSingleStyle() {},
		clearAllStyle() {},
		init() {
			let str = '你好啊';
			console.log($('.main'));
			// <vue-draggable-resizable>
			// 	<p>你可以拖着我，按照自己的意愿调整大小。</p>
			// </vue-draggable-resizable>;
		},
	},
};
</script>
<style scoped lang="scss">
.main {
	display: flex;
	justify-content: space-between;
}
.tool-swiper {
	width: 480px;
	.tool-btn {
		width: 480px;
	}
	.swiper-container {
		width: 480px;
		height: 640px;
		float: left;
		cursor: pointer;
		.swiper-wrapper {
			.swiper-slide {
				width: 100%;
				height: 100%;
				background-color: #42b983;
				text-align: center;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
</style>
