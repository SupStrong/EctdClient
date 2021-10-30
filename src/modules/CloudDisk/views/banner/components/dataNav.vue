<template>
	<div class="tool-data">
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="点我打开" name="1">
				<el-button @click="drawer = true" type="primary" style="margin-left: 16px"> 点我打开 </el-button>
			</el-collapse-item>
			<el-collapse-item title="文案" name="2"> </el-collapse-item>
			<el-collapse-item title="插画" name="3"> </el-collapse-item>
			<el-collapse-item title="表情" name="4"> </el-collapse-item>
		</el-collapse>
	</div>
</template>
<script>
export default {
	data() {
		return {
			activeNames: [],
			tableData: [
				{
					id: '12987122',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
				},
				{
					id: '12987123',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
				},
				{
					id: '12987125',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
				},
				{
					id: '12987126',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333',
				},
			],
		};
	},
	methods: {
		moveText(text) {
			console.log(text);
		},
	},
};
</script>
<style scoped lang="scss">
.tool-data {
	.table-list {
		width: 600px !important;
		max-height: 600px !important;
		overflow: scroll;
	}
	::v-deep .el-form-item {
		display: block;
		margin-bottom: 3px;
	}
}
span {
	cursor: pointer;
}
</style>
