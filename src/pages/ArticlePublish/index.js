import {Component} from "react";
import {withRouter} from "react-router-dom";

class ArticlePublish extends Component{
    render(){
        return (
            <div>
                这是文章发布
            </div>
        )
    }
}


export default withRouter(ArticlePublish);