import axios from 'axios'

export default {
    config: {
        isloading: false
    },
    post: function (param, config, success, error) {
        param = JSON.stringify(param)
        config.data = param;
        this.request('POST', param, config, success, error)
    },
    get: function (param, config, success, error) {
        config.params = param;
        this.request('GET', param, config, success, error)
    },
    request: function (method, param, config, success, error) {
        this.config.isloading = true;
        config.method = method;
        config.headers.token = sessionStorage.getItem("token");
        axios.request(config).then(res => {
            if (res.data.code == 0) {//eslint-disable-line
                success(res.data);
            } else if (res.data.code == 401) {//eslint-disable-line
            } else if (res.data.code == 500) {//eslint-disable-line
                success(res.data);
            }  else if (res.data.code == 400) {//eslint-disable-line
                success(res.data);
            } else {
                // var errormap = {
                //     200: '请求成功',
                //     // 400: '没有权限',
                //     401: '参数错误',
                //     402: '没有权限',
                //     403: '超过最大值限制',
                //     404: '节点不存在',
                //     405: '节点已经被该网关绑定',
                //     406: '未知错误',
                //     407: '类型不存在',
                //     408: '请求超时',
                //     409: '没有数据',
                //     410: '网关不存在',
                //     411: '验证码错误',
                //     412: '网关已经被绑定',
                //     413: '节点已经被绑定'
                // }
                success(res.data);
            }
        }).catch(errors => {
            console.log('--------------request start--------------')
            console.log(config.url)
            console.log(errors);
            console.log('--------------request end--------------')
        })
    },

}
