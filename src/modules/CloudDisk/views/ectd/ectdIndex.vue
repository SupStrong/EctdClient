<!--  -->
<template>
	<div class="ectd-index">
		<Row :gutter="16" index="0" style="height: 80%">
			<!-- 左侧文件列表 -->
			<Col span="18">
				<div class="ectd-table-container">
					<Table :columns="colConfig" :data="tableData"></Table>
				</div>
			</Col>
			<!-- 右侧信息列 -->
			<Col span="6">
				<Row style="height: 48%">
					<Col span="24">
						<div class="ectd-table-container">
							<Card :bordered="false">
								<p slot="title">项目详情</p>
								<p>项目名称:wwwww</p>
								<p>负责人:wwwww</p>
							</Card>
						</div>
					</Col>
				</Row>
				<Row style="height: 48%; margin-top: 16px">
					<Col span="24">
						<div class="ectd-table-container">
							<Card :bordered="false">
								<p slot="title">序列信息</p>
								<p>项目名称:wwwww</p>
								<p>负责人:wwwww</p>
							</Card>
						</div>
					</Col>
				</Row>
			</Col>
		</Row>
	</div>
</template>

<script>
import { colConfig, tableData, apiColConfig, getProjectData } from './ectdTestData';
export default {
	name: 'ectdIndex',
	props: {
		diskInfo: { type: Object, default: () => {} },
	},
	data() {
		return {
			colConfig,
			tableData,
		};
	},
	methods: {
		/** 获取列表配置 */
		getColConfig() {
			//通过文档名获取对应标准的列
			let countryKey = this.diskInfo.country;
			let colConfig = apiColConfig[countryKey];
			this.colConfig = colConfig;
		},
		/** 获取项目信息 */
		getProjectData() {
			//1.列表data
			//2.基本信息
			//3.权限
			getProjectData(this.diskInfo.categoryType)
				.then((res) => {
					this.tableData = res;
				})
				.catch((err) => {
					console.log('获取项目信息错误', err);
				});
		},
		/** 刷新数据 */
		refreshData() {
			this.getColConfig();
			this.getProjectData();
		},
	},
	watch: {
		diskInfo: {
			handler() {
				this.refreshData();
			},
			deep: true,
		},
	},
};
</script>
<style scoped>
.ectd-index {
	background: #f5f6fa;
	padding: 16px;
	height: 90%;
}
.ectd-table-container {
	padding: 16px;
	background: #ffffff;
	height: 100%;
}
</style>
