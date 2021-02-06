/*
包含应用中所有接口请求函数的模板
 */
import ajax from "./ajax";

const BASE = 'http://www.tp6-test.com'; //本次测试用的地址
// const BASE = 'api'; // 打包部署后端的地址，加上api到nginx上，匹配后代理到后端项目

//测试接口
export const reqTest = (data) => ajax(
    BASE + '/test2', data, 'POST'
);

//登录接口
export const reqLogin = (data) => ajax(
    BASE + '/login', data, 'POST'
);

//登录接口
export const reqReg = (data) => ajax(
    BASE + '/reg', data, 'POST'
);

//获取用户列表
export const reqGetUserList = (data) => ajax(
    BASE + '/getUserList', data, 'POST'
);

//更新用户信息
export const reqUpdateUser = (data) => ajax(
    BASE + '/updateUser', data, 'POST'
);

// 获取验证码
export const reqGetCodeByEmail = (data) => ajax(
    BASE + '/getCodeByEmail', data, 'POST'
);

// 重置密码
export const reqResetPassword = (data) => ajax(
    BASE + '/resetPassword', data, 'POST'
);