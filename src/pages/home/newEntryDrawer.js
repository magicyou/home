import React, { Component } from 'react';
import { Input, Button, Drawer, Form, Select } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import { loginApi } from '../../api/login/index'
import { getIconListApi } from '../../api/entry/index'

class newEntryDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            icon: '',
            link_url: '',
            iconList: [],
        };
        this.onClose = this.onClose.bind(this);
        this.inputUserName = this.inputUserName.bind(this);
        this.inputPassword = this.inputPassword.bind(this);
        this.doAddNewEntry = this.doAddNewEntry.bind(this);
        this.afterVisibleChange = this.afterVisibleChange.bind(this);
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
    doAddNewEntry() {
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

     /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
      getIconList() {
        return getIconListApi().then((data) => {
            this.setState({
                iconList: data.glyphs || []
            });
        }).finally(() => {

        });
    }

    afterVisibleChange(visible) {
        if (visible) {
            this.getIconList();
        }
    }



    render () {
        const { visible } = this.props;
        const { name, link_url, icon, iconList } = this.state;
        const onFinish = (values) => {
            console.log('Success:', values);
            this.doAddNewEntry();
        };
    
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Drawer
                title="Add New Entry"
                placement="right"
                closable={true}
                onClose={this.onClose}
                visible={visible}
                width={400}
                afterVisibleChange={this.afterVisibleChange}
            >

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label=""
                        name="name"
                        rules={[{ required: true, message: 'Please fill in the name!' }]}
                    >
                        <Input 
                            placeholder="Name" 
                            value={name}
                            onChange={(e)=>this.inputUserName(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="link_url"
                        rules={[{ required: true, message: 'Please fill in the description' }]}
                    >
                        <Input 
                            placeholder="Link url" 
                            value={link_url}
                            onChange={(e)=>this.inputPassword(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="icon"
                        rules={[{ required: true, message: 'Please select the icon!' }]}
                    >
                        <Select  placeholder="Link url"  value={icon} allowClear>
                            {
                                iconList.map(item => {
                                    return ( <Select.Option value={item.font_class}>{ item.font_class }</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>

                <Button type="primary" block onClick={()=> {this.doAdd()}}>Login</Button>

            </Drawer>
        )
    }
}

export default newEntryDrawer;
