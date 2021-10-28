<!--  -->
<template>
	<Modal :value="value" title="新建" @on-cancel="$emit('input', false)">
		<Form :model="editForm" :label-width="80" label-colon>
			<FormItem label="名称">
				<Input v-model="editForm.name" placeholder="请输入名称"></Input>
			</FormItem>
			<FormItem label="品牌">
				<Select v-model="editForm.brandName">
					<Option value="test1" key="test1">雅诗兰黛{{ status }}</Option>
					<Option value="test2" key="test2">珂润</Option>
				</Select>
			</FormItem>
			<FormItem label="品牌别称">
				<Select v-model="editForm.niceName">
					<Option value="test1" key="test1">雅诗兰黛</Option>
					<Option value="test2" key="test2">珂润</Option>
				</Select>
			</FormItem>
			<FormItem label="含量">
				<Select v-model="editForm.content">
					<Option value="test1" key="test1">120kg</Option>
				</Select>
			</FormItem>
			<FormItem label="分类">
				<Select v-model="editForm.classify">
					<Option value="test1" key="test1">120kg</Option>
				</Select>
			</FormItem>
			<FormItem label="价格">
				<Input v-model="editForm.price" placeholder="请输入价格"></Input>
			</FormItem>
			<FormItem label="功效">
				<Input v-model="editForm.effect" placeholder="请输入功效"></Input>
			</FormItem>
			<FormItem label="详情">
				<Input v-model="editForm.details" placeholder="请输入详情"></Input>
			</FormItem>
			<FormItem label="上传图片">
				<!-- <Input v-model="editForm.serialNumber" placeholder="请输入详情"></Input> -->
			</FormItem>
		</Form>
	</Modal>
</template>

<script>
export default {
	name: 'createData',
	props: {
		value: { type: Boolean, default: true },
		status: {
			type: String,
			default: function () {
				return 'news';
			},
		},
	},
	data() {
		return {
			ileName: '测试.jpg',
			editForm: {},
			postData: {
				brandName: '',
				niceName: '',
				name: '',
				content: '',
				classify: '',
				price: '',
				effect: '',
				details: '',
				image: '',
			},
		};
	},
	methods: {
		inputKeyUp() {
			this.fileName = '测试.jpg';
		},
	},
};
</script>
<style scoped>
.form-lable {
	align-self: center;
}
</style>
