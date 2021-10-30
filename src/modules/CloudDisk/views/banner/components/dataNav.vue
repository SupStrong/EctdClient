<template>
	<div class="tool-data">
		<el-collapse v-model="activeNames" @change="handleChange">
			<el-collapse-item title="数据" name="1">
				<el-table class="table-list" :data="tableData" style="width: 100%">
					<el-table-column type="expand">
						<template slot-scope="props">
							<el-form label-position="left" inline class="demo-table-expand">
								<el-form-item label="商品名称">
									<span @dblclick="moveText(props.row.name)">{{ props.row.name }}</span>
								</el-form-item>
								<el-form-item label="所属店铺">
									<span>{{ props.row.shop }}</span>
								</el-form-item>
								<el-form-item label="商品 ID">
									<span>{{ props.row.id }}</span>
								</el-form-item>
								<el-form-item label="店铺 ID">
									<span>{{ props.row.shopId }}</span>
								</el-form-item>
								<el-form-item label="商品分类">
									<span>{{ props.row.category }}</span>
								</el-form-item>
								<el-form-item label="店铺地址">
									<span>{{ props.row.address }}</span>
								</el-form-item>
								<el-form-item label="商品描述">
									<span>{{ props.row.desc }}</span>
								</el-form-item>
							</el-form>
						</template>
					</el-table-column>
					<el-table-column label="商品 ID" prop="id"></el-table-column>
					<el-table-column label="商品名称" prop="name"></el-table-column>
					<el-table-column label="描述122" prop="desc"></el-table-column>
				</el-table>
			</el-collapse-item>
			<el-collapse-item title="文案" name="2">
				<p>你好</p>
			</el-collapse-item>
			<el-collapse-item title="插画" name="3">
				<div>简化流程：设计简洁直观的操作流程；</div>
				<div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
				<div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
			</el-collapse-item>
			<el-collapse-item title="表情" name="4">
				<div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
				<div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
			</el-collapse-item>
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
