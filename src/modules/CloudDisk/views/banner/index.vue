<template>
	<div class="main">
		<!-- 轮播图 -->
		<div class="tool-swiper">
			<el-carousel
				indicator-position="outside"
				class="swiper-wrapper"
				height="640"
				ref="carousel"
				:initial-index="swiperIndex"
				:autoplay="false"
				@change="changeSwiper"
			>
				<el-carousel-item class="test" v-for="(element, index) in swiperBanner" :ref="'swiper' + index" :key="index" οndragstart="return false">
					<img
						class="swiper-img"
						:src="element.content ? 'http://118.31.70.36/uploads/disk/' + element.content : '69284f94b79bf8b867bf513be25b9c74.webp'"
						alt=""
						οndragstart="return false"
					/>
					<vue-draggable-resizable
						class-name-active="my-active-class"
						style="border: 0; display: flex; align-items: center; justify-content: center"
						v-for="(c_element, c_index) in imgToData"
						:parent="true"
						:key="c_index"
						:lock-aspect-ratio="true"
						:style="c_element.index != swiperIndex ? 'display:none;' : 'display: flex;'"
						w="auto"
						h="auto"
						@resizing="(left, top, width, height) => onResize(c_element, left, top, width, height)"
						@activated="onActivated"
						@deactivated="onDeactivated"
						@resizestop="onResizeStop"
					>
						<p
							:ref="c_element.rand"
							:class="c_element.class || 'G-font-6'"
							style="font-size: 26px; white-space: nowrap; display: inline-box"
							:style="{ 'text-align': c_element.textAlign, 'writing-mode': c_element.writingMode }"
							v-if="c_element.type == 'text'"
							v-html="c_element.val"
						></p>
						<img
							:src="c_element.val"
							v-if="c_element.type == 'image'"
							:style="{
								width: '100%',
								height: 'auto',
							}"
							alt=""
						/>
						<svg
							class="icon"
							v-if="c_element.type == 'icon'"
							:style="{
								width: '100%',
								height: 'auto',
							}"
							:key="index"
						>
							<use draggable="false" dragstart="return false;" :xlink:href="'#' + c_element.val"></use>
						</svg>
					</vue-draggable-resizable>
				</el-carousel-item>
			</el-carousel>
			<div class="imgDom"></div>
			<!-- <div class="swiper-container G-Mb-10" ref="html2canvas">
				<div class="swiper-wrapper swiper-no-swiping">
					<div class="swiper-slide test" v-for="(element, index) in swiperBanner" :ref="'swiper' + index" :key="index" οndragstart="return false">
						
					</div>
				</div>
				<div class="swiper-pagination"></div>
			</div> -->
			<!-- <div class="fl-row-justy tool-btn" style="height: 300px; border: 1px solid red"></div> -->
			<div class="fl-row-justy tool-btn G-Mt-10">
				<el-input placeholder="请输入当前查询的文件夹" v-model="currentSwiper" value="" style="width: 220px"></el-input>
				<el-button class="btn" type="danger" @click="getCurrentSwiper()">查询文件夹</el-button>
				<el-button class="btn" type="warning" @click="generateImg()" v-loading.fullscreen.lock="fullscreenLoading">生成图片</el-button>
			</div>
			<div class="fl-row-justy tool-btn G-Mt-10"></div>
		</div>
		<div>
			<div class="popup">
				<bannerData v-if="popupData.type == 'data'" :data="popupData" @change="addToData"></bannerData>
				<bannerImage v-else-if="popupData.type == 'image'" :data="popupData" @change="addToData"></bannerImage>
				<bannerText v-else-if="popupData.type == 'text'" :data="popupData" @change="addToData"></bannerText>
				<bannerIcon v-else-if="popupData.type == 'icon'" :data="popupData" @change="addToData"></bannerIcon>
				<bannerclassify v-else-if="popupData.type == 'classify'" :data="popupData" @change="addToData"></bannerclassify>
				<bannerFilter v-else-if="popupData.type == 'filter'" :data="popupData" @change="addToData"></bannerFilter>
				<bannerTableNav
					v-else-if="popupData.type == 'table'"
					:data="popupData"
					:listData="imgStyleToData"
					@select="resetData"
					@delete="deleteToData"
					@change="addToData"
				></bannerTableNav>
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
import bannerFilter from './components/filterNav.vue';
import bannerTableNav from './components/tableNav.vue';
import uploadHandle from '../../tools/uploadHandle';
export default {
	components: {
		bannerData,
		bannerImage,
		bannerText,
		bannerIcon,
		bannerclassify,
		bannerFilter,
		bannerTableNav,
	},
	props: {
		popupData: {
			type: Object,
			default: function () {
				return {
					type: 'data',
					isDrawer: false,
				};
			},
		},
	},
	data() {
		return {
			swiperIndex: 0,
			swiperBanner: [],
			currentFolder: {},
			imgToData: [],
			imgStyleToData: [],
			fontArr: [],
			r: 1,
			currentSwiper: '11/11-13/1/SP',
			diskData: [],
			maxFileSize: 4294967296, //4GB
			maxFileSizeText: '0B',
			diskInfo: {},
			settingConfig: {
				maxUpTrans: 3,
				maxDownTrans: 3,
				noticeBubble: true, //气泡提示
				noticeFlag: true, //提醒声音
			},
			fullscreenLoading: false,
		};
	},
	created() {
		this.getData();
	},
	mounted() {
		new Swiper('.swiper-container', {
			loop: true,
			// 如果需要分页器
			pagination: '.swiper-pagination',
			loop: false,
			noSwiping: true,
			initialSlide: this.swiperIndex,
			onSlideChangeStart: (swiper) => {
				this.swiperIndex = swiper.activeIndex;
			},
		});
	},
	// computed: {},
	methods: {
		//点击方法
		getData() {
			this.$api.brand.list({}, (rs) => {
				console.log(rs, 'resss');
			});
		},
		verifyUploadSize(files) {
			let result = [];
			let totalSize = 0;
			for (let i = 0; i < files.length; i++) {
				if (files[i].size < this.maxFileSize) {
					result.push(files[i]);
					totalSize = totalSize + files[i].size;
				} else {
					this.$Message.warning(files[i].name + '超过' + this.maxFileSizeText + '已过滤');
				}
			}
			let uploadingSize = this.uploadList.reduce((a, b) => {
				if (b._state !== 'finish') {
					a = a + b.size;
				}
				return a;
			}, 0);
			if (totalSize && totalSize > this.diskInfo.size.left - uploadingSize) {
				this.$Message.error('剩余空间不足');
				return [];
			}
			return result;
		},
		prepareUpload() {},
		transFinish(item, type) {
			if (this.settingConfig.noticeBubble) {
				this.$notify(item.name, type === 'upload' ? '上传完成' : '下载完成');
			}
		},
		getCurrentSwiper() {
			if (this.currentSwiper === '') {
				this.$Message.info('不可以查询空文件夹哦！');
				return;
			}
			this.$api.disk.search({ parentName: this.currentSwiper }, (rs) => {
				this.swiperBanner = rs.data.allImg;
				this.currentFolder = rs.data.parent_data;
			});
		},
		changeSwiper(index) {
			this.swiperIndex = index;
		},
		initDiskInfo(callback) {
			this.maxFileSizeText = this.maxFileSize.fileSize();
			this.$api.disk.info((rs) => {
				this.diskInfo.size = rs.data;
				callback && callback();
			});
		},
		generateImg() {
			if (!this.swiperBanner.length) {
				this.$Message.info('现在没有图片哦');
				return;
			}
			let arr = this.currentFolder.parentName.split('/');
			arr[arr.length - 1] = '样品';
			let str = arr.join('/');
			this.$api.disk.isFolderList({ parentName: str.toString() }, (rs) => {
				if (rs.data.id !== undefined) {
					this.$confirm('已有样品数据，是否再次生成?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
					})
						.then(() => {
							this.getJs(rs.data.id);
						})
						.catch(() => {
							this.$message({
								type: 'info',
								message: '已取消删除',
							});
						});
				} else {
					this.getJs();
				}
			});
		},
		dataURLtoFile(dataurl, filename) {
			//将base64转换为文件
			var arr = dataurl.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, { type: mime });
		},
		getJs(parentId = null) {
			this.fullscreenLoading = true;
			this.$refs.carousel.setActiveItem(0);
			let self = this;
			let length = $('.swiper-wrapper .test').length;
			let imgsSrc = [];
			var canvas2 = document.createElement('canvas');
			let _canvas = document.querySelector('.test');
			var w = parseInt(window.getComputedStyle(_canvas).width);
			var h = parseInt(window.getComputedStyle(_canvas).height);
			//将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
			window.pageYoffset = 0;
			document.documentElement.scrollTop = 0;
			document.body.scrollTop = 0;
			var context = canvas2.getContext('2d');
			for (let i = 0; i < length; i++) {
				setTimeout(() => {
					this.$refs.carousel.setActiveItem(i + 1);
					html2canvas(document.querySelector('.tool-swiper'), {
						logging: false,
						scrollY: 0,
						scrollX: 0,
						useCORS: true,
						allowTaint: false,
						tainTaint: false,
						scale: 8,
						height: $('.tool-swiper .test').eq(i).find('img').height(),
						width: $('.tool-swiper').width(),
						windowWidth: document.body.scrollWidth,
						windowHeight: document.body.scrollHeight,
						x: 0,
						y: 0,
					}).then(function (canvas) {
						imgsSrc.push(canvas.toDataURL());
						if (imgsSrc.length === self.swiperBanner.length) {
							if (parentId) {
								self.packageImages(imgsSrc, parentId);
							} else {
								self.packageImages(imgsSrc);
							}
						}
					});
				}, 0);
			}
		},
		resetData(data) {
			this.imgToData.map((item, index) => {
				if (item.rand === data.rand) {
					this.$set(this.imgToData, index, {
						...this.imgToData[index],
						class: data.class,
						val: data.val,
						textAlign: data.textAlign,
						writingMode: data.writingMode,
					});
				}
			});
		},
		deleteToData(data) {
			let newImgToData = [];
			this.imgToData.map((item, index) => {
				if (item.rand !== data.rand) {
					newImgToData.push(item);
				}
			});
			this.imgToData = newImgToData;
			this.imgStyleToData = newImgToData;
		},
		addToData(data) {
			if (data.type === 'filter') {
				$('.test').eq(this.swiperIndex).find('img').removeClass().addClass('swiper-img').addClass(data.val);
				return;
			}
			this.imgToData.push({
				...data,
				...{
					index: this.swiperIndex,
					rand: (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5),
				},
			});
		},
		setFontStyle(item) {
			$('.test').eq(this.swiperIndex).find('p').css({
				color: item.color,
				'text-shadow': item.shadow,
				'font-family': item.font,
			});
		},
		packageImages(imgsSrc, parentId = null) {
			if (parentId) {
				imgsSrc.map((item, index) => {
					let files = [];
					files[0] = this.dataURLtoFile(item, new Date().getTime() + '.jpg');
					uploadHandle.init(
						files,
						{
							parentId: parentId,
						},
						(data, fileData) => {
							this.uploadList = data;
							if (fileData) {
								this.diskData.push(this.$api.disk.diskData(fileData));
								this.transFinish(fileData, 'upload');
								this.initDiskInfo();
							}
						},
						undefined
					);
				});
				this.fullscreenLoading = false;
				this.$Message.success('生成成功');
				return;
			}
			let arr = this.currentFolder.parentName.split('/');
			arr[arr.length - 1] = '样品';
			this.$api.disk.newFolder(
				{
					parentId: this.currentFolder.parentId,
					name: '样品',
					parentName: arr.join('/'),
					type: 'news',
				},
				(rs) => {
					imgsSrc.map((item, index) => {
						let files = [];
						files[0] = this.dataURLtoFile(item, new Date().getTime() + '.jpg');
						uploadHandle.init(
							files,
							{
								parentId: rs.data.id,
							},
							(data, fileData) => {
								this.uploadList = data;
								if (fileData) {
									this.diskData.push(this.$api.disk.diskData(fileData));
									this.transFinish(fileData, 'upload');
									this.initDiskInfo();
								}
							},
							undefined
						);
					});
					this.fullscreenLoading = false;
					this.$Message.success('生成成功');
				}
			);
		},
		onResize(data, x, y, width, height) {
			let dom_height = this.$refs[data.rand][data.index].offsetHeight;
			let dom_width = this.$refs[data.rand][data.index].offsetWidth;
			this.$refs[data.rand][data.index].style.transform = `scale(${width / dom_width},${height / dom_height})`;
		},
		onResizeStop(x, y, width, height) {
			this.resizing = false;
		},
		onActivated() {
			this.$emit('change', { type: 'table', isDrawer: true });
			this.imgStyleToData = [];
			this.imgToData.map((item, index) => {
				if (item.type === 'text') {
					let obj = {
						...item,
						'font-size': this.getStyle(this.$refs[item.rand][item.index], 'fontSize'),
						color: this.getStyle(this.$refs[item.rand][item.index], 'color'),
						'font-family': this.getStyle(this.$refs[item.rand][item.index], 'fontFamily'),
						'text-shadow': this.getStyle(this.$refs[item.rand][item.index], 'textShadow'),
						textAlign: this.getStyle(this.$refs[item.rand][item.index], 'textAlign'),
						writingMode: this.getStyle(this.$refs[item.rand][item.index], 'writingMode'),
						class: this.$refs[item.rand][item.index].getAttribute('class'),
					};
					this.imgStyleToData.push(obj);
				}
			});
		},
		getStyle(obj, attr) {
			var ie = !+'\v1'; //简单判断ie6~8
			if (attr === 'backgroundPosition') {
				//IE6~8不兼容backgroundPosition写法，识别backgroundPositionX/Y
				if (ie) {
					return obj.currentStyle.backgroundPositionX + ' ' + obj.currentStyle.backgroundPositionY;
				}
			}
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return document.defaultView.getComputedStyle(obj, null)[attr];
			}
		},
		onDeactivated() {
			// this.$emit('change', { type: '', isDrawer: false });
		},
	},
};
</script>
<style scoped lang="scss">
.main {
	display: flex;
	position: relative;
	z-index: 999;
	// justify-content: space-between;
}
.tool-swiper {
	width: 480px;
	height: 640px;
	.tool-btn {
		width: 480px;
	}
	.swiper-img {
		position: absolute;
		height: auto;
	}
	.swiper-container {
		width: 480px;
		height: 670px;
		float: left;
		cursor: pointer;
	}
}
.swiper-wrapper {
	display: inherit;
}
.tool-r {
	display: inline-grid;
}
.my-active-class {
	box-sizing: content-box;
	border: 1px solid red;
}
// .my-class {
// 	border: 0;
// }
.G-Mt-10 {
	margin-top: 10px;
}
.handle,
.vdr {
	padding: 0;
}
::v-deep .el-carousel__indicators--outside {
	display: none;
}
::v-deep .el-carousel__container {
	height: 640px;
	border: 1px solid #dcdfe6;
}
::v-deep .handle-tm,
::v-deep .handle-mr,
::v-deep .handle-bm,
::v-deep .handle-ml {
	width: 0 !important;
	height: 0 !important;
	padding: 0 !important;
	background: transparent;
	border: 0;
}
::v-deep .swiper-pagination-bullet-active {
	width: 15px;
	height: 15px;
}
::v-deep .swiper-pagination-bullet {
	width: 15px;
	height: 15px;
}
::v-deep .swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
	bottom: 0;
}
</style>
