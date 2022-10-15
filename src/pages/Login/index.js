import {Component} from "react";
import {Card,Form,Input,Checkbox,Button,message,Space} from 'antd'
import './index.scss'
import logo from 'assets/images/logo.png'
import {login} from 'api/user'
import {withRouter} from "react-router-dom";
import {setToken} from "utils/storage";

class Index extends Component{
    state = {
        // 登录状态
        loading:false
    }
    render(){
        const {state} = this.props.location;
        const onFinish=({mobile,code})=>{
            this.setState({loading:true})
               //调用登录接口
               login(mobile, code).then(res => {
                   //登录成功，保存token
                   setToken(res.data.token);
                   //跳转到登录页
                   if(state){
                       this.props.history.push(state.form);
                   }else{
                       this.props.history.push('/home');
                   }
                   message.success('登录成功')
               }).catch(error=>{
                   //通过.then的方式不能直接在用try catch去捕获错误，可以通过promise自带的catch去捕获。
                   message.warning(error.response.data.message);
                   this.setState({loading:false})
               })
        };
        function onFinishFailed(){

        }
        return (
            <div className="login">
                <Card className='login-container'>
                    {/*在react中路径不能是本地的地址，这样不会被webpack处理*/}{/*<img src="../../assets/images/logo.png" alt=""/>*/}
                    <img src={logo} alt="" className='login-logo'/>
                    {/*    表单*/}
                    <Form size='large'
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          initialValues={
                              {
                                  mobile:'13911111111',
                                  code:'246810',
                                  agree:true
                              }
                          }
                    >
                        <Form.Item
                            name='mobile'
                            rules={[
                                {
                                    required: true,
                                    message: '手机号不能为空',
                                },
                                {
                                    pattern:/^1[3-9]\d{9}$/,
                                    message:'手机号格式不正确'
                                }
                            ]}
                            validateTrigger="onChange"
                        >
                            <Input placeholder='请输入手机号' />
                        </Form.Item>

                        <Form.Item
                            name='code'
                            rules={[
                                {
                                    required: true,
                                    message: '验证码不能为空',
                                },
                                {
                                    pattern:/^\d{6}$/,
                                    message:'验证码格式不正确'
                                }
                            ]}
                        >
                            <Input placeholder='请输入验证码'/>
                        </Form.Item>

                        <Form.Item
                            name="agree"
                            valuePropName="checked"
                            // rules={[
                            //     {
                            //         required:true,
                            //         message:'请阅读并勾选协议'
                            //     },
                            //     {
                            //         pattern:/^true$/,
                            //         message:'请阅读并勾选协议'
                            //     }
                            // ]}
                            rules={
                               [
                                   {
                                       /**
                                        * Promise还有一些静态的方法：
                                        *  1、Promise.resolve()
                                        *  2、Promise.reject()
                                        *  3、Promise.all()
                                        *  4、Promise.race()
                                        *
                                        * 这些静态方法等同于下面的方式
                                        * new Promise((resolve,reject)=>{})
                                        *   return resolve();
                                        */
                                       validator:(rule,value)=>{
                                           if(value){
                                              return  Promise.resolve()
                                           }else{
                                              return Promise.reject('请阅读并勾选协议')
                                           }
                                       }
                                   }
                               ]
                            }
                        >
                            <Checkbox>我已阅读并同意【登录条款】和【隐私协议】</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block loading={this.state.loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default withRouter(Index)