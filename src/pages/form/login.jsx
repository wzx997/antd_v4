import React, {Component} from "react";
import {Card, Form, Input, Button, Checkbox, Select, Space, Modal, message, notification} from "antd";
import { UserOutlined, LockOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import ModalForm from "./modalForm";

import "./form.less";

const { Option } = Select;
const layout = {
    labelCol: {span: 3,},
    wrapperCol: {span: 7,},
};
const tailLayout = {
    wrapperCol: {offset: 3, span: 7,}
};

class Login extends Component {
    formRef = React.createRef(); // 创建ref对象

    state = {
        visible: false,
        loading: false
    };

    //选择性别后的回调事件
    onGenderChange = (value) => {
        switch (value) {
            case 'male':
                this.formRef.current.setFieldsValue({note: 'Hi, man!',});
                return;
            case 'female':
                this.formRef.current.setFieldsValue({note: 'Hi, lady!',});
                return;
            case 'other':
                this.formRef.current.setFieldsValue({note: 'Hi there!',});
                return;
            default:
                return;
        }
    };

    // 模态框表单提交事件
    modalFormSubmit = () => {
        // 该代码是antd4中获取子组件并且子组件是一个表单组件时的的处理方法
        // 通过该代码可以操作子表单组件
        this.modalForm.current.validateFields().then(values => {
            this.setState({loading: true});
            setTimeout(() => {
                console.log(values);
                this.setState({loading: false, visible: false});
                message.success('保存成功',2);
                this.modalForm.current.resetFields();
            }, 1500)

        }).catch(errorInfo => {
            console.log(errorInfo);
            notification.error({
                    message: '发生了一些错误！！！',
                    description: '请确信息填写完成。'
                }
            );
        });
    }

    // 验证成功的回调
    onFinish = (values) => {
        console.log('验证成功：', values);
    };
    // 验证失败的回调
    onFinishFailed = (errorInfo) => {
        console.log('验证失败：', errorInfo);
    };
    //表单重置
    onReset = () => {
        this.formRef.current.resetFields();
    };
    // 自动填充
    onFill = () => {
        this.formRef.current.setFieldsValue({
            note: 'Hello world!',
            gender: 'male',
        });
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card title='登录内联表单'>
                    <Form
                        name="horizontal_login"
                        layout="inline"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: '用户名不能为空'}]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon"/>}
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
                        <Form.Item >
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title='垂直登录表单'>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
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
                            <Form.Item
                                name="remember"
                                valuePropName="checked"
                                // initialValue={true}
                                noStyle
                            >
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <span className="login-form-forgot" >找回密码</span>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title='表单方法调用'>
                    <Form
                        {...layout}
                        ref={this.formRef}
                        name="control-ref"
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            name="note"
                            label="注释"
                            rules={[{required: true,},]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="gender"
                            label="性别"
                            rules={[{required: true,},]}
                        >
                            <Select
                                placeholder="请选择性别"
                                onChange={this.onGenderChange}
                                allowClear
                            >
                                <Option value="male">male</Option>
                                <Option value="female">female</Option>
                                <Option value="other">other</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                            <Button type="primary" htmlType="button" onClick={this.onReset} style={{margin: '0 50px'}}>重置</Button>
                            <Button htmlType="button" onClick={this.onFill}>自动</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title='动态表单'>
                    <Form
                        name="dynamic_form_nest_item"
                        onFinish={this.onFinish}
                        autoComplete="off"
                    >
                        <Form.List name="users">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(field => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'first']}
                                                fieldKey={[field.fieldKey, 'first']}
                                                rules={[{ required: true, message: '姓氏必须输入' }]}
                                            >
                                                <Input placeholder="姓氏" />
                                            </Form.Item>
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'last']}
                                                fieldKey={[field.fieldKey, 'last']}
                                                rules={[{ required: true, message: '名字必须输入' }]}
                                            >
                                                <Input placeholder="姓名" />
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}
                                    <Form.Item>
                                        <Button type="dashed" style={{width: '500px'}} onClick={() => add()} block icon={<PlusOutlined />}>
                                            添加
                                        </Button>
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title='获取模态框表单数据'>
                    <Button  type="primary" onClick={()=>{this.setState({visible: true})}}>信息填写</Button>
                </Card>

                <Modal
                    title="信息填写"
                    visible={this.state.visible}
                    confirmLoading={this.state.loading}
                    onOk={this.modalFormSubmit}
                    onCancel={()=>{
                        this.modalForm.current.resetFields();
                        this.setState({
                            visible: false,
                        });
                    }}
                >
                    <ModalForm
                        /* 将该方法传递到子组件中，子组件中的componentWillMount()方法中调用这个方法
                         子组件把this.formRef传递过来，父组件中用this.modalForm.current.resetFields();的
                         方式进行调用
                        * componentWillMount() {
                            this.props.setForm(this.formRef);
                          }
                        * */
                        setForm={(form) => {this.modalForm = form}}
                    />
                </Modal>
            </div>
        );
    }
}

export default Login;