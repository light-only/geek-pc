import {Redirect, Route} from "react-router-dom";
import React,{Component} from "react";
import {hasToken} from "../../utils/storage";

/**
 * 封装组件，用来实现路由拦截，路由跳转前判断是否存在token，如果不存在跳转到登录页
 */
export default class AuthRouter extends Component{
    render(){
        const {component:Component,...rest} = this.props;
        return <Route {...rest}
             render={(props)=>{
            //判断当前是否存在token
            if(hasToken()){
                //存在token，渲染当前的组件
                return <Component {...props}/>
            }else{
                //不存在token直接重定向到登录页
                return <Redirect to={{
                    pathname:'/login',
                    /**
                     * 传递参数可以通过search 传递，或者是state传递，但是search只能传递字符串，state可以使对象的形式。
                     *
                     * 配置这个参数的意义就是当我们的token失效了，通过这个参数保存当前的url地址，登录之后会直接跳转到这个地址。
                     * */
                    state:{
                        form:props.location.pathname
                    }
                }}></Redirect>
            }
        }
        }></Route>
    }
}