<template>
<div class="home">
    <a-button shape="circle" class="btn-add" @click="onOpenAddPanel">
        <template #icon>
            <PlusOutlined /></template>
    </a-button>
    <div class="content">
        <h1>ENTRY</h1>
        <a-input-search v-model:value="value" placeholder="input search text" addon-before="Baidu" @search="onSearch" />
        <a-row type="flex" justify="space-between" align="bottom" class="content-links">
            <a-col :span="4" v-for="(item, index) in links" :key="index">
                <a-button type="link" @click="linkTo(item.linkUrl)">
                    <icon-font :type="item.icon" />
                    <p class="height-100">{{ item.name }}</p>
                </a-button>
            </a-col>
        </a-row>
    </div>


    <!-- 登录面板 -->
    <a-drawer title="Login" placement="right" :closable="false" :width="400" v-model:visible="visibleLoginDrawer">
        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
            <a-form-item required has-feedback label="" name="username">
                <a-input v-model:value="formState.username" type="text" autocomplete="off">
                    <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                </a-input>
            </a-form-item>
            <a-form-item required has-feedback label="" name="password">
                <a-input v-model:value="formState.password" type="password" autocomplete="off">
                    <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template>
                </a-input>
            </a-form-item>
        </a-form>
        <a-button type="primary" block :loading="loginLoading" @click="onSubmitToLogin">Login</a-button>
    </a-drawer>


    <!-- 添加新入口 -->
    <a-drawer title="Add New Entry" placement="right" :closable="false" :width="400" v-model:visible="visibleNewEntryDrawer">
        <a-form ref="formRef" :model="formState" :rules="rules" layout="vertical">
            <a-form-item required has-feedback label="Name" name="username">
                <a-input v-model:value="formState.username" type="text" autocomplete="off">
                 
                </a-input>
            </a-form-item>
            <a-form-item required has-feedback label="Url" name="password">
                <a-input v-model:value="formState.password" type="text" autocomplete="off">
                    
                </a-input>
            </a-form-item>
            <a-form-item required has-feedback label="Icon" name="password">
                <a-select
                    v-model:value="value1"
                    @focus="focus"
                    ref="select"
                    @change="handleChange"
                >
                    <a-select-option 
                        :value="item.font_class" 
                        :label="item.name"
                        v-for="(item, index) in iconfontList"
                        :key="index"
                    >
                        <icon-font type="iconzuoji" /> 
                        <icon-font :type:sync="item.font_class" /> 
                        {{ item.name }}-{{ item.font_class }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </a-form>
        <a-button type="primary" block :loading="loginLoading" @click="onSubmitToLogin">Login</a-button>
    </a-drawer>

    <!-- 管理面板 -->
    <a-drawer title="Manage" placement="right" :closable="false" :width="400" v-model:visible="visibleManageDrawer">
        <a-button type="primary" block :loading="loginLoading" @click="onSubmitToLogin">Add New Entry</a-button>
        <a-list item-layout="horizontal" :data-source="links">
            <template #renderItem="{ item, index }">
            <a-list-item>
                <a-list-item-meta
                :description="item.linkUrl || '-'"
                >
                <template #title>
                    <a href="https://www.antdv.com/">{{ item.name }}</a>
                </template>
                <template #avatar>
                    <icon-font :type="item.icon" />
                </template>
                </a-list-item-meta>
                <template #actions>
                    
                    <div class="box-switch"
                        @click="onSwitch(item, index)"
                    >
                        <a-switch 
                            checked-children="1" 
                            un-checked-children="0" 
                            v-model:checked="item.display" 
                            :loading="item.loading"
                        />
                    </div>

                    <a-popconfirm
                        title="Are you sure delete this entry?"
                        ok-text="Yes"
                        cancel-text="No"
                        @confirm="onDeleteEntry(item)"
                        @cancel="cancel"
                    >
                        <a-button size="small" shape="circle">
                            <template #icon><DeleteOutlined /></template>
                        </a-button>
                    </a-popconfirm>
                </template>
            </a-list-item>
            </template>
        </a-list>
        
    </a-drawer>
</div>
</template>

<script>
import {
    Row,
    Col,
    Input,
    Button,
    Drawer,
    Form,
    Message,
    List,
    Switch,
    Popconfirm,
    Select
} from 'ant-design-vue'

import {
    PlusOutlined,
    UserOutlined,
    LockOutlined,
    DeleteOutlined,
} from '@ant-design/icons-vue';

import { loginApi } from '@/api/login/index'
import iconfontList from '@/data/iconfont.json'
import { getEntryListApi, deleteEntryByIdApi, switchEntryDisplayByidApi } from '@/api/entry/index'



export default {
    name: 'Home',
    components: {
        ARow: Row,
        ACol: Col,
        AButton: Button,
        ADrawer: Drawer,
        AInput: Input,
        AInputSearch: Input.Search,
        ASwitch: Switch,
        AForm: Form,
        AFormItem: Form.Item,
        AList: List,
        AListItem: List.Item,
        AListItemMeta: List.Item.Meta,
        ASelect: Select,
        ASelectOption: Select.Option,
        APopconfirm: Popconfirm,
        PlusOutlined,
        UserOutlined,
        LockOutlined,
        DeleteOutlined,
    },
    data() {
        const rules = {
            password: [{
                required: true,
                message: 'Please input password',
                trigger: 'blur'
            }],
            username: [{
                required: true,
                message: 'Please input username',
                trigger: 'blur'
            }],
        };
        return {
            value: '',
            size: 'small',
            links: [{
                    name: 'Blog',
                    icon: 'iconbiji',
                    linkUrl: 'https://blog.magicyou.cn/',
                },
                {
                    name: 'Cloud',
                    icon: 'iconwenjianjia',
                    linkUrl: ''
                },
                {
                    name: 'Frp',
                    icon: 'icondiannao',
                    linkUrl: ''
                },
                {
                    name: 'Pi',
                    icon: 'iconcaomeigan',
                    linkUrl: 'http://pi.magicyou.cn/',
                },
            ],
            visibleLoginDrawer: false,
            visibleManageDrawer: false,
            visibleNewEntryDrawer: true,
            rules,
            formState: {
                username: null,
                password: null,
            },
            loginLoading: false,
            iconfontList: iconfontList.glyphs,
        }
    },
    mounted() {
        this.getEntryList();
    },
    methods: {
        onSearch(keyword) {
            if (keyword) {
                window.open(`https://www.baidu.com/s?wd=${keyword}`)
            }
        },
        linkTo(url) {
            window.open(url)
        },
        onOpenAddPanel() {
            const token = localStorage.getItem('token');
            if (token) {
                this.visibleManageDrawer = true;
            } else {
                this.visibleLoginDrawer = true;
            }
        },
        /**
         * 获取所有入口
         * @author Bruce Lee
         * @date 2021-04-12
         * @returns {any}
         */
        getEntryList() {
            this.loginLoading = true;
            return getEntryListApi().then((data) => {
                this.links = data.map(item => {
                    return {
                        ...item,
                        loading: false
                    }
                });
            }).finally(() => {
                this.loginLoading = false;
            });
        },
        /**
         * 点击登录按钮
         * @author Bruce Lee
         * @date 2021-04-12
         * @returns {any}
         */
        onSubmitToLogin() {
            const formRef = this.$refs.formRef;
            formRef.validate()
            .then(() => {
                this.doLogin();
            })
            .catch((error) => {
                console.log('error', error);
                Message.warning('This is a warning message');
            });
        },
        doLogin() {
            let params = {
                ...this.formState
            };
            this.loginLoading = true;
            return loginApi(params).then((data) => {
                localStorage.setItem('token', data.token);
            }).finally(() => {
                this.loginLoading = false;
            });
        },
        onSwitch(entryItem, index) {
            console.log('index:', index);
            console.log(' entryItem.display:',  entryItem.display);

            let params = {
                id: entryItem.id
            }
            this.links[index].loading = true;
            return switchEntryDisplayByidApi(params).then((data) => {
                if (data) {
                    this.getEntryList();
                }
            }).finally(() => {
                this.links[index].loading = false;
            });
        },
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
            this.loginLoading = true;
            return deleteEntryByIdApi(params).then((data) => {
                if (data) {
                    this.getEntryList();
                }
            }).finally(() => {
                this.loginLoading = false;
            });
        },
    },
}
</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.content {
    width: 660px;

    &-links {
        margin-top: 16px;
    }
}

.btn-add {
    position: fixed;
    right: 20px;
    top: 20px;
}

.box-switch{
    position: relative;

    &:after{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }
}
</style>
