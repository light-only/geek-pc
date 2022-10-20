import {Component} from "react";
import {Select} from "antd";
import {getChannels} from "../../api/channel";

export default  class Channel extends Component{
    state = {
        articleChannel:[]
    }


    componentDidMount() {
        //获取频道字典
        getChannels().then(res=>{
            this.setState({articleChannel:res.data.channels})
        })
    }

    render(){
        console.log(this.props,'____')
        return (
            <Select style={{width:200}} placeholder='请选择文章频道' value={this.props.value} onChange={this.props.onChange}>
                {
                    this.state.articleChannel.map(item=>{
                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                    })
                }
            </Select>
        )
    }
}