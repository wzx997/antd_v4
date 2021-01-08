import React, {Component} from "react";
import {Form, Input, Button, notification, message, Row, Col, Tooltip } from 'antd';
import {Link} from "react-router-dom";

import {reqGetCodeByEmail, reqResetPassword} from "../../api";

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

class ResetPwdForm extends Component {
    formRef = React.createRef(); // 创建ref对象
    state = {
        loading: false,
        codeLoading: false
    };

    // 获取验证码
    getCode = () => {
        let username = this.formRef.current.getFieldValue('username');
        let email = this.formRef.current.getFieldValue('email')
        if (username !== '' && email !== '') {
            this.setState({codeLoading: true});
            let data = {username, email};
            reqGetCodeByEmail(data).then(res => {
                if (res.code === 0) { // 发送成功
                    message.success('验证码发送成功，请到邮箱查看', 2);

                    this.setState({codeLoading: false});
                } else {
                    message.error(res.msg);
                    this.setState({codeLoading: false});
                }
            }).catch(_ => {
                this.setState({codeLoading: false});
            });
        } else {
            message.error('请输入用户名与邮箱地址获取验证码', 2);
        }
    }

    // 验证成功的回调
    onFinish = (values) => {
        this.setState({loading: true});

        reqResetPassword(values).then(res => { // 请求重置密码的接口
            if (res.code === 0) { // 重置密码成功
                message.success('重置密码成功，2s后自动跳转到登录页面');

                this.setState({loading: false}); // 取消加载按钮
                setTimeout(() => { // 页面跳转到登录页面
                    this.props.history.replace('/login');
                }, 2000);
            } else {
                message.error(res.msg, 2);
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
        const {loading, codeLoading} = this.state;

        return (
            <div>
                <h2 style={{marginBottom: 30}}>重置密码</h2>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    name='reset_form'
                    scrollToFirstError
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <FormItem label="用户名" name="username" initialValue='' hasFeedback
                              rules={[{required: true, message: '用户名不能为空'},]}
                    >
                        <Input placeholder="请输入用户名" />
                    </FormItem>

                    <FormItem label='邮箱' name="email" initialValue='' hasFeedback
                              rules={[{required: true, message: '邮箱不能为空'},
                                  {type: 'email', message: '邮箱地址格式不正确！'}]}
                    >
                        <Input placeholder="请输入邮箱地址"/>
                    </FormItem>

                    <FormItem label="验证码" hasFeedback>
                        <Row gutter={7}>
                            <Col span={12}>
                                <FormItem
                                    name="code"
                                    noStyle
                                    rules={[{required: true, message: '验证码不能为空！',},]}
                                >
                                    <Input placeholder="请输入验证码" />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <Tooltip title='请输入用户名与邮箱地址获取验证码'>
                                    <Button
                                        style={{marginLeft: 30}}
                                        loading={codeLoading}
                                        onClick={this.getCode}
                                    >
                                        获取验证码
                                    </Button>
                                </Tooltip>
                            </Col>
                        </Row>
                    </FormItem>

                    <FormItem label='新密码' name="password" initialValue='' hasFeedback
                              rules={[{required: true, message: '密码不能为空！'},
                                  {max: 16, min: 6, message: '长度必须为6-16个字符！'}]}
                    >
                        <Input.Password placeholder="请输入新密码" />
                    </FormItem>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
                        <Button  onClick={ () => this.formRef.current.resetFields()} style={{margin: 25}}>重置</Button>
                        <Link to='/login' style={{fontSize: 16}}>返回登录</Link>
                    </Form.Item>

                </Form>
            </div>
        );
    }
}

export default ResetPwdForm;