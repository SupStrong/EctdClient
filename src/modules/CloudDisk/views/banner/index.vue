<template>
	<div class="main">
		<!-- 轮播图 -->
		<div class="tool-swiper">
			<div class="swiper-container G-Mb-10" ref="html2canvas">
				<div class="swiper-wrapper">
					<div class="swiper-slide test" v-for="(element, index) in swiperBanner" :key="index">
						<img class="swiper-img" :src="element" alt="" />
						<vue-draggable-resizable
							class-name-active="my-active-class"
							v-for="(c_element, c_index) in imgToData"
							:parent="true"
							:key="c_index"
							:lock-aspect-ratio="true"
							@resizing="onResize"
							@resizestop="onResizeStop"
							v-show="c_element.index == swiperIndex"
							w="auto"
							h="auto"
							:style="{ zoom: r }"
							@dragging="(left, top) => dragging(element.id, left, top)"
							@dragstop="(left, top) => dragstop(element.id, left, top)"
						>
							<p v-if="c_element.type == 'text'">{{ c_element.val }}</p>
							<img :src="c_element.val" v-if="c_element.type == 'image'" style="width: 80px; height: auto" alt="" />
							<svg class="icon" v-if="c_element.type == 'icon'" style="width: 40px; height: 40px" :key="index">
								<use draggable="false" ondragstart="return false;" :xlink:href="'#' + c_element.val"></use>
							</svg>
						</vue-draggable-resizable>
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div>
			<!-- <div class="fl-row-justy tool-btn">
				<el-button type="primary" @click="selectFile()">生成图片</el-button>
				<span></span>
				<el-button>下一版</el-button>
			</div> -->
		</div>
		<div class="fl-row-justy tool-btn">
			<el-button type="primary" @click="generateImg()">生成图片</el-button>
			<el-button type="success" @click="clearSingleStyle()">清除单张</el-button>
			<el-button type="warning" @click="clearAllStyle()">清除所有</el-button>
		</div>
		<div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="布局" name="first"> </el-tab-pane>
				<el-tab-pane label="滤镜" name="second"> </el-tab-pane>
			</el-tabs>
		</div>
		<div>
			<div class="tool-r">
				<el-button class="G-Mt-10" @click="drawerPopup('data')">样品数据</el-button>
				<el-button class="G-Mt-10" @click="drawerPopup('text')">文案</el-button>
				<el-button class="G-Mt-10" @click="drawerPopup('image')">插画</el-button>
				<el-button class="G-Mt-10" @click="drawerPopup('icon')">表情</el-button>
				<el-button class="G-Mt-10" @click="drawerPopup('classify')">分类</el-button>
			</div>
			<div class="popup">
				<bannerData v-if="popupData.val == 'data'" :data="popupData" @change="addToData"></bannerData>
				<bannerImage v-else-if="popupData.val == 'image'" :data="popupData" @change="addToData"></bannerImage>
				<bannerText v-else-if="popupData.val == 'text'" :data="popupData" @change="addToData"></bannerText>
				<bannerIcon v-else-if="popupData.val == 'icon'" :data="popupData" @change="addToData"></bannerIcon>
				<bannerclassify v-else-if="popupData.val == 'classify'" :data="popupData" @change="addToData"></bannerclassify>
			</div>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import $ from 'jquery';
import html2canvas from 'html2canvas';
import bannerData from './components/dataNav.vue';
import bannerImage from './components/imageNav.vue';
import bannerText from './components/textNav.vue';
import bannerIcon from './components/iconNav.vue';
import bannerclassify from './components/classifyNav.vue';

export default {
	components: {
		bannerData,
		bannerImage,
		bannerText,
		bannerIcon,
		bannerclassify,
	},
	data() {
		return {
			swiperIndex: 0,
			swiperBanner: [
				'https://img0.baidu.com/it/u=3122136587,3938996930&fm=26&fmt=auto',
				'https://img1.baidu.com/it/u=1948442199,1328853331&fm=26&fmt=auto',
				'https://img1.baidu.com/it/u=1783594224,1234800221&fm=26&fmt=auto',
			],
			popupData: {
				val: '',
				isDrawer: false,
			},
			imgToData: [],
			r: 1,
		};
	},
	created() {},
	mounted() {
		new Swiper('.swiper-container', {
			loop: true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			loop: false,
			initialSlide: this.swiperIndex,
			onSlideChangeStart: (swiper) => {
				this.swiperIndex = swiper.activeIndex;
			},
		});
	},
	// computed: {},
	methods: {
		//点击方法
		generateImg(divText, imgText) {
			$('.tool-swiper').attr('style', `height:${$('.swiper-wrapper .test').eq(0).height()}px;overflow:hidden`);
			$('.swiper-wrapper').css({
				transform: 'translate3d(0px, 0px, 0px)',
			});
			let self = this;
			let length = $('.swiper-wrapper .test').length;
			let imgsSrc = [];
			var canvas2 = document.createElement('canvas');
			let _canvas = document.querySelector('.test');
			var w = parseInt(window.getComputedStyle(_canvas).width);
			var h = parseInt(window.getComputedStyle(_canvas).height);
			//将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
			canvas2.width = w * 2;
			canvas2.height = h * 2;
			canvas2.style.width = w + 'px';
			canvas2.style.height = h + 'px';
			window.pageYoffset = 0;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			var context = canvas2.getContext('2d');
			context.scale(2, 2);
			for (let i = 0; i < length; i++) {
				setTimeout(() => {
					$('.tool-swiper').attr('style', `height:${$('.swiper-wrapper .test').eq(i).height()}px;overflow:hidden`);
					$('.swiper-wrapper').attr('style', `transform:translate3d(-${480 * i}px, 0px, 0px)`);
					html2canvas(document.querySelector('.tool-swiper'), {
						logging: false,
						scrollY: 0,
						scrollX: 0,
						useCORS: true,
						allowTaint: false,
						tainTaint: false,
						scale: 1,
						height: $('.tool-swiper').height(), // 下面解决当页面滚动之后生成图片出现白边问题
						width: $('.tool-swiper').width(),
						windowWidth: document.body.scrollWidth,
						windowHeight: document.body.scrollHeight,
						x: 0,
						y: 0,
					}).then(function (canvas) {
						//document.body.appendChild(canvas);
						//canvas转换成url，然后利用a标签的download属性，直接下载，绕过上传服务器再下载
						// $('.imgDom').append('<img style="width:360px" src="' + canvas.toDataURL() + '" />');
						for (let j = 0; j < 1; j++) {
							imgsSrc.push(canvas.toDataURL());
							if (imgsSrc.length === length) {
								console.log(imgsSrc, 'imgsSrcimgsSrc');
								// self.packageImages(imgsSrc);
							}
						}
					});
				}, 0);
			}
		},
		clearSingleStyle() {},
		clearAllStyle() {},
		addToData(data) {
			this.imgToData.push({ ...data, ...{ index: this.swiperIndex } });
		},
		drawerPopup(val) {
			this.popupData = {
				isDrawer: true,
				val,
			};
		},
		packageImages(imgsSrc) {
			var imgBase64 = []; //base64图片
			var imageSuffix = []; //图片后缀
			var zip = new JSZip();
			var img = zip.folder('images');
			for (let i = 0; i < imgsSrc.length; i++) {
				imageSuffix.push('.png');
				imgBase64.push(imgsSrc[i]);
				if (imgsSrc.length === imgBase64.length) {
					for (let j = 0; j < imgsSrc.length; j++) {
						img.file(j + imageSuffix[j], imgBase64[j].replace(/^data:image\/(png|jpg);base64,/, ''), {
							base64: true,
						});
					}
					zip
						.generateAsync({
							type: 'blob',
						})
						.then(function (content) {
							// see FileSaver.js
							console.log(content, 'contentcontent');
							saveAs(content, 'images.zip');
							$('#status').text('处理完成。。。。。');
						});
				}
			}
		},
		onResize(x, y, width, height) {
			// this.resizing = true;
			// this.x = x;
			// this.y = y;
			// this.width = width;
			// this.height = height;
			// this.r = width / 80;
			// console.log(x, y, width / 80, height / 80);
			// scale(1, 2)
		},
		onResizeStop(x, y, width, height) {
			this.resizing = false;
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
				background-color: transparent;
				text-align: center;
				position: relative;
				.swiper-img {
					width: 100%;
					// height: 100%;
					position: absolute;
					left: 0;
					right: 0;
				}
			}
		}
	}
}
.tool-r {
	display: inline-grid;
}
.my-active-class {
	box-sizing: content-box;
	border: 1px solid red;
}
</style>
