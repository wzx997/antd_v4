import React, {Component} from "react";
import {Card, Form, Input, Button, Checkbox, message, notification, Select,
    Switch, DatePicker, Tooltip, AutoComplete, Row, Col, Cascader, Radio, InputNumber
} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import moment from "moment";

import provinceList from "../../config/provinceConfig";
import statusList from "../../config/statusConfig";
import hobbyList from "../../config/hobbyConfig";
import {getAgeByBirthday} from "../../utils/dateUtils";


const {Option} = Select
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const formItemLayout = {//定义文字与表格宽度
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 7 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {span: 24, offset: 0,},
        sm: {span: 16, offset: 4,},
    },
};

class RegForm extends Component {
    formRef = React.createRef(); // 创建ref对象
    state = {
        loading: false,
        autoCompleteResult: [], // 自动完成待选
    };

    // 验证两次输入的密码是否一致
    compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== this.formRef.current.getFieldValue('password')) {
            return Promise.reject('两次密码不一致！');
        } else {
            return Promise.resolve();
        }
    };

    // 处理自动获取网站的事件
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net', '.cn'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    // 不允许选择今天之后的时间
    disabledDate = (current) => {
        //之后用大于号，之前用小于号
        return current && current > moment().endOf('day');
    }

    // 选择生日后自动计算年龄
    autoAge = (date,) => {
        let birthday = moment(date).format('YYYY-MM-DD');
        let age = getAgeByBirthday(birthday);
        this.formRef.current.setFieldsValue({age})
    }

    // 提交表单，也onFinish={this.onFinish}的方式，但是按钮要改成提交按钮
    // 使用这种方式如果表单验证不通过不过触发滚动到错误字段的那个事件，只有是用submit按钮提交的才可以触发
    handleSubmit = () => {

    }

    //重置表单
    handleReset = () => {
        this.formRef.current.resetFields();
    }

    // 验证成功的回调
    onFinish = (values) => {
        // 对表单没有处理的数据进行处理
        // values.status = values.status ? values.status : 0;
        // values.birthday = values.birthday ? moment(values.birthday).format('YYYY-MM-DD') : '';

        console.log('处理后', values);

        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false});
            message.success('注册成功',2);
            this.formRef.current.resetFields();
        }, 1500);
    };
    // 验证失败的回调
    onFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        notification.error({
                message: '发生了一些错误！！！',
                description: '请确信息填写完成。'
            }
        );
    };

    render() {
        const { autoCompleteResult, loading} = this.state;

        //自动完成网站写入
        const websiteOptions = autoCompleteResult.map(website => (
            {label: website, value: website,}
        ));

        //定义电话号码前缀
        const prefixSelector = (
            <FormItem name="prefix" initialValue='86' noStyle>
                <Select style={{width: 70,}} >
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                </Select>
            </FormItem>
        );

        return (
            <div style={{width: '100%'}}>
                <Card title='注册信息填写' >
                    <Form
                        {...formItemLayout}
                        ref={this.formRef}
                        name='ref_form'
                        scrollToFirstError
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        initialValues={{city: [], hobby: [], sex: 0, marryStatus: 0, age: 0,}}
                    >
                        <FormItem label="姓名" name="username" initialValue='' hasFeedback
                                  rules={[{required: true, message: '姓名不能为空！'},
                                      {max: 20, min: 2, message: '长度必须为2-10个字符！'}]}
                        >
                            <Input placeholder="请输入姓名" />
                        </FormItem>

                        <FormItem label='密码' name="password" initialValue='' hasFeedback
                                  rules={[{required: true, message: '密码不能为空！'},
                                      {max: 16, min: 6, message: '长度必须为6-16个字符！'}]}
                        >
                            <Input.Password placeholder="请输入密码" />
                        </FormItem>

                        <FormItem label='确认密码' name="confirm" initialValue='' hasFeedback
                                  rules={[{required: true, message: '确认密码不能为空！'},
                                      {validator: this.compareToFirstPassword}]}
                        >
                            <Input.Password placeholder="请再次输入密码" />
                        </FormItem>

                        <FormItem label='邮箱' name="email" initialValue='' hasFeedback
                                  rules={[{required: true, message: '邮箱地址不能为空！'},
                                      {type: 'email', message: '邮箱地址格式不正确！'}]}
                        >
                            <Input placeholder="请输入邮箱地址"/>
                        </FormItem>

                        <FormItem label="手机" name="phone" initialValue='' hasFeedback
                                  rules={[{required: true, message: '手机号码不能为空！',},]}
                        >
                            <Input addonBefore={prefixSelector}/>
                        </FormItem>

                        <FormItem label="验证码" hasFeedback>
                            <Row gutter={7}>
                                <Col span={12}>
                                    <FormItem
                                        name="captcha"
                                        noStyle
                                        rules={[{required: true, message: '验证码不能为空！',},]}
                                    >
                                        <Input placeholder="请输入验证码" />
                                    </FormItem>
                                </Col>
                                <Col span={12}>
                                    <Button style={{marginLeft: 70}}>获取验证码</Button>
                                </Col>
                            </Row>
                        </FormItem>

                        <FormItem
                            label={
                                <span>
                                    昵称&nbsp;
                                    <Tooltip title="请输入你的昵称。">
                                        <QuestionCircleOutlined style={{color:'#1890ff'}}/>
                                    </Tooltip>
                                </span>
                            }
                            name="nickname" initialValue='' hasFeedback
                        >
                            <Input placeholder="请输入昵称" />
                        </FormItem>

                        <FormItem label="博客主页地址" name="website"
                                  initialValue='' hasFeedback
                        >
                            <AutoComplete
                                options={websiteOptions}
                                onChange={this.handleWebsiteChange}
                            >
                                <Input
                                    placeholder="请输入博客主页地址"
                                />
                            </AutoComplete>
                        </FormItem>

                        <FormItem label="城市" name='city' hasFeedback>
                            <Cascader options={provinceList} placeholder="请选择城市"/>
                        </FormItem>

                        <FormItem label="地址" name='addr' initialValue='' hasFeedback >
                            <Input placeholder="请输入地址" />
                        </FormItem>

                        <FormItem label="性别" name='sex'>
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>
                        </FormItem>

                        <FormItem label="婚姻状况" name='marryStatus'>
                            <Radio.Group>
                                <Radio value={0}>未婚</Radio>
                                <Radio value={1}>已婚</Radio>
                            </Radio.Group>
                        </FormItem>

                        <FormItem label="生日" name='birthday'>
                            <DatePicker disabledDate={this.disabledDate} format="YYYY-MM-DD" onChange={this.autoAge}/>
                        </FormItem>

                        <FormItem label="年龄" name='age'>
                            <InputNumber style={{width: 150}} disabled />
                        </FormItem>

                        <FormItem label="级别" name='status'>
                            <Select placeholder='请选择级别'>
                                {
                                    statusList.map(value => (
                                        <Option key={value.id} value={value.id}>{value.name}</Option>
                                    ))
                                }
                            </Select>
                        </FormItem>

                        <FormItem label="爱好" name='hobby'>
                            <Select placeholder='请选择爱好' mode="multiple">
                                {
                                    hobbyList.map(value => (
                                        <Option key={value.id} value={value.id}>{value.name}</Option>
                                    ))
                                }
                            </Select>
                        </FormItem>

                        <FormItem label="描述" name='desc' initialValue=''>
                            <TextArea
                                rows={4}
                                allowClear
                                placeholder="输入一些描述信息......"
                            />
                        </FormItem>

                        <Form.Item {...tailFormItemLayout} name="agreement" valuePropName="checked"
                            rules={[{
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject('请勾选用户协议'),
                                }]}
                        >
                            <Checkbox>
                                我已详细阅读并同意
                                <span style={{float: 'right', color: '#1890ff', cursor: 'pointer'}}>&nbsp;用户协议</span>
                            </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {/*<Button type="primary" onClick={this.handleSubmit} loading={loading}>注册</Button>*/}
                            <Button type="primary" htmlType="submit" loading={loading}>注册</Button>
                            <Button onClick={this.handleReset} style={{marginLeft: 50}}>重置</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>

        );
    }
}

export default RegForm;