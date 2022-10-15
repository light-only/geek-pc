import style from './index.module.scss'
import React,{Component} from "react";
import { LogoutOutlined,HomeOutlined,EditOutlined,DiffOutlined} from '@ant-design/icons';
import {Layout, Menu, message, Popconfirm} from 'antd';
import {Switch,Route,withRouter} from "react-router-dom";
import Home from 'pages/Home'
import ArticleList from "pages/ArticleList";
import ArticlePublish from "pages/ArticlePublish";

import {removeToken} from "utils/storage";
const { Header, Content, Sider } = Layout;


class LayoutComponent extends Component{
    render(){

        const handleConfirm = ()=>{
            //退出登录确定按钮
            //移除token
            removeToken();
            //跳转登录到login页面
            this.props.history.push('/login');
            //退出成功提示
            message.success('退出成功');
        }

        return (
            <div className={style.layout}>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <div className='profile'>
                            <span>用户名</span>
                            <span>
                                 <Popconfirm placement="topLeft" title='你确定要退出本系统吗?'  okText="确定" cancelText="取消" onConfirm={handleConfirm}>
                                     <LogoutOutlined />退出
                                 </Popconfirm>
                            </span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                style={{
                                    height: '100%',
                                    borderRight: 0,
                                }}
                                items={[
                                    {
                                        key: '1',
                                        icon: <HomeOutlined />,
                                        label: `数据概览`,
                                        onClick: () => { this.props.history.push('/home'); }
                                    },
                                    {
                                        key: '2',
                                        icon: <DiffOutlined />,
                                        label: '内容管理',
                                        onClick: () => { this.props.history.push('/home/article') }
                                    },
                                    {
                                        key: '3',
                                        icon: <EditOutlined />,
                                        label: '发布文章',
                                        // to: '/publish',
                                        onClick: () => { this.props.history.push('/home/publish') }
                                    },
                                ]}
                            >

                            </Menu>
                        </Sider>
                        <Layout
                            style={{
                                padding: '24px',
                            }}
                        >
                            <Content className="site-layout-background">
                               <Switch>
                                   {/*这个地方要注意的是，下面的两个地址都不能加上home前缀，因为前面已经加上了*/}
                                   <Route exact path='/home' component={ Home }></Route>
                                   <Route path='/home/article' component={ ArticlePublish }></Route>
                                   <Route path='/home/publish' component={ ArticleList }></Route>
                               </Switch>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

export default withRouter(LayoutComponent)