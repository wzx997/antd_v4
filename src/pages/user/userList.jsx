import React, {Component} from "react";
import {Card, Table, Divider, Modal, Form, Input} from "antd";



class UserList extends Component {
    formRef = React.createRef();
    state = {
        total: 0, // 商品的总数量
        userList: [], // 商品的数组
        loading: false, // 是否正在加载中
        pageNum: 1,
        visible: false,
        confirmLoading: false
    }

    /**
     * 初始化表格的列数据
     */
    initColumns = () => {
        this.columns = [
            {title: '姓名', dataIndex: 'username',},
            {title: '电话', dataIndex: 'mobile',},
            {title: '邮箱', dataIndex: 'email',},
            {title: '注册时间', dataIndex: 'create_time',},
            {
                width: 150,
                title: '操作',
                render: (user) => (
                    <span>
                        <span style={{color: '#1890ff', cursor: 'pointer'}}>详情</span>
                        <Divider type='vertical'/>
                        <span onClick={() => this.openUserUpdateForm(user)} style={{color: '#1890ff', cursor: 'pointer'}}>更新</span>
                    </span>
                )
            },
        ];
    }

    initData = () => {
        this.userList = [
            {
                "id": 1,
                "username": "admin",
                "mobile": "18300961222",
                "email": "1181659294@qq.com",
                "create_time": "2020-12-03 17:50:00"
            },
            {
                "id": 2,
                "username": "admin2",
                "mobile": "18300851725",
                "email": "sdad@qq.com",
                "create_time": "2020-12-03 18:05:58"
            },
            {
                "id": 5,
                "username": "admin3",
                "mobile": "18300961210",
                "email": "1181659294@qq.com",
                "create_time": "2020-12-17 17:56:57"
            }
        ]
    }


    /**
     * 打开更新模态框
     * @param user
     */
    openUserUpdateForm = (user) => {
        this.user = user;
        this.setState({visible: true});
    }

    /**
     * 更新用户信息，仅更新手机和邮箱
     */
    userUpdateSubmit = () => {
        let mobile = this.UserUpdateForm.current.getFieldValue('mobile');
        let email = this.UserUpdateForm.current.getFieldValue('email');

        // 需要更新的数据
        let data = {id: this.user.id, mobile, email};
        console.log(data);
    }


    componentWillMount() {
        this.initColumns();
        this.initData();
    }

    render() {
        const {visible, confirmLoading} = this.state;


        return (
            <div style={{width: '100%'}}>
                <Card >
                    <Table
                        rowKey='id'
                        dataSource={this.userList}
                        columns={this.columns}
                    />
                </Card>

                <Modal
                    title="更新用户信息"
                    visible={visible}
                    confirmLoading={confirmLoading}
                    onOk={this.userUpdateSubmit}
                    onCancel={()=>{
                        this.UserUpdateForm.current.resetFields();
                        this.setState({
                            visible: false,
                        });
                    }}
                >
                    <UserUpdateForm
                        setForm={(form) => {this.UserUpdateForm = form}}
                        user={this.user}
                    />
                </Modal>
            </div>
        );
    }
}

export default UserList;

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

        console.log(user);

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