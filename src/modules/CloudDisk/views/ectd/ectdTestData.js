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
			applicationId: 'ww1111',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '标准',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
		},
		{
			applicationId: 'xpws113',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '标准',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
		},
		{
			applicationId: 'adpws13',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '标准',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
		},
		{
			applicationId: 'adpws13',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '特殊',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
		},
		{
			applicationId: 'adpws13',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '特殊',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
		},
		{
			applicationId: 'ww1111',
			sequenceNumber: 'xgwax1',
			applicationType: 'us V3 3ewasd',
			regulatoryActivityType: '已归档',
			sequenceType: '标准',
			sequenceDescription: '首次申请首次提交',
			changeTime: '2021-10-24',
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
		{ title: '申请号', key: 'applicationId', element: '<application-id>' },
		{ title: '序列号', key: 'sequenceNumber', element: '<sequence-number>' },
		{ title: '申请类型', key: 'applicationType', element: '<application-type>' },
		{ title: '注册行为类型', key: 'regulatoryActivityType', element: '<regulatory-activity-type>' },
		{ title: '序列类型', key: 'sequenceType', element: '<sequence-type>' },
		{ title: '序列描述', key: 'sequenceDescription', element: '<sequence-description>' },
		{ title: '修改时间', key: 'changeTime' },
		{ title: '操作', key: 'changeTime' },
	],
	europe: [
		{ title: '跟踪号', key: 'trackingNo', element: '<procedure-tracking>,<number>' },
		{ title: '序列号', key: 'sequence', element: '<sequence>' },
		{ title: '提交类型', key: 'submissionType', element: '<submission type>' },
		{ title: '提交单元', key: 'submissionUnit', element: '<submission-unit>' },
		{ title: '程序类型', key: 'procedureType', element: '<procedure type>' },
		{ title: '程序描述', key: 'submissionDescription', element: '<submissionDescription>' },
		{ title: '修改时间', key: 'changeTime' },
		{ title: '操作', key: 'changeTime' },
	],
	american: [
		{ title: '申请号', key: 'applicationNumber', element: '<application-number>' },
		{ title: '序列号', key: 'sequenceNumber', element: '<sequence-number>' },
		{ title: '申请类型', key: 'applicationType', element: '<application-type>' },
		{ title: '提交类型', key: 'submissionType', element: '<submission-type>' },
		{ title: '提交子类型', key: 'submissionSubType', element: '<submission-sub-type>' },
		{ title: '序列描述', key: 'description', element: '<submission-description>' },
		{ title: '修改时间', key: 'changeTime' },
		{ title: '操作', key: 'changeTime' },
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
