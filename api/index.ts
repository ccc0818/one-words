async function getWords() {
	return uni.request({
		url: 'https://api.vvhan.com/api/ian?type=json',
		method: 'GET'
	});
}

async function getImage() {
	return uni.request({
		url: 'https://api.vvhan.com/api/bing?type=json',
		method: 'GET'
	});
}

export async function getInfo() {
	let info = getCache();
	if (info) {
		let res: IInfo = JSON.parse(info);
		if (!isOut(res.date)) return res;
	}

	try {
		const [words, image]: any[] = await Promise.all([getWords(), getImage()]);
		let res: IInfo = {
			words: words.data.data.vhan,
			source: words.data.data.source,
			author: words.data.data.creator,
			image: image.data.data.url,
			date: new Date().toDateString(),
		};

		saveCache(res);

		return res;
	} catch {
		throw new Error('获取数据错误');
	}
}

interface IInfo {
	words: string;
	source: string;
	author: string;
	image: string;
	date: string;
}
const cacheKey = 'info';
function saveCache(obj: IInfo) {
	return uni.setStorageSync(cacheKey, JSON.stringify(obj));
}

function getCache() {
	return uni.getStorageSync(cacheKey);
}

function isOut(date: string) {
	return !(new Date().toDateString() === date);
}
