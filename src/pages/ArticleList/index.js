import style from './index.module.scss'

import {Component} from "react";
import {withRouter} from "react-router-dom";

class ArticleList extends Component{
    render(){
        return (
            <div className={style.articleList}>
                这是文章列表
            </div>
        )
    }
}

export default withRouter(ArticleList);