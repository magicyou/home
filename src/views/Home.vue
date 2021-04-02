<template>
    <div class="home">
        <div class="content">
            <h1>ENTRY</h1>
            <a-input-search
                v-model:value="value"
                placeholder="input search text"
                addon-before="Baidu"
                @search="onSearch"
            />
            <a-row type="flex" justify="space-between" align="bottom" class="content-links">
                <a-col :span="4" v-for="(item, index) in links" :key="index">
                    <a-button type="link" @click="linkTo(item.linkUrl)">
                        <icon-font :type="item.icon"/>
                        <p class="height-100">{{ item.name }}</p>
                    </a-button>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import { Row, Col, Input, Button } from 'ant-design-vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2241745_iwyjzan1ky.js', // 在 iconfont.cn 上生成
});

export default {
  name: 'Home',
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AInputSearch: Input.Search,
    IconFont
  },
  data() {
      return {
          value: '',
          size: 'small',
          links: [
              {'name': 'Blog', icon:'iconbiji', linkUrl: 'https://blog.magicyou.cn/'},
              {'name': 'Cloud', icon:'iconwenjianjia', linkUrl: ''},
              {'name': 'Frp', icon:'icondiannao', linkUrl: ''},
              {'name': 'Pi', icon:'iconcaomeigan', linkUrl: 'http://pi.magicyou.cn/'},
          ]
      }
  },
  methods: {
      onSearch(keyword) {
          if (keyword) {
            window.open(`https://www.baidu.com/s?wd=${keyword}`)
          }
      },
      linkTo(url) {
          window.open(url)
      }
  }
}
</script>

<style lang="less" scoped>
.home{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.content{
    width: 660px;
    // background: pink;

    &-links{
        margin-top: 16px;
    }
}
</style>
