import React, {Component} from "react";
import {Card, Table, message, Divider} from "antd";
import moment from "moment";

import LinkButton from "../../components/link-button";
import UserListSearchForm from "./userListSearchForm";
import {PAGE_SIZE} from "../../utils/constants";
import {reqGetUserList} from "../../api";


class UserList extends Component {
    formRef = React.createRef();
    state = {
        total: 0, // 商品的总数量
        userList: [], // 商品的数组
        loading: false, // 是否正在加载中
        pageNum: 1,
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
                render: (data) => (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <Divider type='vertical'/>
                        <LinkButton>修改</LinkButton>
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
            if (res.code === 0) { // 登录成功
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
        const {userList, total, loading, pageNum} = this.state;

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

            </div>
        );
    }
}

export default UserList;