import {Component} from "react";
import {withRouter, Route, Redirect} from "react-router-dom";
import {hasToken} from "../../utils/storage";

/**
 * 封装公共组件，用来路由鉴权使用。
 */
 class AuthRoute extends Component{
    render(){
        const {component:Component, ...rest} = this.props;
        return <Route
            {...rest}
            render={()=>{
                //判断是否有token
                if(hasToken()){
                    //有token,渲染组件
                    return <Component/>
                }else{
                    //没有token，渲染登录页面
                    return <Redirect to='/login'/>
                }

            }
        }></Route>
    }
}

export default withRouter(AuthRoute);