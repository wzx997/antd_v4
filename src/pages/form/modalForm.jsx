import React, {Component} from "react";
import {Form, Input} from "antd";

const layout = {
    labelCol: {span: 4,},
    wrapperCol: {span: 15,},
};

class ModalForm extends Component {
    formRef = React.createRef(); // 创建ref对象

    componentWillMount() {
        // antd4,将form组件传递到父组件的方法，传递formRef，
        // 父组件的调用方式是this.modalForm.current.resetFields();
        this.props.setForm(this.formRef);
    }

    render() {
        return (
            <Form
                {...layout}
                name="normal_login"
                ref={this.formRef}
            >
                <Form.Item
                    name="username"
                    label='用户名'
                    rules={[{required: true, message: '用户名不能为空！'}]}
                >
                    <Input placeholder="请输入用户名"/>
                </Form.Item>
                <Form.Item
                    name="email"
                    label='邮箱'
                    rules={[{required: true, message: '邮箱地址不能为空！'},
                        {type: 'email', message: '邮箱地址格式不正确！'}]}
                >
                    <Input placeholder="请输入邮箱地址"/>
                </Form.Item>
            </Form>
        );
    }
}

export default ModalForm;