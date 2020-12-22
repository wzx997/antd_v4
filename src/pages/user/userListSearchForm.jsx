import React, {Component} from "react";
import {Input, Button, Form, DatePicker} from "antd";

const { RangePicker } = DatePicker;

class UserListSearchForm extends Component {
    formRef = React.createRef();

    componentWillMount() {
        // antd4,将form组件传递到父组件的方法，传递formRef，
        // 父组件的调用方式是this.userListSearchForm.current.resetFields();
        this.props.setForm(this.formRef);
    }

    render() {
        const {searchSubmit, searchReset} = this.props;
        return (
            <Form ref={this.formRef} layout='inline'>
                <Form.Item name="username" label='用户名'>
                    <Input placeholder="输入用户名搜索"/>
                </Form.Item>

                <Form.Item name="time" label='注册时间'>
                    <RangePicker/>
                </Form.Item>

                <Form.Item>
                    <Button type='primary' onClick={searchSubmit}>搜索</Button>
                    <Button onClick={searchReset} style={{marginLeft: 50}}>重置</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default UserListSearchForm;