<template>
    
     <a-layout
        class="wrapper-layout"
     >
      <a-layout-content>
          
          <a-row 
        :gutter="[16,16]"
        type="flex" 
        justify="center"
        align="center"
    >
        <a-col 
            :xs="{ span: 12 }" 
            :sm="{ span: 12 }" 
            :md="{ span: 8}" 
            :lg="{ span: 8 }"
            :xl="{ span: 6}"
            :xxl="{ span: 6}"
            v-for="(item, index) in list"
            :key="index"
        >
            <a-card>
                <div>
                    <a-avatar :size="64" :src="item.logoUrl">
                        <template #icon><WindowsOutlined /></template>
                    </a-avatar>
                </div>
                <p>{{ item.name }}</p>
                <p>
                    <a-button type="link">
                        <template #icon><ArrowRightOutlined /></template>
                    </a-button>
                </p>
            </a-card>
        </a-col>
    </a-row>
      </a-layout-content>
    </a-layout>
</template>

<script>
import { Button, Card, Row, Col, Avatar, Layout} from 'ant-design-vue'; 
import { ArrowRightOutlined, WindowsOutlined } from '@ant-design/icons-vue';
export default {
    name: 'App',
    components: {
        AButton: Button,
        ACard: Card,
        ARow: Row,
        ACol: Col,
        AAvatar: Avatar,
        ALayout: Layout,
        ALayoutContent: Layout.Content,
        ArrowRightOutlined,
        WindowsOutlined,
    },
    data() {
        return {
            list:[
                {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
                {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
                {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
                // {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
                // {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
                // {name: 'Aimm', logoUrl:'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'},
            ]
        }
    }
}
</script>

<style>
#app{
    height: 100%;
}
.wrapper-layout{
    height: 100%;
}
</style>
