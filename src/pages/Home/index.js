import React,{Component} from "react";
import style from './index.module.scss'
export default class Home extends Component{
    render(){
        return (
            <div className={style.home}>
                <h1>内容管理</h1>
            </div>

        )
    }
}