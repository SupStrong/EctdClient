<template>
	<div>
		<el-drawer title="选中文字" :wrapperClosable="false" :visible.sync="data.isDrawer" :size="30" direction="rtl">
			<el-table :data="listData" border style="width: 100%">
				<el-table-column fixed prop="index" label="坐标" width="50"> </el-table-column>
				<el-table-column label="文字" width="150">
					<template slot-scope="scope">
						<el-input v-model="scope.row.val" :value="scope.row.val" @change="handleEdit($event, scope.row)"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="" label="样式" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.class" placeholder="请选择" @change="handleEdit($event, scope.row)">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :class="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="排列方式" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.writingMode" placeholder="请选择" @change="handleWritingMode($event, scope.row)">
							<el-option v-for="item in writingModeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="居中方式" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.textAlign" placeholder="请选择" @change="handleCenter($event, scope.row)">
							<el-option v-for="item in textCenterOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click="handleDelete($event, scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
	</div>
</template>
<script>
export default {
	data() {
		return {
			options: [],
			textCenterOptions: [
				{
					value: 'start',
					label: '左对齐',
				},
				{
					value: 'center',
					label: '居中对齐',
				},
				{
					value: 'right',
					label: '右对齐',
				},
			],
			writingModeOptions: [
				{
					value: 'horizontal-tb',
					label: '横向对齐',
				},
				{
					value: 'vertical-lr',
					label: '纵向',
				},
			],
			sortArr: [
				{
					value: '',
					balel: '',
				},
			],
		};
	},
	props: {
		data: {
			type: Object,
			default: function () {
				return {};
			},
		},
		listData: {
			type: Object,
			default: function () {
				return {};
			},
		},
	},
	created() {
		for (let i = 0; i < 15; i++) {
			let obj = {
				value: `G-font-${i}`,
				label: `常用字体${i}`,
			};
			this.options.push(obj);
		}
	},
	methods: {
		handleClick(row) {
			console.log(row);
		},
		handleEdit(value, row) {
			this.$emit('select', row);
		},
		handleDelete(value, row) {
			this.$emit('delete', row);
		},
		handleWritingMode(value, row) {
			this.$emit('select', row);
		},
		handleCenter(value, row) {
			this.$emit('select', row);
		},
	},
};
</script>
<style lang="scss" scoped></style>
