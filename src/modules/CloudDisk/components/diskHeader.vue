<template>
	<section class="cloud-disk-header">
		<windowHeader ref="windowHeader" :config="headerConfig" width="32px" mode="hide"></windowHeader>
		<header class="header fl-row-justy">
			<div style="width: 100%; display: flex">
				<div class="logo">
					<img src="https://img1.baidu.com/it/u=2847626372,3815971220&fm=253&fmt=auto&app=138&f=JPEG?w=708&h=500" alt="" />
				</div>
				<div class="nav">
					<div class="nav-list">
						<div>热门模板</div>
						<div></div>
					</div>
					<div class="nav-list">
						<div>素材中心</div>
						<div></div>
					</div>
					<div class="nav-list">
						<div>红薯基地</div>
						<div></div>
					</div>
					<div class="nav-list">
						<div>美妆</div>
						<div></div>
					</div>
					<div class="nav-list">
						<div>美妆方向</div>
						<div></div>
					</div>
					<div class="nav-list">
						<div>
							<router-link style="color: white" to="/toolMain/search">YOYO查词</router-link>
						</div>
						<div></div>
					</div>
				</div>
			</div>
			<div class="login">
				<div class="btns">登录</div>
				<div class="btns">注册</div>
			</div>
		</header>
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
				// { name: '网盘', flag: 'disk', icon: 'sf-icon-hdd' },
				// { name: '分享', flag: 'share', icon: 'sf-icon-share-alt' },
				// { name: '传输', flag: 'trans', icon: 'sf-icon-exchange-alt', rotate: '90deg' },
				// { name: '基础数据', flag: 'ectd', icon: 'sf-icon-share-alt' },
				// { name: '模板', flag: 'image', icon: 'sf-icon-share-alt' },
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
.header {
	height: 65px;
	padding: 0 32px;
	background-color: #2f2f2f;
}
.logo {
	width: 130px;
	height: 45px;
	img {
		width: 100%;
		height: 100%;
	}
}
.nav {
	width: 100%;
	display: flex;
	align-items: center;
	margin-left: 10px;
	.nav-list {
		padding: 0 12px;
		font-size: 15px;
		color: white;
		cursor: pointer;
	}
}
.login {
	display: flex;
	align-items: center;
	.btns {
		width: 75px;
		height: 35px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		border-radius: 5px;
		font-weight: bold;
		cursor: pointer;
	}
	.btns:nth-child(1) {
		background-color: #2f2f2f;
		border: 1px solid white;
		margin-right: 15px;
		font-size: 14px;
	}
	.btns:nth-child(2) {
		background-color: #2f2f2f;
		color: #ff4e60;
		border: 1px solid #ff4e60;
		font-size: 14px;
	}
}
</style>
