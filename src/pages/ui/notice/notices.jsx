import React, {Component} from 'react';
import { Button, notification, Card, Divider} from 'antd';
import {
    SmileOutlined,
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined
} from '@ant-design/icons';

import '../ui.less';

class Notices extends Component {
    //自定义关闭按钮和图标
    closeBtn = () => {
        const key = '1';
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                关闭
            </Button>
        );
        const icon = <SmileOutlined style={{color:'#E99629'}}/>
        notification.open({
            message: '手动关闭的通知框',
            description: '3秒后自动关闭，自定义关闭按钮，自定义图标',
            duration:3,
            btn,
            key,
            icon
        });
    }

    // 带有图标的提示框
    openNotification1 =  type => {
        notification[type]({
            message: '右侧通知框',
            description: '欢迎学习React高级课程！',
            duration:3,
            onClick: () => {
                console.log('点击了通知体!');
            },
            onClose: () => {//即使不点击，时间到后也会自定触发
                console.log('点击了关闭按钮!');
            },
        });
    };

    //自定义方向的提示框
    openNotification2 = (placement) => {
        notification.success({
            message: `通知框 ${placement}`,
            description:
                '欢迎学习React高级课程',
            placement,
        });
    };

    render() {
        const openNotification1 = () => {
            notification.open({
                message: 'Notification Title',
                duration: 2, //1s后关闭
                description:
                    'notice组件的基本使用',
                onClick: () => {
                    console.log('点击了组件!');
                },
            });
        };

        const openNotification2 = () => {
            notification.open({
                message: 'Notification Title',
                duration: 2, //1s后关闭
                description:
                    '不会自动关闭的notice组件',
                onClick: () => {
                    console.log('点击了组件!');
                },
            });
        };

        return (
            <div style={{width: '100%'}}>
                <Card title='notice组件基本使用' className="card-wrap">
                    <Button type="primary" onClick={openNotification1}>Notice1</Button>
                    <Button type="primary" onClick={openNotification2}>Notice2</Button>
                    <Button onClick={this.closeBtn}>手动关闭</Button>
                </Card>

                <Card title='带图标的提示框' className="card-wrap">
                    <Button onClick={() => this.openNotification1('success')}>Success</Button>
                    <Button onClick={() => this.openNotification1('info')}>Info</Button>
                    <Button onClick={() => this.openNotification1('warning')}>Warning</Button>
                    <Button onClick={() => this.openNotification1('error')}>Error</Button>
                </Card>

                <Card title='自定义方向的提示框' className="card-wrap">
                    <Button
                        type="primary"
                        icon={<RadiusUpleftOutlined/>}
                        onClick={() => this.openNotification2('topLeft')}
                    >
                        左上
                    </Button>
                    <Button
                        type="primary"
                        icon={<RadiusUprightOutlined/>}
                        onClick={() => this.openNotification2('topRight')}
                    >
                        右上
                    </Button>
                    <Divider/>
                    <Button
                        type="primary"
                        icon={<RadiusBottomleftOutlined/>}
                        onClick={() => this.openNotification2('bottomLeft')}
                    >
                        左下
                    </Button>
                    <Button
                        type="primary"
                        icon={<RadiusBottomrightOutlined/>}
                        onClick={() => this.openNotification2('bottomRight')}
                    >
                        右下
                    </Button>

                </Card>
            </div>
        );
    }
}

export default Notices;