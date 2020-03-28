import "whatwg-fetch";

/*
*   适配低版本浏览器
*/
if (!window.requestAnimationFrame) {
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (function() {
        return window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame ||
            window.mozCancelAnimationFrame ||
            function(id) {
                window.clearTimeout(id);
            };
    })();
}

/*
*   克隆对象(深拷贝)
*/
function cloneObj(initalObj) {
	if (!initalObj) return null;
	var obj = null;
    
    obj = JSON.parse(JSON.stringify(initalObj));
    
    return obj;
}

/*
*   生成随机色
*/
 function getRandomColor() {
	return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
}

/*
*   生成随机数
*/
 function getRandomNum(a, b) {
	return Math.random()*(b-a) + a;
}

/*
*   请求数据
*/
 function postData(url, data) {
    url = true ? ("/qpvms/api"+url) : url;
    console.log(url,data)
	return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: data ? appendParam(data) : null
    }).then((res) => {
        let cloneRes = res.clone();
        try {
            let d = cloneRes.json();
            d.then((data) => {
                // console.log(data);
            });
        } catch (ex) {
            
        }
        return res;
    })
}

/*
*   请求数据
*/
function postJSONData(url, data) {
    url = true ? ("/qpvms/api"+url) : url;
    return fetch(url, {
        method: 'POST',
        // credentials: 'include',
        headers: {
            // 'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        // 注意 post 时候参数的形式
        body: data ? JSON.stringify(data) : null
    });
}

/*
*   请求formdate数据
*/
function postFormData(url, data) {
    url = true ? ("/qpvms/api"+url) : url;
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            // 'Accept': 'application/json, text/plain, */*',
            // 'Content-Type': 'application/json'
        },
        // 注意 post 时候参数的形式
        body: data
    });
}

/*
这是三期接口 
*/

function postDataNew(url, data) {
    url = true ? ("/bigdataapi"+url) : url;

	return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        // 注意 post 时候参数的形式
        body: data ? appendParam(data) : null
    }).then((res) => {
        let cloneRes = res.clone();
        try {
            // let d = cloneRes.json(); 
            // d.then((data) => {
            //     // console.log(data);
            // });
        } catch (ex) {
             
        }
        return res;
    })
}
function postJSONDataNew(url, data) {
    url = true ? ("/bigdataapi"+url) : url;
    return fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        // 注意 post 时候参数的形式
        body: data ? JSON.stringify(data) : null
    });
}

/*
*   拼接参数
*/
function appendParam(data) {
	if (data) {
		var str = "";
		for(var key in data){
			if (data.hasOwnProperty(key)) {
				str += key+"="+data[key] +"&"
			}
		}
		return str;
	}
}

/*
 *   将度转换成为度分秒
 */
export function formatDegree(value) { 
    value = Math.abs(value);  
    var v1 = Math.floor(value);//度  
    var v2 = Math.floor((value - v1) * 60);//分  
    v2=v2 < 10 ? (v2 = "0"+v2) : v2;
    var v3 = Math.round((value - v1) * 3600 % 60);//秒  
    v3=v3 < 10 ? (v3 = "0"+v3) : v3;
    return v1 + '°' + v2 + '\'' + v3 + '"';  
}
export {cloneObj, getRandomColor, getRandomNum, postData, postJSONData, postFormData,postDataNew,postJSONDataNew}

export function throttle(method, delay) {
    var timer=null;
    return function(...args) {
        // var context = this, args = arguments;
        window.clearTimeout(timer);
        timer = window.setTimeout(()=> {
            method.apply(this, args);
        }, delay);
    };
}