import style from './index.module.scss'
import { PlusOutlined } from '@ant-design/icons';
import React,{Component} from "react";
import {Link} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import {
    Breadcrumb,
    Card,
    Form,
    Input,
    Radio,
    Upload,
    Button,
    Space,
    Modal,
    message
} from "antd";
import {offset} from "antd/es/tree/utils/dropIndicator";
import Channel from "components/common/Channel";
import {addArticle, getArticle,editArticle} from "api/articleList";

class ArticlePublish extends Component {
    componentDidMount() {
        if(this.state.id){
            //需要发送请求，获取文章详情信息
            getArticle(this.state.id).then(res=>{

                const values = {
                    ...res.data,
                    type:res.data.cover.type,
                }
                this.formRef.current.setFieldsValue(values);
                const fileList = res.data.cover.images.map(item=>{
                    return {
                        url:item
                    }
                });
                console.log(fileList,'fileList')
                this.setState({
                    type:res.data.cover.type,
                    fileList,
                })
            })
        }
    }

    formRef = React.createRef();

        state = {
            type:0,
            fileList:[],
            previewOpen:false,
            previewImage:'',
            id:this.props.match.params.id
        }
        //上传图片
        uploadImage = ({fileList})=>{
            this.setState({
                fileList
            })
        }

    /**
     * 封装新增编辑方法
     * @param values
     * @param draft
     * @returns {MessageType}
     */
        save = (values,draft)=>{
            const { type,fileList,id } = this.state;
            if(fileList.length !== type){
                return message.warn('上传的图片数量不正确');
            }
            const images = fileList.map(item=>{
                return item.url || item.response.data.url;
            });
           if(id){
               editArticle({
                   ...values,
                   cover:{
                       type,
                       images
                   },
                   id
               },draft).then(res=>{
                   message.success('编辑成功');
                   this.props.history.push('/home/articleList');
               })
           }else {
               addArticle({
                   ...values,
                   cover:{
                       type,
                       images
                   }
               },draft).then(res=>{
                   message.success('添加成功');
                   this.props.history.push('/home/articleList');
               })
           }
        }

        //提交表单
        onFinish = (values)=>{
            this.save(values,false)
        }

        //radio 的change事件
        changeType = (e)=>{
            this.setState({
                type:e.target.value,
                fileList:[]
            });
        }

        //图片预览
        /** 已经存在的图片，url是在file.url中
         *  刚上传的图片，url是在file.response.data.url中
         *
         * **/
        handlePreview = (file)=>{
            const url = file.url || file.response.data.url;
            this.setState({
                previewImage:url,
                previewOpen :true
            })
        }

        //关闭
        handleCancel = ()=>{
            this.setState({
                previewImage:'',
                previewOpen:false
            })
        }
        //图片上传前校验
        beforeUpload = (file)=>{
            if(file.size >= 1024*500){
                message.warn('图片大小不能超过500kb');
                return Upload.LIST_IGNORE;
            }
            if(!['image/png','image/jpeg'].includes(file.type)){
                message.warn('只能上传jpg或者png的图片');
                return Upload.LIST_IGNORE;
            }
        }
        //存储草稿
        addDraft = async ()=>{
            const values = await this.formRef.current.validateFields();
            this.save(values,true);
        }
        render() {
            const { fileList,type,id} = this.state;
            return (
                <div className={style.articlePublish}>
                    <Card>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to='/home'>首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>{ id? '编辑文章' :'发布文章'}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card>
                    <Card>
                            <Form
                                labelCol={{span: 4,}}
                                wrapperCol={{span: 14,}}
                                layout="horizontal"
                                onFinish={this.onFinish}
                                initialValues={
                                    {
                                    content:'',
                                    type:this.state.type
                                    }
                                }
                                ref={this.formRef}
                            >
                                <Form.Item label="标题" name='title' rules={[{required:true,message:"文章标题不能为空"}]} ><Input style={{width:400}} placeholder='请输入文章标题'/></Form.Item>
                                <Form.Item label="频道" name='channel_id' rules={[{required:true,message:"文章频道不能为空"}]}><Channel style={{width:400}}/></Form.Item>
                                <Form.Item label="封面" name='type' >
                                    <Radio.Group style={{marginBottom:20}} onChange={this.changeType}>
                                        <Radio value={1}> 单图 </Radio>
                                        <Radio value={3}> 三图 </Radio>
                                        <Radio value={0}> 无图 </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                {/*上传组件*/}
                                {
                                    this.state.type !==0 && (
                                        <Form.Item wrapperCol={{offset:4}}>
                                            <Upload
                                                listType='picture-card'
                                                fileList={this.state.fileList}
                                                action='http://geek.itheima.net/v1_0/upload'
                                                onChange={this.uploadImage}
                                                name='image'
                                                onPreview={this.handlePreview}
                                                beforeUpload = {this.beforeUpload}
                                            >
                                                {
                                                    fileList.length < type && <PlusOutlined/>
                                                }
                                            </Upload>
                                        </Form.Item>
                                    )
                                }
                                <Form.Item label="内容" name='content' rules={[{required:true,message:"文章内容不能为空"}]}>
                                    <ReactQuill theme='snow' placeholder='请输入文章内容'/>
                                </Form.Item>
                                <Form.Item   wrapperCol={{offset:4}}>
                                   <Space>
                                       <Button type="primary" htmlType="submit">
                                           { id? '编辑文章' :'发布文章'}
                                       </Button>
                                       <Button onClick={this.addDraft}>
                                           存入草稿
                                       </Button>
                                   </Space>
                                </Form.Item>
                            </Form>
                    </Card>
                    <Modal open={this.state.previewOpen} title='图片预览' footer={null} onCancel={this.handleCancel}>
                        <img
                            alt="example"
                            style={{
                                width: '100%',
                            }}
                            src={this.state.previewImage}
                        />
                    </Modal>
                </div>

            )
        }
    }


export default ArticlePublish;