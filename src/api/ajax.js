/*
发送异步ajax的函数模块
 */

import axios from "axios";
import {notification, message} from 'antd';

import storageUtils from "../utils/storageUtils";
import memoryUtils from "../utils/memoryUtils";


//设置请求头
axios.defaults.headers.common['auth-token'] = memoryUtils.user.token ? memoryUtils.user.token : '';

export default function ajax(url, data={}, type='GET') {
    return new Promise(( resolve, reject) => {
        let promise;

        // 1. 执行异步ajax请求
        if(type==='GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
            });
        } else { // 发POST请求
            promise = axios.post(url, data);
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            let resData = response.data
            if (resData.code < 10) {// 正常的请求code要么是0要么是1，小于10只是容错判断
                resolve(resData);
            } else {
                reject(resData.msg);
                if (resData.code === 10002)  { // 登录过期
                    message.error('登录已过期，2s后跳转到登录页面！');
                    // 删除保存的user数据
                    storageUtils.removeUser();
                    memoryUtils.user = {};

                    setTimeout(() =>{// 跳转到login，2s后跳转到登录页面
                        window.location.href = '/login';
                    },2000)
                } else {
                    message.error(resData.msg);
                }
            }
        }).catch(error => {// 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
            reject(error);
            console.log('出错了：' + error.message);
            notification.error({
                message: 'oh。网络开小差了~~~',
                description: '当前请求无法完成，请检查你的网络或稍后再试，也可以联系管理员协助解决。'
            });
        })
    })
}