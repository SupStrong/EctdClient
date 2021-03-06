module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	rules: {
		'no-console': 'off',
		'no-debugger': 'off',
		'no-duplicate-case': 2,
		eqeqeq: [2, 'allow-null'],
		'eol-last': ['error', 'always'],
		//关闭prettier
		'prettier/prettier': 'off',
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
};
