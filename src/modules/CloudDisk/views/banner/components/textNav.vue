<template>
	<el-drawer title="文案" :wrapperClosable="false" :visible.sync="data.isDrawer" direction="rtl">
		<el-form label-position="right" label-width="80px" :model="form">
			<el-form-item label="新增文案">
				<el-input v-model="form.name" style="width: 290px; margin-right: 10px"></el-input>
				<el-button type="danger" @click="onSubmit">新增文案</el-button>
			</el-form-item>
		</el-form>
		<p class="text" v-for="(item, index) in textArr" :key="index" @dblclick="clickFun(item)">
			{{ item.name }}
			<el-divider></el-divider>
		</p>
	</el-drawer>
</template>
<script>
export default {
	data() {
		return {
			textArr: [],
			form: {
				name: '',
				categroyId: '',
			},
		};
	},
	props: { data: { type: Boolean, default: true } },
	created() {
		this.getData();
	},
	methods: {
		clickFun(val) {
			this.$emit('change', { val: val.name, type: 'text' });
		},
		getData() {
			this.$api.imgText.list({}, (rs) => {
				this.textArr = rs.data.rows;
			});
		},
		onSubmit() {
			if (this.form.name === '') {
				this.$Message.error('不能为空');
				return;
			}
			this.$api.imgText.create(this.form, (rs) => {
				if (rs.code === 0) {
					this.$Message.success('新增成功');
					this.form = {};
					this.getData();
				}
			});
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
.text {
	font-size: 18px;
	cursor: pointer;
	padding-left: 10px;
}
::v-deep .el-divider--horizontal {
	margin: 5px 0;
}
</style>
