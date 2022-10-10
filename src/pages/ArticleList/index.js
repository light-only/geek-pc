import style from './index.module.scss'
import {Component} from "react";
import {Link} from "react-router-dom";
import { PlusOutlined ,EditOutlined ,DeleteOutlined } from '@ant-design/icons';
import defaultImg from 'assets/images/error.png'
import {
    Card,
    Breadcrumb,
    Form,
    Radio,
    Input,
    Select,
    DatePicker,
    Button,
    Table,
    Tag, Space
} from 'antd'
import {ArticleStatus} from "api/constants";
import {getChannels} from "api/channel";
import {getArticleList} from "api/articleList";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

class ArticleList extends Component{

    state = {
        articleChannel:[],
        articles:{}
    }
    componentDidMount() {
        //获取频道字典
        getChannels().then(res=>{
            this.setState({articleChannel:res.data.channels})
        })
        //获取文章列表数据
        getArticleList().then(res=>{
            this.setState({articles:res.data})
        })
    }

    render(){

        const { total_count ,results } = this.state.articles;

        // this.componentDidMount()
        const handleFinish = (values)=>{
            console.log(values,'values+++');
        }

        const columns = [
            {
                title: '封面',
                dataIndex: 'cover',
                render(data){
                    if(data.type === 1){
                        return <img src={defaultImg} style={{width:200,height:120}}></img>
                    }else{
                        return <img src={data.images[0]} style={{width:200,height:120}}></img>
                    }
                }
            },
            {
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(status) {
                    const obj = ArticleStatus.find(item=>item.id === status);
                    return <Tag color={obj.color}>{obj.name}</Tag>
                }
            },
            {
                title: '发布时间',
                dataIndex: 'pubdate'
            },
            {
                title: '阅读数',
                dataIndex: 'read_count'
            },
            {
                title: '评论数',
                dataIndex: 'comment_count'
            },
            {
                title: '点赞数',
                dataIndex: 'like_count'
            },
            {
                title: '操作',
                render(){
                    return (
                        <div style={{width:80}}>
                            <Space>
                                <Button type='primary' shape='circle' icon={<EditOutlined/>}></Button>
                                <Button type='primary' danger shape='circle' icon={<DeleteOutlined/>}></Button>
                            </Space>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className={style.articleList}>
                <Card title={
                    <Breadcrumb>
                        <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                    </Breadcrumb>
                }>
                    <Form
                        layout="horizontal"
                        initialValues={{status:-1}}
                        onFinish={handleFinish}
                        size='small'
                    >
                        <Form.Item label="状态" name='status'>
                            <Radio.Group>
                                { ArticleStatus.map(item=>{
                                    return <Radio key={item.id} value={item.id}>{item.name}</Radio>
                                })}
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item label="频道" name='channel_id' >
                            <Select style={{width:200}} placeholder='请选择文章频道'>
                                {
                                    this.state.articleChannel.map(item=>{
                                        return <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item label="发布日期" name='time'>
                            <RangePicker />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                筛选
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title={`根据筛选条件共查询到 ${total_count} 条结果：`}>
                    <Table dataSource={ results } columns={columns} rowKey='id'/>;
                </Card>
            </div>
        )
    }
}

export default ArticleList;