import React, { Component } from 'react';
import { Input, Button, Drawer, Form, Select } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
import { addEntryApi, getIconListApi } from '../../api/entry/index'

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
        this.inputName = this.inputName.bind(this);
        this.inputLinkUrl = this.inputLinkUrl.bind(this);
        this.selectIcon = this.selectIcon.bind(this);
        this.doAddNewEntry = this.doAddNewEntry.bind(this);
        this.afterVisibleChange = this.afterVisibleChange.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    inputName(e) {
        this.setState({
            name: e.target.value
        });
    }

    inputLinkUrl(e) {
        this.setState({
            link_url: e.target.value
        });
    }

    selectIcon(e) {
        this.setState({
            icon: e || ''
        });
    }

    /**
     * 获取所有icon
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

    /**
     * 登录操作
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    doAddNewEntry() {
        const { name, icon, link_url } = this.state;
        let params = {
            name,
            icon: 'icon'+icon, 
            link_url
        };
        return addEntryApi(params).then((data) => {
            localStorage.setItem('token', data.token);
            this.onClose();
        }).finally(() => {
            
        });
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
                            onChange={(e)=>this.inputName(e)}
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
                            onChange={(e)=>this.inputLinkUrl(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="icon"
                        rules={[{ required: true, message: 'Please select the icon!' }]}
                    >
                        <Select  
                            placeholder="Icon"  
                            value={icon} 
                            onChange={(e)=>this.selectIcon(e)}
                            allowClear 
                        >
                            {
                                iconList.map((item, index) => {
                                    return ( <Select.Option value={item.font_class} key={index}>{ item.name }</Select.Option>)
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>

                <Button type="primary" block onClick={()=> {this.doAddNewEntry()}}>Add</Button>

            </Drawer>
        )
    }
}

export default newEntryDrawer;
