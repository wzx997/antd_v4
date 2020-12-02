import React, {Component} from "react";
import {Card, Table, } from "antd";

import LinkButton from "../../components/link-button";

class BaseTables extends Component {
    // 初始化列
    initColumns1 = () => {
        this.columns1 = [
            {title: '姓名', dataIndex: 'name', width: 150,},
            {title: '年龄', dataIndex: 'age', width: 150,},
            {title: '地址', dataIndex: 'address',},
            {
                width: 120,
                title: '操作',
                render: (data) => (
                    <span>
                        {/*会把product对想放到目录路由组件的state中。
                        通过this.props.location.state可以取出值
                        可以用大括号括起来传递一个对象，也可以单独传值*/}
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ];
    }

    initColumns2 = () => {
        this.columns2 = [
            {title: '姓名', width: 120, dataIndex: 'name', key: 'name', fixed: 'left',},
            {title: '年龄', width: 70, dataIndex: 'age', key: 'age', fixed: 'left',},
            { title: 'Column 1', dataIndex: 'address', key: '1' },
            { title: 'Column 2', dataIndex: 'address', key: '2' },
            { title: 'Column 3', dataIndex: 'address', key: '3' },
            { title: 'Column 4', dataIndex: 'address', key: '4' },
            { title: 'Column 5', dataIndex: 'address', key: '5' },
            { title: 'Column 6', dataIndex: 'address', key: '6' },
            { title: 'Column 7', dataIndex: 'address', key: '7' },
            { title: 'Column 8', dataIndex: 'address', key: '8' },
            {
                title: '操作',
                fixed: 'right',
                width: 120,
                render: (data) => (
                    <span>
                        {/*会把product对想放到目录路由组件的state中。
                        通过this.props.location.state可以取出值
                        可以用大括号括起来传递一个对象，也可以单独传值*/}
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ];
    }

    initColumns3 = () => {
        this.columns3 = [
            {
                title: 'Name',
                dataIndex: 'name',
            },
            {
                title: 'Chinese Score',
                dataIndex: 'chinese',
                sorter: {
                    compare: (a, b) => a.chinese - b.chinese,
                    multiple: 3,
                },
            },
            {
                title: 'Math Score',
                dataIndex: 'math',
                sorter: {
                    compare: (a, b) => a.math - b.math,
                    multiple: 2,
                },
            },
            {
                title: 'English Score',
                dataIndex: 'english',
                sorter: {
                    compare: (a, b) => a.english - b.english,
                    multiple: 1,
                },
            },
        ];
    }

    initColumns4 = () => {
        this.columns4 = [
            {title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',},
            {title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left',},
            {title: '列1', dataIndex: 'address', key: '1', width: 150,},
            {title: '列2', dataIndex: 'address', key: '2', width: 150,},
            {title: '列3', dataIndex: 'address', key: '3', width: 150,},
            {title: '列4', dataIndex: 'address', key: '4', width: 150,},
            {title: '列5', dataIndex: 'address', key: '5', width: 150,},
            {title: '列6', dataIndex: 'address', key: '6', width: 150,},
            {title: '列7', dataIndex: 'address', key: '7', width: 150,},
            {title: '列8', dataIndex: 'address', key: '8', width: 200},
            {width: 120, title: '操作', fixed: 'right',
                render: () => (
                    <span>
                        <LinkButton>详情</LinkButton>
                        <LinkButton>修改</LinkButton>
                    </span>
                )
            },
        ];
    }

    // 初始化数据
    initData1 = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edward King ${i}`,
                age: i,
                address: `London, Park Lane no. ${i}`,
            });
        }
        this.data1 = data;
    }

    initData2 = () => {
        this.data2 = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 40,
                address: 'London Park',
            },
        ]
    }

    initData3 = () => {
        this.data3 = [
            {
                key: '1',
                name: 'John Brown',
                chinese: 98,
                math: 60,
                english: 70,
            },
            {
                key: '2',
                name: 'Jim Green',
                chinese: 98,
                math: 66,
                english: 89,
            },
            {
                key: '3',
                name: 'Joe Black',
                chinese: 98,
                math: 90,
                english: 70,
            },
            {
                key: '4',
                name: 'Jim Red',
                chinese: 88,
                math: 99,
                english: 89,
            },
        ];
    }

    initData4 = () => {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
        this.data4 = data;
    }

    componentWillMount() {
        this.initColumns1();
        this.initData1();
        this.initColumns2();
        this.initData2();
        this.initColumns3();
        this.initData3();
        this.initColumns4();
        this.initData4();
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card title='固定表头'>
                    <Table
                        bordered
                        columns={this.columns1}
                        dataSource={this.data1}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: 300 }}
                    />,
                </Card>

                <Card title='固定列'>
                    <Table
                        bordered
                        columns={this.columns2}
                        dataSource={this.data2}
                        scroll={{ x: 1500 }}
                    />,
                </Card>

                <Card title='排序'>
                    <Table
                        bordered
                        columns={this.columns3}
                        dataSource={this.data3}
                    />,
                </Card>

                <Card title='固定表头和列'>
                    <Table
                        bordered
                        columns={this.columns4}
                        dataSource={this.data4}
                        scroll={{ x: 1500, y: 300 }}
                    />
                </Card>
            </div>
        );
    }
}

export default BaseTables;