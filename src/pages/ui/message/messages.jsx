import React, {Component} from 'react';
import { message, Button,Card } from 'antd';


import '../ui.less'

class Messages extends Component {
    handleMsg1 = () => {
        message.info('这个一个信息弹框', 2.5);
    }

    //延时加载的弹框
    handleMsg2 = () => {
        message
            .loading('promise延时加载',2)
            .then(()=>message.success('学习成功',2))
            .then(()=>message.info('恭喜！！',2))
    }

    // 3s异步解除
    handleMsg3 = () => {
        message.loading('3s异步解除', 3); // 方式1

        // setTimeout(message.loading('3s异步解除...', 0), 3000); // 方式2

        // const hide = message.loading('3s异步解除...', 0); // 方式3
        // setTimeout(hide, 2500);
    }

    // 更新显示提示（在同一个框中，区别于方式2）
    handleMsg4 = () => {
        const key = 'updatable';
        message.loading({ content: '加载中，请稍候...', key});
        setTimeout(() => {
            message.success({ content: '加载成功!', key, duration: 2 });
        }, 1000);
    }

    //
    handleMsg5 = (type) => {
        message[type]('欢迎学习React高级课程！',2)
    }

    render() {
        return (
            <div style={{width: '100%'}} className='card-wrap'>
                <Card title='message的使用'>
                    <Button type='primary' onClick={this.handleMsg1}>Info弹框</Button>
                    <Button type='primary' onClick={this.handleMsg2}>延时加载</Button>
                    <Button type='primary' onClick={this.handleMsg3}>异步解除</Button>
                    <Button type='primary' onClick={this.handleMsg4}>更新类</Button>
                </Card>
                <Card title='常用的全局弹框' className='card-wrap'>
                    <Button onClick={() => this.handleMsg5('info')}>Info</Button>
                    <Button onClick={() => this.handleMsg5('warning')}>Warning</Button>
                    <Button onClick={() => this.handleMsg5('success')}>Success</Button>
                    <Button onClick={() => this.handleMsg5('error')}>Error</Button>
                </Card>
            </div>
        );
    }
}

export default Messages;