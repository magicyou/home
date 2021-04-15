import React, { Component } from 'react';
import IconFont from '../../components/IconFont';
import Style from './home.module.css';
import { Input, Row, Col, Button, Drawer, Form } from 'antd';
import {
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleLoginDrawer: false
        };
    }

    onSearch(keyword) {
        if (keyword) {
            window.open(`https://www.baidu.com/s?wd=${keyword}`)
        }
    }

    linkTo(url) {
        window.open(url)
    }

    onClose() {
        this.setState({
            visibleLoginDrawer: false
        });
    }

    loginDrawer () {
        const { visibleLoginDrawer } = this.state;
        const onFinish = (values) => {
            console.log('Success:', values);
        };
    
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <Drawer
                title="Login"
                placement="right"
                closable={true}
                onClose={this.onClose.bind(this)}
                visible={visibleLoginDrawer}
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
                        <Input placeholder="default size" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item
                        label=""
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<UserOutlined />} />
                    </Form.Item>
                </Form>

                <Button type="primary" block>Login</Button>

            </Drawer>
        )
    }

    render () {
        const links = [
            {'name': 'Blog', icon:'iconbiji', linkUrl: 'https://blog.magicyou.cn/'},
            {'name': 'Cloud', icon:'iconwenjianjia', linkUrl: ''},
            {'name': 'Frp', icon:'icondiannao', linkUrl: ''},
            {'name': 'Pi', icon:'iconcaomeigan', linkUrl: 'http://pi.magicyou.cn/'},
        ];

        return (
            <main className={Style.home}>
                <Button className={Style.btnAdd} shape="circle" icon={<PlusOutlined />} size={16} 
                    onClick={() => {
                        this.setState({
                            visibleLoginDrawer: true
                        });
                    }}
                />
                <div className={Style.content}>
                    <h1>ENTRY</h1>
                    <Input.Search 
                        placeholder="input search text" 
                        addonBefore="Baidu" 
                        onSearch={(e) => this.onSearch(e)}
                    />
                    <Row gutter={16} className={Style.contentLinks}>
                        {links.map((item, index) =>  (
                                <Col className="gutter-row" span={6} key={index}>
                                    <Button 
                                        type="link" 
                                        onClick={() => this.linkTo(item.linkUrl)}
                                    >
                                        <IconFont type={item.icon} />
                                        <p className="height-100">{ item.name }</p>
                                    </Button>
                                </Col>
                            ))}
                    </Row>
                </div>

                {this.loginDrawer()}
            </main>
        );
    }
}

export default Home;
