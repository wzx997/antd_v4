import React, {Component} from "react";
import {Link,} from "react-router-dom";
import {Button, Form, Input, notification} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";

class LoginForm extends Component {
    // 验证成功的回调
    onFinish = (values) => {
        // 对表单没有处理的数据进行处理
        console.log(values);
    };
    // 验证失败的回调
    onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        notification.error({
                message: '发生了一些错误！！！',
                description: '请确信息填写完成。'
            }
        );
    };
    render() {
        return (
            <div>
                <h2 style={{marginBottom: 60}}>用户登录</h2>
                <Form
                    name="login_form"
                    // 初始值，特别是对于一些非字符串的初始值需要放在这里，FormItem中只能初始化字符串
                    scrollToFirstError
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '用户名不能为空！' }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="请输入用户名"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '密码不能为空！' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                    <Link to='/login/reset_pwd' style={{fontSize: 16}}>忘记密码？</Link>
                    <Link to='/login/reg' style={{fontSize: 16, float: 'right'}}>注册新账号</Link>
                </Form>
            </div>
        );
    }
}

export default LoginForm;