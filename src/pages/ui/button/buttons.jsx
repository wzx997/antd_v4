import React, {Component} from "react";
import {Card, Button, Radio} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    DownloadOutlined,
    ArrowRightOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';

import "../ui.less";

class ButtonUi extends Component {
    state = {
        loading: false,
        iconLoading: false,
        size:'default'
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    };

    handleChange = (e) => {
        this.setState({
            size:e.target.value
        })
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">删除1</Button>
                    <Button type="primary" danger>删除2</Button>
                    <Button danger>Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>

                <Card title="图形按钮" className="card-wrap">
                    <Button icon={<PlusOutlined />}>创建</Button>
                    <Button icon={<EditOutlined />}>编辑</Button>
                    <Button icon={<DeleteOutlined />} type="danger">删除</Button>
                    <Button icon={<SearchOutlined />}>搜索</Button>
                    <Button icon={<DownloadOutlined />}>下载</Button>
                </Card>

                <Card title="Loading按钮" className="card-wrap">
                    <Button loading >加载中</Button>
                    <Button loading={this.state.loading} onClick={this.enterLoading}>
                        点击加载
                    </Button>
                    <Button loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                        点击加载!
                    </Button>
                </Card>

                <Card title="按钮组">
                    <Button.Group >
                        <Button type="primary" icon={<ArrowRightOutlined />}>前进</Button>
                        <Button type="primary" icon={<ArrowLeftOutlined />} >后退</Button>
                    </Button.Group>
                </Card>

                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group value={this.state.size} onChange={this.handleChange}>
                        <Radio value="small">小</Radio>
                        <Radio value="default">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button type="dashed" size={this.state.size}>Imooc</Button>
                    <Button disabled size={this.state.size}>Imooc</Button>
                </Card>
            </div>
        );
    }
}

export default ButtonUi;