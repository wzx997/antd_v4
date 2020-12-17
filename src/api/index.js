/*
包含应用中所有接口请求函数的模板
 */
import ajax from "./ajax";

const BASE = 'http://www.tp6-test.com'

//测试接口
export const reqTest = (data) => ajax(
    BASE + '/test2', data, 'POST'
);

//登录接口
export const reqLogin = (data) => ajax(
    BASE + '/login', data, 'POST'
);