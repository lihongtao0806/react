import { postData, postFormData, postJSONData, postJSONDataNew, postDataNew } from "../util/common";
// 登录页面
export function login(data) {
    return postData("/user/login", data);
}
// 河道
export function userRiver(data) {
    return postData("/personnel/river/userRiver", data);
}
// 数据上传
export function addSupervisorByAllow(data) {
    return postData("/supervisor/addSupervisorByAllow", data);
}
// 岸别
export function findDict(data) {
    return postData("/dict/findDict", data);
}
// 上传图片
export function uploadFiles(data) {
    return postData("/forensics/uploadFiles", data);
}
// 保存参数
export function list(data) {
    return postData("/region/list", data);
}
// 村居
export function findRegionName(data) {
    return postData("/forensics/findRegionName", data);
}

