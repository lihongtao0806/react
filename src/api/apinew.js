import config from './config'
import http from './http'

export default {
    getServiceTree: function (param, success, error) {
        config.url = 'ubiauthapi/gbac/service/getServiceTree';
        http.post(param, config, success, error);
    },
    deleteServiceById: function (param, success, error) {
        config.url = 'ubiauthapi/gbac/service/deleteServiceById';
        http.post(param, config, success, error);
    },
}