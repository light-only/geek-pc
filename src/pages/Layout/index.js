import style from './index.module.scss'
import React, {Component} from "react";
import { LaptopOutlined, NotificationOutlined, UserOutlined ,LogoutOutlined} from '@ant-design/icons';
import { Layout, Menu,Popconfirm} from 'antd';
import {Switch,Route,withRouter} from "react-router-dom";
import Home from "../Home";
import ArticleList from "../ArticleList";
import ArticlePublish from "../ArticlePublish";
import {removeToken} from "../../utils/storage";
import {getUserProfile} from "../../api/user";

const { Header, Content, Sider } = Layout;

 class LayoutComponent extends Component{
     state = {
         //存储用户信息
         profile:{}
     }
     componentDidMount() {
         getUserProfile().then(res=>{
             this.setState({profile:res.data})
         })
     }

     render(){


        //菜单数据
        const menuList = [
            {
                key:'/home',
                icon:<UserOutlined/>,
                label:'数据概览'
            },
            {
                key:'/home/articleList',
                icon:<LaptopOutlined/>,
                label:'文章列表'
            },
            {
                key:'/home/publish',
                icon:<NotificationOutlined/>,
                label:'发布文章'
            }
        ]
        //退出登录
        const confirm = ()=>{
            //确认退出->移除token->跳转到登录页
            removeToken();
            this.props.history.push('/login');
        }
        //点击菜单，跳转对应的页面
        const onClick = (menuItem)=>{
            this.props.history.push(menuItem.key);
        }
        return (
            <div className={style.layout}>
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <div className='profile'>
                            <span>{this.state.profile.name}</span>
                            <span>
                                <Popconfirm placement="bottom" title='是否确认退出登录吗？' onConfirm={confirm} okText="确定" cancelText="取消">
                                     <LogoutOutlined />退出
                                </Popconfirm>

                            </span>
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={200} className="site-layout-background">
                            <Menu
                                defaultSelectedKeys={[this.props.location.pathname]}
                                mode="inline"
                                style={{
                                    height: '100%',
                                    borderRight: 0,
                                }}
                                theme='dark'
                                onClick={onClick}
                                items={menuList}
                            />
                        </Sider>
                        <Layout
                            style={{
                                padding: '24px',
                                overflow:"auto"
                            }}
                        >
                            <Content className="site-layout-background">
                                   <Switch>
                                       <Route exact path='/home' component={ Home }></Route>
                                       <Route path='/home/articleList' component={ ArticleList }></Route>
                                       <Route path='/home/publish' component={ ArticlePublish }></Route>
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