import style from './index.module.scss'
import {Component} from "react";
import {Button} from 'antd'
import {withRouter} from "react-router-dom";
class Home extends Component{
    render(){
        return (
            <div className={style.home}>
                    {/*
                    css modules 的作用就是自动把类名转换为独一无二的类型，通过style这个对象来调用，
                    这样就可以不影响其他页面中的样式了。
                    使用：
                        1、把对应的css文件改成xxx.module.css 然后通过导出style
                        2、通过style.xxx来调用。
                */}

            </div>

        )
    }
}

export default withRouter(Home);