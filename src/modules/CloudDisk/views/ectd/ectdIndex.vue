<!--  -->
<template>
	<div class="ectd-index">
		<Row :gutter="16" index="0" style="height: 80%">
			<!-- 左侧文件列表 -->
			<Col span="24">
				<div class="ectd-table-container">
					<Table :columns="china" :data="tableData"></Table>
				</div>
			</Col>
		</Row>
		<createData v-model="isShow" status="edit"></createData>
	</div>
</template>
<script>
import { colConfig, tableData, apiColConfig, getProjectData } from './ectdTestData';
import createData from '../../components/createData';
export default {
	name: 'ectdIndex',
	components: {
		createData,
	},
	props: {
		diskInfo: { type: Object, default: () => {} },
	},
	data() {
		return {
			colConfig,
			tableData,
			china: [
				{ title: '品牌名称', key: 'brandName', element: '<application-id>', fixed: 'left' },
				{ title: '品牌别称', key: 'niceName', element: '<sequence-number>' },
				{ title: '名称', key: 'name', element: '<application-type>' },
				{ title: '含量', key: 'content', element: '<regulatory-activity-type>' },
				{ title: '分类', key: 'classify', element: '<sequence-type>' },
				{ title: '国籍', key: 'nationality', element: '<sequence-description>' },
				{ title: '价格', key: 'price' },
				{ title: '功效', key: 'effect' },
				{ title: '详情', key: 'details' },
				{
					title: '图片',
					key: 'image',
					render: (h, params) => {
						return h('img', {
							attrs: {
								src: params.row.image,
								style: 'width:40px;height:40px;margin-right:5px;display:flex',
							},
						});
					},
				},
				{
					title: '操作',
					key: 'action',
					render: (h, params) => {
						console.log(params);
						return h('div', [
							h(
								'span',
								{
									style: {
										fontSize: '14px',
										cursor: 'pointer',
										color: '#fc1',
									},
									on: {
										click: () => {
											this.isShow = true;
											this.editId = params.row.id;
										},
									},
									class: 'btn',
								},
								'编辑'
							),
							h(
								'span',
								{
									style: {
										fontSize: '14px',
										padding: '5px 10px',
										cursor: 'pointer',
										color: 'green',
									},
									on: {
										click: () => {
											this.$confirm({
												title: '删除',
												tips: '确认删除此数据？',
												callback: () => {
													this.delPopup = true;
												},
											});
										},
									},
									class: 'btn',
								},
								'删除'
							),
						]);
					},
				},
			],
			delPopup: false,
			isShow: false,
			editId: '',
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
