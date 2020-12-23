import React, {Component} from "react";
import {Card, Table, message, Divider, Modal} from "antd";
import moment from "moment";

import LinkButton from "../../components/link-button";
import UserListSearchForm from "./userListSearchForm";
import UserUpdateForm from "./userUpdateForm";
import {PAGE_SIZE} from "../../utils/constants";
import {reqGetUserList, reqUpdateUser} from "../../api";


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
                        <LinkButton>详情</LinkButton>
                        <Divider type='vertical'/>
                        <LinkButton onClick={() => this.openUserUpdateForm(user)} >更新</LinkButton>
                    </span>
                )
            },
        ];
    }

    /**
     * 请求接口获取用户列表数据
     * @param pageNum
     */
    getUserList = (pageNum = 1) => {
        this.setState({pageNum, loading: true});
        let data = {
            username: this.username ? this.username : '',
            start_time: this.startTime ? this.startTime : '',
            end_time: this.endTime ? this.endTime : '',
            page_num: pageNum,
            page_size: PAGE_SIZE,
            sort_key: this.sortKey ? this.sortKey : '',
            sort_value: this.sortValue ? this.sortValue : ''
        };

        reqGetUserList(data).then(res => {
            if (res.code === 0) { // 获取成功
                const {total, list} = res.data;
                this.setState({
                    total,
                    userList: list,
                    loading: false
                });
            } else {
                message.error('用户列表获取失败');
                this.setState({loading: false});
            }
        }).catch(_ => {
            this.setState({total: 0, userList: [], loading: false});
        });
    }

    /**
     * 点击搜索按钮的回调事件
     */
    searchUserList = () => {
        let username = this.userListSearchForm.current.getFieldValue('username');
        let timeRange = this.userListSearchForm.current.getFieldValue('time');

        let startTime = '';
        let endTime = '';
        if (timeRange) {
            startTime = moment(timeRange[0]).format('YYYY-MM-DD');
            endTime = moment(timeRange[1]).format('YYYY-MM-DD');
        }
        this.username = username ? username : '';
        this.startTime = startTime;
        this.endTime = endTime;
        this.getUserList();
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

        this.setState({confirmLoading: true});
        reqUpdateUser(data).then(res => {
            if (res.code === 0) { // 更新成功
                message.success('更新成功');
                this.UserUpdateForm.current.resetFields(); // 重置表单
                this.setState({confirmLoading: false, visible: false});
                this.getUserList(); //请求更新后的列表
            } else {
                message.error('更新失败');
                this.setState({confirmLoading: false});
            }
        }).catch(_ => {
            this.setState({confirmLoading: false});
        });
    }

    /**
     * 点击重置按钮的回调事件
     */
    searchReset = () => {
        this.userListSearchForm.current.resetFields();
        this.searchUserList();
    }

    componentDidMount() {
        this.getUserList();
    }

    componentWillMount() {
        this.initColumns();
    }

    render() {
        const {userList, total, loading, pageNum, visible, confirmLoading} = this.state;

        //定义card的标题
        const title = (
            <UserListSearchForm
                setForm={(form) => {this.userListSearchForm = form}}
                searchSubmit={this.searchUserList}
                searchReset={this.searchReset}
            />
        );

        return (
            <div style={{width: '100%'}}>
                <Card title={title}>
                    <Table
                        rowKey='id'
                        loading={loading}
                        dataSource={userList}
                        columns={this.columns}
                        pagination={{
                            current: pageNum,
                            total,
                            defaultPageSize: PAGE_SIZE,
                            showQuickJumper: true,
                            onChange: this.getUserList
                        }}
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
                    // 销毁modal内的元素，否则表单数据不正确，是上一次的值
                    // antd4需要这样干，antd3不需要
                    destroyOnClose
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