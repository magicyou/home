import React, { Component } from 'react';
import { Input, Button, Drawer, Form } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import { loginApi } from '../../api/login/index'

class loginDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.onClose = this.onClose.bind(this);
        this.inputUserName = this.inputUserName.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.doLogin = this.doLogin.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    inputUserName(e) {
        this.setState({
            username: e.target.value
        });
    }

    inputPassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    /**
     * 登录操作
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    doLogin() {
        const { username, password } = this.state;
        let params = {
            username,
            password
        };
        return loginApi(params).then((data) => {
            localStorage.setItem('token', data.token);
            this.onClose();
        }).finally(() => {
            
        });
    }


    render () {
        const { visible } = this.props;
        const { username, password } = this.state;
        const onFinish = (values) => {
            console.log('Success:', values);
            this.doLogin();
        };
    
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Drawer
                title="Login"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={visible}
                width={400}
            >

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label=""
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input 
                            placeholder="default size" 
                            prefix={<UserOutlined />} 
                            value={username}
                            onChange={(e)=>this.inputUserName(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password 
                            prefix={<UserOutlined />} 
                            value={password}
                            onChange={(e)=>this.inputPassword(e)}
                        />
                    </Form.Item>
                </Form>

                <Button type="primary" block onClick={()=> {this.doLogin()}}>Login</Button>

            </Drawer>
        )
    }
}

export default loginDrawer;
