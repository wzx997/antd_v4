import React from "react";
import {Card, Spin, Alert, message} from "antd";
import { LoadingOutlined } from '@ant-design/icons';


import "../ui.less";

export default class Loadings extends React.Component{
    state = { loading: true };

    componentDidMount() {
        setTimeout(()=>{
            this.setState({
                loading:false
            });
            message.success('加载完成！');
        },3000);
    }

    render() {
        //自定义加载图标
        const icon = <LoadingOutlined style={{ fontSize: 24 }}/>

        return (
            <div style={{width: '100%'}}>
                <Card title="Spin用法1" className="card-wrap">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                </Card>

                <Card title="Spin用法2,自定义图标" className="card-wrap">
                    <Spin indicator={icon}/>
                </Card>

                <Card title="Spin用法3,内容遮罩" className="card-wrap">
                    <Spin tip="加载中，请稍后..." indicator={icon} spinning={this.state.loading}>
                        <Alert
                            message="React"
                            description="React高级实战课程"
                            type="success"
                        />
                    </Spin>

                    <Spin tip="加载中，请稍后...">
                        <Alert
                            message="React"
                            description="React高级实战课程"
                            type="info"
                            style={{marginBottom:20}}
                        />
                    </Spin>
                </Card>
            </div>
        );
    }
}