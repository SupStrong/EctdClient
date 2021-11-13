<template>
	<div>
		<el-drawer title="插画" :wrapperClosable="false" :visible.sync="data.isDrawer" direction="rtl">
			<el-table :data="listData" border style="width: 100%">
				<el-table-column fixed prop="index" label="页码" width="50"> </el-table-column>
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
					<el-select v-model="value" popper-class="G-font-1" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :class="item.value"> </el-option>
					</el-select>
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
			console.log(this.listData, 'dada');
			this.$emit('select', row);
		},
		handleDelete(value, row) {
			this.$emit('delete', row);
		},
	},
};
</script>
<style lang="scss" scoped></style>
