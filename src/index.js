import React from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';

//导入中文包
import 'moment/locale/zh-cn';
import locale from 'antd/es/locale/zh_CN';

//先引入antd组件样式
import 'antd/dist/antd.css';
//再引入自己的样式
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={locale}>
        <App />
    </ConfigProvider>

);

