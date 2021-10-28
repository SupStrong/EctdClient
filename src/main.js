import Vue from 'vue';
import App from './App.vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import routerTool from './common/routerTool';
import commonRouter from './common/router';
import commonStore from './common/store';
const projectConfig = require('./common/projectInfo.js').default; // 引入子系统运行打包配置
let mode = routerTool(VueRouter);
let router = tryGetModuleRoute();
let store = tryGetModuleStore();
function tryGetModuleRoute() {
	Vue.use(VueRouter);
	try {
		let route = require(`./modules/${projectConfig.projectName}/router/index`).default;
		route.routes = [...route.routes, ...commonRouter];
		route.mode = route.mode ? route.mode : mode;
		return new VueRouter(route);
	} catch (e) {
		return new VueRouter({
			mode: mode,
			routes: commonRouter,
		});
	}
}
function tryGetModuleStore() {
	Vue.use(Vuex);
	try {
		let store = require(`./modules/${projectConfig.projectName}/store/index`).default;
		store.state = Object.assign(store.state || {}, commonStore.state);
		store.mutations = Object.assign(store.mutations || {}, commonStore.mutations);
		store.getters = Object.assign(store.getters || {}, commonStore.getters);
		store.modules = Object.assign(store.modules || {}, commonStore.modules);
		return new Vuex.Store(store);
	} catch (e) {
		return new Vuex.Store(commonStore);
	}
}
function tryGetModuleMain() {
	try {
		require(`./modules/${projectConfig.projectName}/main`);
	} catch (e) {}
}
tryGetModuleMain();
require('./common/units'); //引入通用unit
Vue.prototype.$store = store;
Vue.config.productionTip = false;
new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');