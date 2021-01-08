import React, {Component} from "react";
import {Link, Redirect} from "react-router-dom";
import {Button, Form, Input, notification, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";

import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class LoginForm extends Component {
    state = {
        loading: false
    }

    // 验证成功的回调
    onFinish = (values) => {
        this.setState({loading: true});

        reqLogin(values).then(res => {
            if (res.code === 0) { // 登录成功
                message.success('登录成功');

                const user = res.data;
                memoryUtils.user = user; // 保存在内存中
                storageUtils.saveUser(user); // 保存到local中

                this.setState({loading: false}); // 取消登录按钮加载
                this.props.history.replace('/');// 跳转到管理界面 (不需要再回退回到登陆，该组件已经是路由组件可以这样，否则需要引入高阶组件包装)
            } else {
                message.error(res.msg);
                this.setState({loading: false});
            }
        }).catch(_ => {
            this.setState({loading: false});
        });
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
        // 如果用户已经登陆, 自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user.id) {
            return <Redirect to='/'/>
        }

        const {loading} = this.state;

        return (
            <div>
                <h2 style={{marginBottom: 60}}>用户登录</h2>
                <Form
                    name="login_form"
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            loading={loading}
                        >
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