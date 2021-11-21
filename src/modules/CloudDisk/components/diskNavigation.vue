<template>
	<div class="cloud-disk-navigation">
		<!-- 上方工具栏 新建 导入 浏览 编辑-->
		<div class="disk-func">
			<div class="left">
				<template v-if="type === 'disk'">
					<button class="btn primary" v-if="data.clipboard.length !== 0 && data.categoryType === 'all'" @click="actionControl('paste')">
						<span class="icon sf-icon-paste"></span>
						<span>粘贴</span>
					</button>
					<template v-if="haveSelect">
						<template v-if="data.categoryType !== 'trash'">
							<button class="btn text" @click="actionControl('download')">
								<span class="icon sf-icon-download"></span>
								<span>下载</span>
							</button>
							<!-- <button class="btn text" @click="actionControl('move')">
								<span class="icon sf-icon-arrows"></span>
								<span>移动到12</span>
							</button> -->
							<!-- <button class="btn text" @click="actionControl('copy')">
								<span class="icon sf-icon-copy"></span>
								<span>复制</span>
							</button>
							<button class="btn text" @click="actionControl('cut')">
								<span class="icon sf-icon-cut"></span>
								<span>剪切</span>
							</button> -->
							<button class="btn text" @click="actionControl('trash')">
								<span class="icon sf-icon-trash-alt"></span>
								<span>删除</span>
							</button>
							<!-- <button class="btn text" @click="actionControl('rename')" v-if="data.selectFiles.length === 1">
								<span class="icon sf-icon-file-edit"></span>
								<span>重命名</span>
							</button> -->
							<button class="btn text" v-if="data.selectFiles.length === 1">
								<span class="icon sf-icon-share"></span>
								<span>分享</span>
							</button>
						</template>
						<template v-else-if="data.categoryType === 'trash'">
							<button class="btn text" @click="actionControl('restore')">
								<span class="icon sf-icon-share"></span>
								<span>还原</span>
							</button>
							<button class="btn text" @click="actionControl('delete')">
								<span class="icon sf-icon-trash-alt"></span>
								<span>彻底删除</span>
							</button>
						</template>
					</template>
					<template v-else>
						<template v-if="data.categoryType === 'data'">
							<button class="btn primary">
								<span class="icon sf-icon-images"></span>
								<span @click="createData()">创建</span>
							</button>
						</template>
						<template v-if="data.categoryType === 'all'">
							<Poptip
								trigger="hover"
								placement="bottom-start"
								width="85"
								padding="0"
								@on-popper-show="hoverUpload = true"
								@on-popper-hide="hoverUpload = false"
							>
								<button class="btn primary">
									<div class="upload-text">
										<span>上传</span>
										<Icon :class="['arrow', { rotate: hoverUpload }]" type="ios-arrow-up" />
									</div>
								</button>
								<ul class="upload-type" slot="content">
									<li @click="actionControl('upload')">文件</li>
									<li @click="actionControl('uploadFolder')">文件夹</li>
								</ul>
							</Poptip>
							<button class="btn default" @click="actionControl('newFolder')">新建文件夹</button>
						</template>
						<template v-else-if="data.categoryType === 'trash'">
							<button class="btn remove" :disabled="cleanDisabled" @click="cleanTrash">清空</button>
							<button class="btn default" :disabled="cleanDisabled" @click="actionControl('restore')">全部还原</button>
						</template>
						<template v-else-if="data.categoryType === 'picture'">
							<button class="btn primary" :disabled="!$parent.diskData.length" @click="actionControl('quick-open')">
								<span class="icon sf-icon-images"></span>
								查看
							</button>
						</template>
						<template v-else-if="data.categoryType === 'music'">
							<button class="btn primary" :disabled="!$parent.diskData.length" @click="actionControl('quick-open')">
								<span class="icon sf-icon-play"></span>
								音乐
							</button>
						</template>
						<template v-else-if="data.categoryType === 'video'">
							<button class="btn primary" :disabled="!$parent.diskData.length" @click="actionControl('quick-open')">
								<span class="icon sf-icon-youtube-play"></span>
								视频
							</button>
						</template>
					</template>
				</template>
				<template v-else-if="type === 'share'">
					<button class="btn primary" :disabled="data.selectFiles.length !== 1" @click="copyShareAddress">复制链接</button>
					<button class="btn remove" v-if="data.categoryType === 'share'" :disabled="data.selectFiles.length !== 1" @click="actionControl('share')">
						取消分享
					</button>
				</template>
				<template v-else-if="type === 'image'">
					<el-button class="btn" type="primary" plain @click="changeData('data')">样品数据</el-button>
					<el-button class="btn" type="success" plain @click="changeData('classify')">分类</el-button>
					<el-button class="btn" type="info" plain @click="changeData('text')">文案</el-button>
					<el-button class="btn" type="warning" plain @click="changeData('image')">插画</el-button>
					<el-button class="btn" type="danger" plain @click="changeData('icon')">表情</el-button>
					<el-button class="btn" type="primary" plain @click="changeData('filter')">滤镜</el-button>
					<el-button class="btn" type="primary" plain @click="changeData('tool')">组件</el-button>
				</template>
				<template v-else-if="type === 'ectd'">
					<el-button class="btn" type="info" @click="showSample = true">样品</el-button>
					<el-button class="btn" type="primary" @click="showBrand = true">品牌</el-button>
					<el-button class="btn" type="danger" @click="showClassify = true">分类</el-button>
					<el-button class="btn" type="info" @click="showCompany = true">单位</el-button>
					<el-button class="btn" type="info" @click="showImgText = true">文案</el-button>
				</template>
				<template v-else>
					<!--<button class="btn default">全部开始</button>
					<button class="btn default">全部暂停</button>-->
				</template>
			</div>
			<div class="right" v-if="type !== 'trans'">
				<input
					type="text"
					placeholder="搜索您的网盘"
					v-model="searchKey"
					@keyup.enter="switchSearch"
					:style="showSearch ? { width: '200px', border: '1px solid #eee' } : ''"
				/>
				<button class="action sf-icon-search" @click="switchSearch" v-show="type === 'disk'" />
				<button :class="'action sf-icon-sort-amount-' + amountSort" @click="diskSort(sortData[0])" />
				<button class="action" :class="fileStateIcon" @click="changeFileState" />
			</div>
		</div>
		<div class="navigation-container">
			<div class="left" v-if="type !== 'trans'">
				<button class="sf-icon-chevron-left" @click="navControl('back')" :disabled="data.navData.length === 0" />
				<button class="sf-icon-home" @click="navControl('home')" style="font-size: 15px" />
				<button :class="'sf-icon-redo' + (loading ? ' sf-spin' : '')" @click="navControl('reload')" />
				<span class="line" />
			</div>
			<div class="container">
				<div class="item" @click="navControl('home')">{{ data.category }}</div>
				<div v-for="(item, index) in data.navData" :key="index" @mouseover="handleDragEnter" class="item" @click="navControl(item)">
					{{ item.name }}
				</div>
			</div>
		</div>
		<ul class="sort-container" v-if="fileStateIcon !== 'sf-icon-th-large' && type !== 'trans'">
			<li class="select-all">
				<!-- <Checkbox v-model="data.selectAll" @on-change="selectChange"></Checkbox> -->
			</li>
			<li
				v-for="(item, index) in sortData"
				:key="index"
				:class="'item sf-icon-sort-' + item.value + '-' + item.type"
				@click="diskSort(item)"
				ripple
				:style="{ width: item.width || '' }"
			>
				{{ item.name }}
			</li>
		</ul>
		<div class="trash-tip" v-if="data.categoryType === 'trash'">
			<p><i class="sf-icon-info-circle" /> 回收站仍然占用网盘空间，文件保存10天后将被自动清除</p>
		</div>
		<ectd-import v-model="showEctdImport"></ectd-import>
		<sampleData v-model="showSample" status="news" @input="showSample = false"></sampleData>
		<brandData v-model="showBrand" status="news" @input="showBrand = false"></brandData>
		<classifyData v-model="showClassify" status="news" @input="showClassify = false"></classifyData>
		<companyData v-model="showCompany" status="news" @input="showCompany = false"></companyData>
		<imgTextData v-model="showImgText" status="news" @input="showImgText = false"></imgTextData>
	</div>
</template>

<script>
import ectdImport from './ectdcpn/importFile.vue';
import sampleData from './sampleData.vue';
import brandData from './brandData.vue';
import classifyData from './classifyData.vue';
import companyData from './companyData.vue';
import imgTextData from './imgTextData.vue';
export default {
	name: 'diskNavigation',
	components: {
		ectdImport,
		sampleData,
		brandData,
		classifyData,
		companyData,
		imgTextData,
	},
	props: {
		type: String,
		data: {
			type: Object,
			default: function () {
				return {};
			},
		},
		loading: {
			type: Boolean,
			default: function () {
				return false;
			},
		},
	},
	data() {
		return {
			amountSort: 'up',
			sortData: [
				{ name: '文件名', value: 'alpha', key: 'name', type: 'up', width: '53%' },
				{ name: '修改日期', value: 'numeric', key: 'updatedAt', type: 'up' },
				{ name: '大小', value: 'numeric', key: 'size', type: 'up', width: '25%' },
			],
			searchKey: '',
			showSearch: false,
			hoverUpload: false,
			showEctdImport: false,
			showSample: false,
			showBrand: false,
			showClassify: false,
			showCompany: false,
			showImgText: false,
		};
	},
	computed: {
		fileStateIcon() {
			return this.$store.state.fileStateIcon;
		},
		cleanDisabled() {
			return this.$parent.diskData.length === 0;
		},
		haveSelect() {
			return this.$parent.haveSelect;
		},
	},
	methods: {
		navControl(commend) {
			//回调函数
			this.$emit('callback', commend);
		},
		inputShowType(data) {
			// this.
			// console.log(data, 'Dada');
		},
		createData() {
			this.$router.push('/create-data');
		},
		actionControl(commend) {
			this.$emit('action', commend);
		},
		changeFileState() {
			this.DiskShowState === 'cd-disk-block-file' ? (this.DiskShowState = 'cd-disk-list-file') : (this.DiskShowState = 'cd-disk-block-file');
			this.$store.commit('updateFileStateIcon');
			this.$emit('feature', 'state', this.DiskShowState);
		},
		changeData(val) {
			this.$emit('change', { type: val });
		},
		arraySort(array, key, type) {
			let temp, unfix;
			for (unfix = array.length - 1; unfix > 0; unfix--) {
				for (let i = 0; i < unfix; i++) {
					if (array[i][key] < array[i + 1][key] && type === 'down') {
						temp = array[i];
						array.splice(i, 1, array[i + 1]);
						array.splice(i + 1, 1, temp);
					} else if (array[i][key] > array[i + 1][key] && type !== 'down') {
						temp = array[i];
						array.splice(i, 1, array[i + 1]);
						array.splice(i + 1, 1, temp);
					}
				}
			}
			return array;
		},
		diskSort(item) {
			if (this.$parent.diskData.length) {
				item.type === 'up' ? (item.type = 'down') : (item.type = 'up');
				if (item.key === 'name') {
					this.amountSort === 'up' ? (this.amountSort = 'down') : (this.amountSort = 'up');
				}
				this.$emit('callback', 'sort', (data) => {
					return this.arraySort(data, item.key, item.type);
				});
			}
		},
		cleanTrash() {
			this.$confirm({
				title: '清空回收站',
				tips: '该操作将清空回收站且不可恢复,是否继续',
				callback: () => {
					let clean = this.$Message.loading({
						content: '正在清空回收站...',
						duration: 0,
					});
					this.$api.disk.delete(
						{
							id: 'all',
						},
						() => {
							clean();
							this.$Message.success('回收站已清空');
							this.$emit('callback', 'reload');
						},
						(rs) => {
							clean();
							this.$Message.error(rs.msg);
						}
					);
				},
			});
		},
		switchSearch() {
			if (!this.showSearch) {
				this.showSearch = true;
			} else if (this.searchKey.length && this.showSearch) {
				this.$emit('callback', 'search', this.searchKey);
			} else {
				this.showSearch = false;
			}
		},
		copyShareAddress() {
			let value = this.$api.public.server('diskWebUrl') + 's/' + this.data.selectFiles[0].share;
			this.$copyText(value);
			this.$Message.success('链接已复制');
		},
		selectChange(value) {
			this.$parent.diskData.forEach((item) => {
				item.active = value;
			});
		},
		handleDragEnter(e) {
			console.log(e);
		},
	},
};
</script>

<style scoped lang="scss">
.cloud-disk-navigation {
	width: 100%;
	.disk-func {
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		border-bottom: 1px solid #eee;
		justify-content: space-between;
		.left,
		.right {
			display: flex;
			align-items: center;
			position: relative;
			input {
				width: 0;
				height: 30px;
				right: 80px;
				text-indent: 10px;
				color: #4f4f4f;
				padding-right: 35px;
				border-radius: 20px !important;
				margin-right: -35px;
			}
			input:focus {
				border-color: $diskMainColor !important;
			}
			.action {
				min-width: 35px;
				height: 35px;
				line-height: 35px;
				text-align: center;
				color: #6d6d6d;
				font-size: 13px;
				background: none;
				&:hover {
					color: $diskMainColor;
				}
			}
		}
		.btn {
			padding: 2px 10px;
			border-radius: 3px;
			font-size: 12px;
			display: flex;
			align-items: center;
			margin-right: 10px;
			border: 1px solid rgba(0, 0, 0, 0);
			.icon {
				margin-right: 5px;
			}
			&.primary {
				background: $diskMainColor;
				color: #fff;
			}
			&.default {
				background: #fff;
				color: #6d6d6d;
				border: 1px solid #eee;
			}
			&.text {
				color: #6d6d6d;
				background: none;
				&:hover {
					color: $diskMainColor;
				}
			}
			&.remove {
				color: #fff;
				background: #f5491f;
			}
			.upload-text {
				display: flex;
				align-items: center;
				.arrow {
					transition: all 350ms;
					font-size: 16px;
					margin-top: -1px;
					margin-left: 5px;
				}
				.rotate {
					transform: rotate(180deg) !important;
				}
			}
		}
		::v-deep {
			.ivu-poptip-popper {
				min-width: 85px;
			}
		}
		.upload-type {
			width: 100%;
			border-radius: 4px;
			overflow: hidden;
			li {
				width: 100%;
				height: 30px;
				line-height: 30px;
				font-size: 12px;
				padding: 0 10px;
				cursor: pointer;
				&:hover {
					background: #f0f8fd;
					//color: #fff;
				}
			}
		}
	}
	.navigation-container {
		width: 100%;
		display: flex;
		.left {
			display: flex;
			align-items: center;
			.line {
				width: 1px;
				background: #d2d2d2;
				height: 25px;
			}
		}
		.container {
			width: 100%;
			height: 35px;
			flex: 1;
			display: flex;
			align-items: center;
			padding: 0 10px;
			.item {
				height: 35px;
				line-height: 35px;
				color: #757575;
				font-size: 14px;
				text-overflow: ellipsis;
				cursor: pointer;
				padding: 0 2px;
			}
			.item:before {
				content: '/';
				color: #dadada;
			}
			.item:first-child:before {
				display: none;
			}
			.item:hover {
				color: $diskMainColor;
			}
		}
		.right {
			padding-right: 10px;
			position: relative;
			display: flex;
			align-items: center;
		}
		button {
			min-width: 35px;
			height: 35px;
			line-height: 35px;
			text-align: center;
			color: #6d6d6d;
			font-size: 13px;
			background: none;
			position: relative;
			z-index: 1;
		}
		button:hover {
			color: $diskMainColor;
		}
	}
	.sort-container {
		width: 100%;
		line-height: 35px;
		display: flex;
		align-items: center;
		.select-all {
			width: 40px;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
		.item {
			color: #424e67;
			width: calc(23% - 10px);
			text-align: left;
			cursor: pointer;
			text-indent: 8px;
			&:nth-child(2) {
				text-indent: 0;
			}
		}
		.item:active {
			background: #e6e3e3;
		}
	}
	.trash-tip {
		width: 100%;
		padding: 5px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		p {
			font-size: 12px;
			color: #848484;
			i {
				font-size: 14px;
			}
		}
	}
}
</style>
