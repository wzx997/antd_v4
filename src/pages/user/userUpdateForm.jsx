import React, {Component} from "react";
import {Form, Input} from "antd";

const layout = {
    labelCol: {span: 4,},
    wrapperCol: {span: 15,},
};

class UserUpdateForm extends Component {
    formRef = React.createRef(); // 创建ref对象

    componentWillMount() {
        this.props.setForm(this.formRef);
    }

    render() {
        const {user} = this.props;

        return (
            <Form {...layout} name="normal_login" ref={this.formRef}>
                <Form.Item
                    name="username"
                    label='用户名'
                    initialValue={user.username}
                >
                    <Input disabled/>
                </Form.Item>

                <Form.Item
                    label="手机"
                    name="mobile"
                    initialValue={user.mobile} hasFeedback
                    rules={[{pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, message: '请输入正确的手机号'},]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label='邮箱'
                    name="email"
                    initialValue={user.email}
                    hasFeedback
                    rules={[{type: 'email', message: '邮箱地址格式不正确！'}]}
                >
                    <Input placeholder="请输入邮箱地址"/>
                </Form.Item>

                <Form.Item
                    name="create_time"
                    label='注册时间'
                    initialValue={user.create_time}
                >
                    <Input disabled/>
                </Form.Item>

            </Form>
        );
    }
}

export default UserUpdateForm;