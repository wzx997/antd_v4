import React from 'react';
import ReactDOM from 'react-dom';

//配置中文主题
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import App from './App';

moment.locale('zh-cn');


ReactDOM.render(<ConfigProvider locale={zhCN}><App /></ConfigProvider>, document.getElementById('root'));