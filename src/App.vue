<template>
     <div class="wrapper-main">
           <a-row 
                :gutter="[16,16]"
                type="flex" 
                justify="center"
            >
                <a-col 
                    :xs="{ span: 24 }" 
                    :sm="{ span: 12 }" 
                    :md="{ span: 12}" 
                    :lg="{ span: 8 }"
                    :xl="{ span: 8}"
                    :xxl="{ span: 6}"
                    v-for="(item, index) in list"
                    :key="index"
                >
                    <div class="card">
                        <div class="box-avatar">
                            <!-- <icon-font :type="item.icon" /> -->
                            <span class="iconfont"
                                :class="item.icon"
                            ></span>
                        </div>
                        <p class="txt-title">{{ item.name }}</p>
                        <div class="btn-enter">
                            <a-button type="link" size="large"
                                @click="skipPage(item.href)"
                            >
                                <template #icon><ArrowRightOutlined /></template>
                            </a-button>
                        </div>
                    </div>
                </a-col>
            </a-row>
     </div>
</template>

<script>
import { Button, Row, Col } from 'ant-design-vue'; 
import { ArrowRightOutlined } from '@ant-design/icons-vue';
// import IconFont from './components/Iconfont';

export default {
    name: 'App',
    components: {
        AButton: Button,
        ARow: Row,
        ACol: Col,
        ArrowRightOutlined,
        // IconFont
    },
    data() {
        return {
            list:[
                {name: 'Blog', icon:'iconbokeyuan', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', href:'https://blog.magicyou.cn/'},
                {name: 'Management', icon:'iconguanli', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', href:'http://188.131.137.32:9080/F86D9B#/user/login'},
                {name: 'DataV', icon:'iconfenxi', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', href:'http://vdata.magicyou.cn/'},
                {name: '车车', icon:'iconchexing', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', href:'http://vehicle.magicyou.cn/'},
            ]
        }
    },
    methods: {
        skipPage(url) {
            window.open(url)
        }
    }
}
</script>

<style lang="scss">
@import './assets/reset.css';
#app{
    height: 100%;
}
.wrapper-main{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('./assets/bg.jpg');
    // background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: bottom;
}
.ant-row{
    flex: 1;
    width: 100%;
}

.card{
    display: flex;
    border: none;
    background: #fff;
    box-sizing: border-box;
    transition: all .3s ease;

    .box-avatar{
        padding: 16px;
        .iconfont{
             font-size: 80px;
        }
    }

    .txt-title{
        flex: 1;
        font-size: 28px;
        padding: 0 16px;
        vertical-align: middle;
        margin:0;
        display: flex;
        align-items: center;
    }

    .btn-enter{
        width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;

        .ant-btn-link{
            // font-size: 32px;
        }
    }

    &:hover{
        background: rgba(218,165,32,.7);

         .box-avatar{
            color: #fff;
        }

        .txt-title{
            color: #fff;
        }

        .btn-enter{
            background: goldenrod;
            .ant-btn-link{
                color: #fff;
            }
        }
    }
}
</style>
