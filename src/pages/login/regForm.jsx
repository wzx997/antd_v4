import React, {Component} from "react";
import {Form, Input, Button, notification, message,} from 'antd';
import {Link} from "react-router-dom";

import {reqReg} from "../../api";

const FormItem = Form.Item;
const formItemLayout = {//定义文字与表格宽度
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {span: 24, offset: 0,},
        sm: {span: 20, offset: 4,},
    },
};

class RegForm extends Component {
    formRef = React.createRef(); // 创建ref对象
    state = {
        loading: false,
    };

    // 验证两次输入的密码是否一致
    compareToFirstPassword = (rule, value,) => {
        if (value && value !== this.formRef.current.getFieldValue('password')) {
            return Promise.reject('两次密码不一致！');
        } else {
            return Promise.resolve();
        }
    };

    // 验证成功的回调
    onFinish = (values) => {
        this.setState({loading: true});
        delete values.confirm; //删除密码确认的这个字段

        reqReg(values).then(res => {//请求接口
            if (res.code === 0) { // 注册成功
                message.success('注册成功，1s后跳转到登录页面');

                this.setState({loading: false}); // 取消登录按钮加载
                setTimeout(() => {// 跳转到login，2s后跳转到登录页面
                    this.props.history.replace('/login');
                }, 1000);
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
        const {loading} = this.state;

        return (
            <div>
                <h2 style={{marginBottom: 30}}>注册新用户</h2>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    name='reg_form'
                    scrollToFirstError
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <FormItem label="用户名" name="username" initialValue='' hasFeedback
                              rules={[{required: true, message: '姓名不能为空！'},
                                  {max: 20, min: 1, message: '长度必须为1-10个字符！'},
                                  {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能是字母数字下划线'}]}
                    >
                        <Input placeholder="请输入用户名(字母、数字、下划线)" />
                    </FormItem>

                    <FormItem label='密码' name="password" initialValue='' hasFeedback
                              rules={[{required: true, message: '密码不能为空！'},
                                  {max: 16, min: 6, message: '长度必须为6-16个字符！'}]}
                    >
                        <Input.Password placeholder="请输入密码" />
                    </FormItem>

                    <FormItem label='确认密码' name="confirm" initialValue='' hasFeedback
                              rules={[{required: true, message: '确认密码不能为空！'},
                                  {validator: this.compareToFirstPassword}]}
                    >
                        <Input.Password placeholder="请再次输入密码" />
                    </FormItem>

                    <FormItem label="手机" name="mobile" initialValue='' hasFeedback
                              rules={[{required: true, message: '姓名不能为空！'},
                                  {pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'},]}
                    >
                        <Input placeholder="请输入手机号码"/>
                    </FormItem>

                    <FormItem label='邮箱' name="email" initialValue='' hasFeedback
                              rules={[{required: true, message: '姓名不能为空！'},
                                  {type: 'email', message: '邮箱地址格式不正确！'}]}
                    >
                        <Input placeholder="请输入邮箱地址"/>
                    </FormItem>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={loading}>注册</Button>
                        <Button  onClick={ () => this.formRef.current.resetFields()} style={{margin: 25}}>重置</Button>
                        <Link to='/login' style={{fontSize: 16}}>旧账号登录</Link>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default RegForm;