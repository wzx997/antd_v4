/*
包含应用中所有接口请求函数的模板
 */
import ajax from "./ajax";

// const BASE = 'http://localhost:5000'
const BASE = 'http://www.tp6-test.com'

//登录接口
export const reqTest = (data) => ajax(
    BASE + '/test2', data, 'POST'
);