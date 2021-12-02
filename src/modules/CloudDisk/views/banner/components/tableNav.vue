<template>
	<div>
		<el-drawer title="选中文字" :wrapperClosable="false" :visible.sync="data.isDrawer" :size="30" direction="rtl">
			<el-table :data="listData" border style="width: 100%" @row-click="changeRow">
				<el-table-column fixed="left" label="页" width="40">
					<template slot-scope="scope">
						{{ scope.row.index + 1 }}
					</template>
				</el-table-column>
				<el-table-column label="文字" width="150">
					<template slot-scope="scope">
						<el-input v-model="scope.row.val" :value="scope.row.val" @change="handleEdit($event, scope.row)"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="" label="样式" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.class" placeholder="请选择" @change="handleEdit($event, scope.row, 'text')">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :class="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="样式1" width="100">
					<template slot-scope="scope">
						<el-select v-model="newV" placeholder="请选择" @change="handleEdit($event, scope.row, 'ku')">
							<el-option
								v-for="(item, index) in saveStyleData"
								:key="item"
								:label="item"
								:value="item"
								:style="{
									'text-align': item.textAlign,
									'writing-mode': item.writingMode,
									color: item['color'],
									'text-shadow': item['text-shadow'],
									'font-family': item['fontFamily'],
									'font-style': item['fontStyle'],
								}"
								>样式{{ index }}</el-option
							>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="排列方式" width="140">
					<template slot-scope="scope">
						<el-select v-model="scope.row.writingMode" placeholder="请选择" @change="handleEdit($event, scope.row)">
							<el-option v-for="item in writingModeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="" label="文字图片" width="120">
					<template slot-scope="scope">
						<el-select v-model="scope.row.imgHref" placeholder="请选择" @change="handleEdit($event, scope.row)">
							<el-option v-for="(item, index) in textImgOptions" :key="index" :label="item.value" :value="item.value">
								<img :src="item.value" alt="" />
							</el-option>
						</el-select>
					</template>
				</el-table-column> -->
				<el-table-column prop="" label="字体" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.fontFamily" placeholder="请选择" @change="handleEdit($event, scope.row)">
							<el-option v-for="item in fontFamilyArr" :key="item.value" :label="item.label" :value="item.value" :style="{ 'font-family': item.value }">
								{{ item.value }}
							</el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="居中方式" width="150">
					<template slot-scope="scope">
						<el-select v-model="scope.row.textAlign" placeholder="请选择" @change="handleEdit($event, scope.row)">
							<el-option v-for="item in textCenterOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column prop="" label="文字颜色" width="100">
					<template slot-scope="scope">
						<el-color-picker v-model="scope.row['color']" @change="editTextColor($event, scope.row, 'color')"></el-color-picker>
					</template>
				</el-table-column>
				<el-table-column prop="" label="文字阴影色" width="100" center>
					<template slot-scope="scope">
						<el-color-picker v-model="scope.row['textColor']" @change="editTextColor($event, scope.row, 'textShadow')"></el-color-picker>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="140">
					<template slot-scope="scope">
						<el-button @click="handleDelete($event, scope.row)" type="text" size="small">删除</el-button>
						<el-button @click="saveStyle($event, scope.row)" type="text" size="small">保存样式</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-drawer>
	</div>
</template>
<script>
import { Row } from 'view-design';
export default {
	data() {
		return {
			options: [],
			fontFamily: [
				98, 13, 14, 18, 19, 48, 49, 54, 55, 56, 57, 62, 74, 76, 79, 80, 89, 103, 105, 106, 107, 111, 112, 114, 118, 120, 121, 123, 124, 126, 127, 129, 131, 139,
				154, 162, 183, 186, 192, 198, 199, 203,
			],
			newV: {},
			textImgOptions: [],
			fontFamilyArr: [],
			saveStyleData: [],
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
		// 获取库里的样式
		this.getStyle();
		for (let i = 0; i < 23; i++) {
			let obj = {
				value: `G-font-${i}`,
				label: `常用样式${i}`,
			};
			this.options.push(obj);
		}
		for (let i = 0; i < this.fontFamily.length; i++) {
			let obj = {
				value: `Family-${this.fontFamily[i]}`,
				label: `Family-${this.fontFamily[i]}`,
			};
			this.fontFamilyArr.push(obj);
		}
		// 文字图片
		for (let i = 1; i <= 14; i++) {
			let obj = {
				value: require(`../image/${i}.png`),
			};
			this.textImgOptions.push(obj);
		}
	},
	methods: {
		getStyle() {
			this.$api.styleAll.list({}, (rs) => {
				if (rs.code === 0) {
					// this.$Message.success('新增成功');
					let newData = [];
					rs.data.rows.map((item, index) => {
						newData.push(JSON.parse(item.styleLevel));
					});
					this.saveStyleData = newData;
				}
			});
		},
		saveStyle(e, row) {
			let obj = {
				styleLevel: JSON.stringify(row),
			};
			this.$api.styleAll.create(obj, (rs) => {
				if (rs.code === 0) {
					this.$Message.success('新增成功');
					this.getStyle();
				}
			});
		},
		changeRow(row) {
			this.$emit('changeIndex', row.index);
			// row.index
		},
		editTextColor(val, item, type) {
			if (type === 'color') {
				item['color'] = val;
			}
			if (type === 'textShadow' && val != null) {
				item['text-shadow'] = `${val} 1px 0px, ${val} 0px 1px, ${val} -1px 0px, ${val} 0px -1px`;
				item['textColor'] = `${val}`;
			} else if (type === 'textShadow' && val == null) {
				item['text-shadow'] = '';
				item['textColor'] = '';
			}
			this.$emit('select', item);
		},
		handleEdit(value, row, type) {
			// row = this.newV;
			if (type == 'ku') {
				row = {
					...row,
					class: this.newV['class'],
					color: this.newV['color'],
					'font-size': this.newV['font-size'],
					'font-style': this.newV['font-style'],
					fontFamily: this.newV['fontFamily'],
					'text-shadow': this.newV['text-shadow'],
					textAlign: this.newV['textAlign'],
					textColor: this.newV['textColor'],
					transformScale: this.newV['transformScale'],
					writingMode: this.newV['writingMode'],
				};
			}

			if (type == 'text') {
				row.color = '';
				row['text-shadow'] = '';
			}
			this.$emit('select', row);
		},
		handleDelete(value, row) {
			this.$emit('delete', row);
		},
	},
};
</script>
<style lang="scss" scoped></style>
