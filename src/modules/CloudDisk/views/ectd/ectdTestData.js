const colConfig = [
	{ title: '序列号', key: 'serialNumber' },
	{ title: '标准', key: 'standard' },
	{ title: '状态', key: 'status' },
	{ title: '描述', key: 'describe' },
	{ title: '修改时间', key: 'changeTime' },
	{ title: '验证报告', key: 'report' },
	{ title: '操作', key: 'action' },
];
const tableData = [
	{
		applicationId: 'ww1111',
		sequenceNumber: 'xgwax1',
		applicationType: 'us V3 3ewasd',
		regulatoryActivityType: '已归档',
		sequenceType: '标准',
		sequenceDescription: '首次申请首次提交',
		changeTime: '2021-10-24',
	},
	{ serialNumber: 'xgwax2', standard: 'us V3 3ewasd', status: '已归档', changeTime: '2021-09-24', report: '查看', action: '动作' },
	{ serialNumber: 'xgwax3', standard: 'us V3 3ewasd', status: '已归档', changeTime: '2021-09-24', report: '查看', action: '动作' },
	{ serialNumber: 'xgwax4', standard: 'us V3 3ewasd', status: '已归档', changeTime: '2021-09-24', report: '查看', action: '动作' },
	{ serialNumber: 'xgwax5', standard: 'us V3 3ewasd', status: '已归档', changeTime: '2021-10-24', report: '查看', action: '动作' },
];

const apiTableData = {
	doucument1: [
		{
			id: '1',
			brandName: 'ww1111',
			nicename: 'xgwax1',
			name: 'us V3 3ewasd',
			content: '已归档',
			classify: '标准',
			nationality: '首次申请首次提交',
			price: '2021-10-24',
			effect: '2021-10-24',
			details: '2021-10-24',
			image: 'https://img0.baidu.com/it/u=1000551505,2077899926&fm=26&fmt=auto',
		},
	],
	doucument2: [
		{
			trackingNo: 'ae20001',
			sequence: '1st',
			submissionType: '审核',
			submissionUnit: 'wxz1001',
			procedureType: 'ectd',
			submissionDescription: '测试用例',
			changeTime: '2021-10-24',
		},
		{
			trackingNo: 'ae20002',
			sequence: '1st',
			submissionType: '审核',
			submissionUnit: 'wxz1001',
			procedureType: 'ectd',
			submissionDescription: '测试用例',
			changeTime: '2021-10-24',
		},
		{
			trackingNo: 'ae20003',
			sequence: '1st',
			submissionType: '审核',
			submissionUnit: 'wxz1001',
			procedureType: 'ectd',
			submissionDescription: '测试用例',
			changeTime: '2021-10-24',
		},
		{
			trackingNo: 'ae20004',
			sequence: '1st',
			submissionType: '审核',
			submissionUnit: 'wxz1001',
			procedureType: 'ectd',
			submissionDescription: '测试用例',
			changeTime: '2021-10-24',
		},
		{
			trackingNo: 'ae20005',
			sequence: '1st',
			submissionType: '审核',
			submissionUnit: 'wxz1001',
			procedureType: 'ectd',
			submissionDescription: '测试用例',
			changeTime: '2021-10-24',
		},
	],
};

const apiColConfig = {
	china: [
		{ title: '品牌名称', key: 'brandName', element: '<application-id>', fixed: 'left' },
		{ title: '品牌别称', key: 'nicename', element: '<sequence-number>' },
		{ title: '名称', key: 'name', element: '<application-type>' },
		{ title: '含量', key: 'content', element: '<regulatory-activity-type>' },
		{ title: '分类', key: 'classify', element: '<sequence-type>' },
		{ title: '国籍', key: 'nationality', element: '<sequence-description>' },
		{ title: '价格', key: 'price' },
		{ title: '功效', key: 'effect' },
		{ title: '详情', key: 'details' },
		{ title: '图片', key: 'image' },
		{
			title: '操作',
			key: 'action',
			render() {
				return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
			},
		},
	],
	europe: [
		{ title: 'id', key: 'id', element: '<procedure-tracking>,<number>' },
		{ title: '品牌名称', key: 'name', element: '<procedure-tracking>,<number>' },
		{ title: '别称', key: 'nikename', element: '<sequence>' },
		{ title: '国籍', key: 'nationality', element: '<sequence>' },
	],
	american: [
		{ title: 'id', key: 'id', element: '<application-number>' },
		{ title: '分类名称', key: 'name', element: '<application-number>' },
	],
};

const getProjectData = (param) => {
	let simulateApi = new Promise((resolve, reject) => {
		let data = apiTableData[param];
		if (!data) {
			resolve([]);
		}
		resolve(data);
	});
	return simulateApi;
};

export { colConfig, tableData, apiColConfig, apiTableData, getProjectData };
