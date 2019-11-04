export default {
	config: {
		/* 请求接口通用地址 */
		baseUrl: "http://172.16.6.242:3001/api",
		header: {
			'Content-Type': 'application/json'
		},
		data: {},
		method: "post",
		dataType: "json",
		responseType: "text",
		success() {},
		fail() {},
		complete() {}
	},
	interceptor: {
		request: null,
		response: null
	},
	request(options) {
		if (!options) {
			options = {}
		}
		options.baseUrl = options.baseUrl || this.config.baseUrl
		options.dataType = options.dataType || this.config.dataType
		options.url = options.baseUrl + options.url
		options.method = options.method || this.config.method
	
		options.data = options.data;

		return new Promise((resolve, reject) => {
			let _config = null

			options.complete = (response) => {
				let statusCode = response.statusCode;
				response.config = _config;
				if (process.env.NODE_ENV === 'development') {
					if (statusCode === 200) {
						//console.log("【" + _config.requestId + "】 结果：" + JSON.stringify(response.data))
					}
				}
				if (this.interceptor.response) {
					let newResponse = this.interceptor.response(response)
					if (newResponse) {
						response = newResponse;
					}
				}
				// 统一的响应日志记录

				 _reslog(response)
				if (statusCode === 200) { //成功
					resolve(response);
				} else {
					reject(response)
				}
			}
			options.fail = (response) => {
				uni.showToast({
					title: '网络异常，请检查网络',
					position: 'bottom'
				})
			}

			_config = Object.assign({}, this.config, options)
			_config.requestId = new Date().getTime()

			if (this.interceptor.request) {
				this.interceptor.request(_config)
			}

			// 统一的请求日志记录
			//_reqlog(_config)

			if (process.env.NODE_ENV === 'development') {
				//console.log("【" + _config.requestId + "】 地址：" + _config.url)
				if (_config.data) {
					//console.log("【" + _config.requestId + "】 参数：" + JSON.stringify(_config.data))
				}
			}
			uni.request(_config);
		});
	},
	get(url, data, options) {
		if (!options) {
			options = {}
		}
		options.url = url
		options.data = data
		options.method = 'GET'
		return this.request(options)
	},
	post(url, data, options) {
		if (!options) {
			options = {}
		}
		options.data = data
		options.method = 'POST'
		return this.request(options)
	}
}

/* 加密方法 */
const encrypt = (data) => {
	var sha = sha1.hex_sha1(data);
	return sha;
}
/* 根据请求参数获得key，并且通过升序排序 */
const jsonSort = (data) => {
	let arr = [];
	for (var key in data) {
		arr.push(key.toLowerCase())
	}
	arr.sort();
	let str = '';
	for (var i in arr) {

		str += arr[i] + "&";
	}
	return str;
}
/* 获得当前时间 
 *以getTime形式返回
 */
const _currentTime = () => {
	var timestamp = new Date().getTime();
	return timestamp;
}

/**
 * 日志记录
 */
function _reqlog(req) {
	if (process.env.NODE_ENV === 'development') {
		console.log("【" + req.requestId + "】 地址：" + req.url)
		if (req.data) {
			console.log("【" + req.requestId + "】 请求参数：" + JSON.stringify(req.data))
		}
	}
}

/**
 * 响应接口日志记录
 */
function _reslog(res) {
	let _statusCode = res.statusCode;

	if (process.env.NODE_ENV === 'development') {
		console.log("【" + res.config.requestId + "】 地址：" + res.config.url)
		if (res.config.data) {
			console.log("【" + res.config.requestId + "】 请求参数：" + JSON.stringify(res.config.data))
		}
		console.log("【" + res.config.requestId + "】 响应结果：" + JSON.stringify(res))
	}
	//TODO 除了接口服务错误外，其他日志调接口异步写入日志数据库
	switch (_statusCode) {
		case 200:
			break;
		case 401:
		    // forLoginOut();
			break;
		case 404:
		case 403:
		// statusCode403();
			break;
		case 500:
		case 304:
			break;
		default:
			break;
	}
}
const statusCode403 = () =>{
	
	/* uni.showToast({
		title:"服务器拒绝请求,请联系管理客服",
		icon:"none"
	}) */
}
/* 状态码401 token失效 */
const forLoginOut = () => {
	
	const clearList = ["userId", "token","userPhone","nickName","headImg","userInfo"]
	clearList.forEach((val) => {
		storage.clearCloneStorage(val);
	})
	uni.showToast({
		title:"您的账号已被别人登录或登录信息已失效",
		icon:"none"
	})
	uni.redirectTo({
		url:"../../pages/login/login",
		animationType: 'slide-in-right'
	})


}


export {
	jsonSort,
	encrypt,
	_currentTime

}
