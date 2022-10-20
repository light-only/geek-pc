import style from './index.module.scss'
import {Component} from "react";
import {Link} from "react-router-dom";
import { PlusOutlined ,EditOutlined ,DeleteOutlined ,ExclamationCircleOutlined } from '@ant-design/icons';
import defaultImg from 'assets/images/error.png'
import {
    Card,
    Breadcrumb,
    Form,
    Radio,
    DatePicker,
    Button,
    Table,
    Tag,
    Space,
    Modal,
    message
} from 'antd'
import {ArticleStatus} from "api/constants";
import {delArticle, getArticleList} from "api/articleList";
import Channel from "components/common/Channel";
const { confirm } = Modal;
const { RangePicker } = DatePicker;

class ArticleList extends Component{

    state = {
        articles:{}
    }
    reqParams = {
        page:1,
        per_page:10
    }
    componentDidMount() {
        this.getList();
    }
    //获取列表数据
    getList = (reqParams)=>{
        //获取文章列表数据
        getArticleList(reqParams).then(res=>{
            this.setState({articles:res.data})
        })
    }
    //处理页面跳转的逻辑
    onChange = (page,pageSize)=>{
        this.reqParams.page = page;
        this.reqParams.per_page = pageSize;
        this.getList(this.reqParams);
    }
    onFinish = (values)=>{
        if(values.status !==-1){
            this.reqParams.status = values.status;
        }else {
            this.reqParams.status = undefined
        }
        if(values.channel_id !==undefined){
            this.reqParams.channel_id = values.channel_id;
        }
        if(values.date){
            //一天的开始时间方法：startOf('day'),同理：一天的结束时间：endOf("day");
            this.reqParams.begin_pubdate = values.date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss');
            this.reqParams.end_pubdate = values.date[1].endOf('day').format('YYYY-MM-DD HH:mm:ss');
        }
        //查询操作需要让页码重置成1
        this.reqParams.page = 1;
        this.getList(this.reqParams)
    }

        //删除操作
        handleDelete = (id)=>{
            confirm({
                title: '温馨提示',
                icon: <ExclamationCircleOutlined />,
                content: '确定要删除这篇文章吗？',
                onOk:()=> {
                    console.log('确定');
                    //发送请求删除文章
                    delArticle(id).then(res=>{
                        message.success('删除成功');
                        this.getList();
                    })
                },
                onCancel() {
                    console.log('取消');
                },
            });
        }
        //编辑操作
        handleEdit = (id)=>{
            this.props.history.push(`/home/publish/${id}`)
        }
    columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            render(data){
                console.log(data,'%%%')
                if(data.type === 0){
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
            render:(data)=>{
                return (
                    <div style={{width:80}}>
                        <Space>
                            <Button type='primary' shape='circle' icon={<EditOutlined/>} onClick={()=>this.handleEdit(data.id)}></Button>
                            <Button type='primary' danger shape='circle' icon={<DeleteOutlined/>} onClick={()=>this.handleDelete(data.id)}></Button>
                        </Space>
                    </div>
                )
            }
        }
    ];

    render(){

        const { total_count ,results,per_page } = this.state.articles;



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
                        onFinish={this.onFinish}
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
                            <Channel/>
                        </Form.Item>
                        <Form.Item label="发布日期" name='date'>
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
                    <Table
                        dataSource={ results }
                        columns={this.columns}
                        rowKey='id'
                        pagination={{
                            position:['bottomCenter'],
                            total:total_count,
                            pageSize:per_page,
                            onChange:this.onChange
                        }}
                    />;
                </Card>
            </div>
        )
    }
}

export default ArticleList;