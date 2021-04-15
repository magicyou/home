import React, { Component } from 'react';
import IconFont from '../../components/IconFont';
import Style from './home.module.css';
import { Input, Row, Col, Button  } from 'antd';


class Home extends Component {

    onSearch(keyword) {
        if (keyword) {
            window.open(`https://www.baidu.com/s?wd=${keyword}`)
        }
    }

    linkTo(url) {
        window.open(url)
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
            </main>
        );
    }
}

export default Home;
