<template>
	<section class="cloud-disk-header">
		<windowHeader ref="windowHeader" :config="headerConfig" width="32px" mode="hide"></windowHeader>
		<div class="header-container" :class="platform">
			<div class="logo-area">
				<div class="logo">
					<img src="../../../assets/common/img/app/CloudDisk.png" alt="" draggable="false" />
					<p class="name">C-DISK</p>
					<p class="capacity">{{ sizeTips }}</p>
				</div>
			</div>
			<div class="right">
				<div class="menu-list">
					<ul>
						<li v-for="(item, index) in navTypes" :key="index" @click="navTypeChange(item.flag)" :class="{ active: type === item.flag }">
							<span :class="[item.icon, { rotate: item.rotate }]"></span>
							<p>{{ item.name }}</p>
						</li>
					</ul>
				</div>
				<div class="container" v-if="isDisk">
					<diskUser @show="showWin" @exit="exitDisk"></diskUser>
					<Poptip v-if="isWeb" trigger="hover" placement="bottom-end" padding="0">
						<div class="action download-client">客户端下载</div>
						<clientDownload type="components" slot="content"></clientDownload>
					</Poptip>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import diskUser from './diskUser';
export default {
	name: 'diskHeader',
	components: {
		diskUser,
	},
	data() {
		return {
			headerConfig: {
				background: 'transparent',
				color: 'rgb(150,150,150,1)',
				title: '',
				resize: true,
				mini: true,
				close: (win) => {
					win.hide();
				},
			},
			navTypes: [
				{ name: '网盘', flag: 'disk', icon: 'sf-icon-hdd' },
				{ name: '分享', flag: 'share', icon: 'sf-icon-share-alt' },
				{ name: '传输', flag: 'trans', icon: 'sf-icon-exchange-alt', rotate: '90deg' },
				{ name: '基础数据', flag: 'ectd', icon: 'sf-icon-share-alt' },
				{ name: '生成图片', flag: 'image', icon: 'sf-icon-share-alt' },
				{ name: '模板', flag: 'template', icon: 'sf-icon-share-alt' },
			],
			platform: process.platform,
		};
	},
	props: {
		data: {
			type: Object,
		},
		type: {
			type: String,
			default: function () {
				return 'disk';
			},
		},
	},
	computed: {
		sizeTips() {
			console.log(this.data.size.total.fileSize(), 'this.data.size.total.fileSize()');
			return this.data.size.used.fileSize() + '/' + this.data.size.total.fileSize();
		},
		isDisk() {
			return this.$projectInfo.projectName === 'CloudDisk';
		},
		isWeb() {
			return !this.$isElectron;
		},
	},
	methods: {
		navTypeChange(value) {
			this.$emit('update:type', value);
		},
		showWin() {
			this.$refs.windowHeader.win.show();
		},
		exitDisk() {
			this.$parent.uploadList.forEach((item) => {
				typeof item.pause === 'function' ? item.pause() : '';
			});
		},
		updateCount() {
			return this.$parent.updateCount().count;
		},
	},
};
</script>

<style scoped lang="scss">
.cloud-disk-header {
	width: 100%;
	display: flex;
	flex-direction: column;
	-webkit-app-region: drag;
	background: #fff;
	box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.1);
	z-index: 1;
	.header {
		width: 100%;
		height: 30px;
	}
	.header-container {
		width: 100%;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.logo-area {
			width: 260px;
			height: 100%;
			display: flex;
			align-items: center;
			.logo {
				display: flex;
				align-items: flex-start;
				padding: 0 20px 0;
				position: relative;
				z-index: 1;
				img {
					width: 45px;
					height: 45px;
					border-radius: 100%;
					background: #edf1f8;
					margin-right: 5px;
				}
				.name {
					font-family: zk-font;
					font-size: 20px;
					margin-left: 5px;
					margin-top: -2px;
					color: #636363;
				}
				.capacity {
					font-size: 12px;
					color: #4f4f4f;
					font-weight: normal;
					position: absolute;
					top: 25px;
					left: 75px;
				}
			}
		}
		.right {
			width: 100%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.container {
				display: flex;
				align-items: center;
				height: 60px;
				.ivu-poptip {
					display: flex;
					align-items: center;
				}
			}
			.menu-list {
				-webkit-app-region: no-drag;
				ul {
					width: 100%;
					padding: 14px 0;
					overflow: hidden;
					display: flex;
					align-items: center;
					li {
						display: flex;
						align-items: center;
						cursor: pointer;
						overflow: hidden;
						margin-right: 30px;
						.rotate {
							transform: rotate(90deg) !important;
							font-size: 16px;
						}
						span {
							width: 35px;
							height: 35px;
							text-align: center;
							line-height: 35px;
							font-size: 16px;
							border-radius: 100%;
						}
						p {
							margin: 5px 0;
						}
					}
					.active {
						color: $diskMainColor;
					}
				}
			}
			.action {
				margin-right: 20px;
				&:hover {
					color: $diskMainColor;
					cursor: pointer;
				}
			}
			.download-client {
				margin-left: 10px;
				height: 25px;
				line-height: 25px;
				border-left: 1px solid #d2d2d2;
				padding-left: 10px;
			}
		}
		.ivu-dropdown {
			display: unset !important;
		}
	}
	.win32 {
		.right {
			padding-right: 100px;
		}
	}
	.darwin {
		.logo-area {
			padding-left: 30px;
		}
	}
}
</style>
