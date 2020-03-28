import React, { Component } from 'react';
import {Input,Checkbox,Button,Icon, message} from 'antd';
import { Router,Route,hashHistory} from 'react-router';
import './login.css'
import {login} from '../../data/dataStore';
import Form from '../../componts/form/Form.js'
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  
export default class Login extends Component {
    constructor(props){
        super(props)
        this.state={
        }
        this.sendLogin=this.sendLogin.bind(this)
    }
    componentDidMount(){
    }
    // 登录接口
    async sendLogin(value){
        console.log(value)
        let data = await login(value)
        .then(res => {
            return res.json();
        })
        .catch(ex => { });
        if(data.code==0){

            let user={userId:data.data.client.userId,userName:data.data.username,title:data.data.companyName}
            localStorage.setItem('userdata',JSON.stringify(user))

            this.props.history.replace('/main')
        }else{
            message.error(data.data)
        }
    }
    render() {
        const formItemList = [
            {
                label: '用户名', //表单label
                id: 'username', //表单Item的Key值
                component: <Input placeholder={'请输入用户名'}/>, //表单受控组件
                options:{rules: [{ required: true, message: '用户名不能为空!' }]}
            },
            {
                label: '密码', 
                id: 'password',
                component: <Input placeholder={'请输入用户密码'} type="password"/>,
                options:{rules: [{ required: true, message: '密码不能为空!' }]}
            }]
        const {}=this.state;
        return (
            <div className="login">
                <div className='login_from'>
                <h3>
                    欢迎登录
                </h3>
                    <Form formItemList={formItemList} submit={this.sendLogin}/>
                </div>
            </div>
        )
    }
}
