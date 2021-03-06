import url from 'url';
import disk from '../../api/modules/disk';
function getStorage(key) {
	let val = localStorage.getItem(key);
	try {
		if (val) {
			val = JSON.parse(val);
		}
	} catch (e) {
		val = null;
	}
	return val;
}

function setStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function getTitle(result) {
	const dir = result.dir;
	let title = 'Unknown';
	if (result.bittorrent && result.bittorrent.info && result.bittorrent.info.name) {
		title = result.bittorrent.info.name;
	} else if (
		result.files[0].path &&
		result.files[0].path.replace(new RegExp('^' + dir.replace(/\\/g, '/').replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '/?'), '').split('/').length
	) {
		title = result.files[0].path.replace(new RegExp('^' + dir.replace(/\\/g, '/').replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&') + '/?'), '').split('/');
		if (result.bittorrent) title = title[0];
		else title = title[title.length - 1];
	} else if (result.files.length && result.files[0].uris.length && result.files[0].uris[0].uri) {
		title = url.parse(result.files[0].uris[0].uri).path;
		if (title.includes('/')) {
			title = title.substr(title.lastIndexOf('/') + 1);
		}
	}

	if (result.files.length > 1) {
		let cnt = 0;
		for (let i = 0; i < result.files.length; i++) {
			if (result.files[i].selected === 'true') cnt += 1;
		}
		if (cnt > 1) title += ' (' + cnt + ' files..)';
	}
	return title;
}

export function intval(s, radix = 10) {
	return parseInt(s, radix) || 0;
}

export function formatResult(results) {
	results &&
		results.forEach((result) => {
			const totalLength = intval(result.totalLength);
			const completedLength = intval(result.completedLength);
			const downloadSpeed = intval(result.downloadSpeed);
			result.title = getTitle(result);
			result.totalLength = totalLength;
			result.progress = totalLength === 0 ? 0 : parseFloat((((completedLength * 1.0) / totalLength) * 100).toFixed(2));
			result.eta = !downloadSpeed
				? ''
				: formatTime(totalLength && totalLength - completedLength > 0 ? (totalLength - completedLength) / (result.downloadSpeed || 1) : 0);
			result.downloadSpeed = downloadSpeed;
			result.uploadSpeed = intval(result.uploadSpeed);
			result.uploadLength = intval(result.uploadLength);
			result.completedLength = intval(result.completedLength);
			result.numSeeders = intval(result.numSeeders);
			result.connections = intval(result.connections);
			disk.matchIcon(result, result.title.Before('.'), true);
		});
	return results;
}

export function bytesToSize(bytes) {
	bytes = Number(bytes);
	if (bytes === 0 || !bytes || isNaN(bytes)) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
}

export const statusText = {
	paused: '?????????',
	waiting: '?????????',
	active: '?????????',
	complete: '?????????',
	error: '????????????',
};

export function getStatusText(status) {
	return statusText[status] || status;
}

/*
 * ????????????????????????
 * @param {Number} seconds: ?????????????????????
 * @return {String} time: ????????????????????????
 */
function formatTime(seconds) {
	seconds = Math.floor(seconds);
	let min = Math.floor(seconds / 60),
		second = seconds % 60,
		hour,
		newMin;

	if (min > 60) {
		hour = Math.floor(min / 60);
		newMin = min % 60;
	}

	if (second < 10) {
		second = '0' + second;
	}
	if (min < 10) {
		min = '0' + min;
	}

	return hour ? hour + ':' + newMin + ':' + second : min + ':' + second;
}

export function getFileExt(file) {
	if (!file || file.indexOf('.') === -1) return '';
	return file.substr(file.lastIndexOf('.') + 1);
}

export function getCurrentConfig() {
	return getStorage('ARIA2_SERVER') || {};
}

export function getDownloadSaveDir() {
	return getStorage(`ARIA2_DOWNLOAD_DIR${getCurrentConfig().id}`);
}

export function setDownloadSaveDir(dir) {
	return setStorage(`ARIA2_DOWNLOAD_DIR${getCurrentConfig().id}`, dir);
}

export function isRemoteServer() {
	const conf = getCurrentConfig();
	return conf && conf.id && conf.id !== 1;
}
