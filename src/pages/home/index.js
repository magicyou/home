import React, { Component } from 'react';
import IconFont from '../../components/IconFont';
import Style from './home.module.css';
import { Input, Row, Col, Button } from 'antd';
import {
    PlusOutlined,
} from '@ant-design/icons';

import LoginDrawer from './loginDrawer';
import ManageDrawer from './manageDrawer';
import NewEntryDrawer from './newEntryDrawer';

import { getEntryListApi } from '../../api/entry/index'
import { checkTokenApi } from '../../api/login/index'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleLoginDrawer: false,
            visibleManageDrawer: false,
            visibleNewEntryDrawer: false,
            links: [],
        };
        this.checkToken = this.checkToken.bind(this);
    }
    
    onSearch(keyword) {
        if (keyword) {
            window.open(`https://www.baidu.com/s?wd=${keyword}`)
        }
    }

    linkTo(url) {
        window.open(url)
    }

    /**
     * 打开管理面板
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    onOpenManagePanel() {
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

    /**
     * 打开添加面板
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
     openAddPanel() {
        this.setState({
            visibleNewEntryDrawer: true,
        });
    }

    /**
     * 关闭所有面板
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    onClose() {
        this.setState({
            visibleLoginDrawer: false,
            visibleManageDrawer: false,
            visibleNewEntryDrawer: false,
        });
    }

    /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    getEntryList() {
        return getEntryListApi().then((data) => {
            this.setState({
                links: data || []
            });
        }).finally(() => {

        });
    }

    /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    checkToken() {
        return checkTokenApi().then((data) => {
            this.onOpenManagePanel();
        },() => {
            localStorage.removeItem('token');
            this.onOpenManagePanel();
        }).finally(() => {

        });
    }

    componentDidMount() {
        this.getEntryList();
    }

    render () {
        const { visibleLoginDrawer, visibleManageDrawer, visibleNewEntryDrawer, links } = this.state;

        return (
            <main className={Style.home}>
                <Button className={Style.btnAdd} shape="circle" icon={<PlusOutlined />} size={16} 
                    onClick={() => {
                        this.checkToken()
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
                <ManageDrawer visible={visibleManageDrawer} onClose={()=>this.onClose()}  openAddPanel={()=>this.openAddPanel()}/>
                <NewEntryDrawer visible={visibleNewEntryDrawer} onClose={()=>this.onClose()}/>
            </main>
        );
    }
}

export default Home;
