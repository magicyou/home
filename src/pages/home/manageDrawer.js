import React, { Component } from 'react';
import { Button, Drawer, List, Avatar, Skeleton, Switch, Popconfirm } from 'antd';
import {
    DeleteOutlined
} from '@ant-design/icons';
import Style from './manageDrawer.module.css';
import IconFont from '../../components/IconFont';
import { getEntryListApi, deleteEntryByIdApi, switchEntryDisplayByidApi } from '../../api/entry/index'

class manageDrawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            initLoading: false,
            links: []
        };
        this.onClose = this.onClose.bind(this);
        this.afterVisibleChange = this.afterVisibleChange.bind(this);
        this.getEntryList = this.getEntryList.bind(this);
        this.onSwitch = this.onSwitch.bind(this);
        this.onDeleteEntry = this.onDeleteEntry.bind(this);
        this.openAddPanel = this.openAddPanel.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    openAddPanel() {
        this.props.openAddPanel();
    }

    /**
     * 切换入口的显示隐藏
     * @author Bruce Lee
     * @date 2021-04-21
     * @param {any} entryItem  当前入口数据
     * @param {any} index  当前入口数据的索引
     * @returns {any}
     */
    onSwitch(entryItem, index) {
        const { links } = this.state;
        let params = {
            id: entryItem.id
        }
        links[index].loading = true;
        this.setState({
            links: links
        });
        return switchEntryDisplayByidApi(params).then((data) => {
            if (data) {
                this.getEntryList();
            }
        }).finally(() => {
            links[index].loading = false;
            this.setState({
                links: links
            });
        });
    }

    /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-12
     * @returns {any}
     */
     onDeleteEntry(entryItem) {
        let params = {
            id: entryItem.id
        }
        return deleteEntryByIdApi(params).then((data) => {
            if (data) {
                this.getEntryList();
            }
        }).finally(() => {

        });
    }

    /**
     * 获取所有入口
     * @author Bruce Lee
     * @date 2021-04-21
     * @returns {any}
     */
    getEntryList() {
        this.setState({
            initLoading: true
        });
        return getEntryListApi().then((data) => {
            this.setState({
                links: (data || []).map(item => {
                    return {
                        ...item,
                        loading: false
                    }
                }),
                initLoading: false
            });
        }).finally(() => {

        });
    }

    afterVisibleChange(visible) {
        if (visible) {
            this.getEntryList();
        }
    }


    render () {
        const { visible } = this.props;
        const { links, initLoading } = this.state;

        const btnSwitch = (item, index) => {
            return (
                <div 
                    className={Style.boxSwitch}
                    onClick={() => {this.onSwitch(item, index)}}
                >
                    <Switch 
                        checkedChildren="1" 
                        unCheckedChildren="0" 
                        checked={Boolean(item.display)} 
                    />
                </div>
            )
        }

        const btnPopconfirm = (item) => {
            return (
                <Popconfirm 
                    title="Are you sure delete this entry?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={()=> {this.onDeleteEntry(item)}}
                    // @cancel="cancel"
                >
                    <Button size="small" shape="circle" icon={<DeleteOutlined />}></Button>
                </Popconfirm>
            )
        }
        

        return (
            <Drawer
                title="Manage"
                placement="right"
                closable={true}
                afterVisibleChange={this.afterVisibleChange}
                onClose={this.onClose}
                visible={visible}
                width={400}
            >
                <Button type="primary" block onClick={()=> {this.openAddPanel()}}>Add New Entry</Button>

                <List
                    loading={initLoading}
                    itemLayout="horizontal"
                    dataSource={links}
                    renderItem={(item, index) => (
                    <List.Item
                        actions={[btnSwitch(item, index), btnPopconfirm(item)]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={
                            <IconFont type={item.icon} />
                            }
                            title={<a href="https://ant.design">{item.name}</a>}
                            description={item.linkUrl || '-'}
                        />
                        </Skeleton>
                    </List.Item>
                    )}
                />

            </Drawer>
        )
    }
}

export default manageDrawer;
