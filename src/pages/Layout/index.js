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

     /**
      * 组件更新完成的钩子函数，路由变化了，组件也会重新渲染
      * preProps:上一次的props
      * */
     componentDidUpdate(prevProps, prevState, snapshot) {
         let pathname = this.props.location.pathname
         //判断是否url地址发生变化，如果是，才更新
         if(this.props.location.pathname !== prevProps.location.pathname){
             //考虑修改文章的高亮问题
             if(pathname.startsWith('/home/publish')){
                 pathname = '/home/publish';
             }
             this.setState({
                 selectedKey : pathname
             })
         }
     }

     state = {
         //存储用户信息
         profile:{},
         selectedKey:this.props.location.pathname
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
                            {/*  如果默认高亮不会变，使用defaultSelectedKeys  */}
                            {/*  如果默认高亮会变，使用selectedKeys  */}
                            <Menu
                                selectedKeys={[this.state.selectedKey]}
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
                                       {/*新增文章路由*/}
                                       <Route path='/home/publish' exact component={ ArticlePublish } key='add'></Route>
                                       {/*编辑文章路由*/}
                                       <Route path='/home/publish/:id' component={ ArticlePublish } key='edit'></Route>
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