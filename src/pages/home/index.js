import React, { Component } from 'react';
import IconFont from '../../components/IconFont';
import Style from './home.module.css';
import { Input, Row, Col, Button } from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons';

import LoginDrawer from './loginDrawer';
import ManageDrawer from './manageDrawer';

import { getEntryListApi, deleteEntryByIdApi, switchEntryDisplayByidApi } from '../../api/entry/index'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleLoginDrawer: false,
            visibleManageDrawer: false,
            links: [],
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

    onOpenAddPanel() {
        const token = localStorage.getItem('token');
        if (token) {
            this.setState({
                visibleManageDrawer: true,
            });
        } else {
            this.setState({
                visibleLoginDrawer: true,
            });
        }
    }

    onClose() {
        this.setState({
            visibleLoginDrawer: false,
            visibleManageDrawer: false,
        });
    }

    /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    getEntryList() {
        this.loginLoading = true;
        return getEntryListApi().then((data) => {
            this.setState({
                links: data || []
            });
        }).finally(() => {
            this.loginLoading = false;
        });
    }

    componentDidMount() {
        this.getEntryList();
    }

    render () {
        const { visibleLoginDrawer, visibleManageDrawer, links } = this.state;

        return (
            <main className={Style.home}>
                <Button className={Style.btnAdd} shape="circle" icon={<PlusOutlined />} size={16} 
                    onClick={() => {
                        this.onOpenAddPanel()
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

                <LoginDrawer visible={visibleLoginDrawer} onClose={()=>this.onClose()}/>
                <ManageDrawer visible={visibleManageDrawer} onClose={()=>this.onClose()}/>
            </main>
        );
    }
}

export default Home;
