<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
      <a-button type="primary" loading>Loading</a-button>
  <a-button type="primary" size="small" loading>Loading</a-button>
  <br />
  <a-button type="primary" :loading="loading" @mouseenter="loading = true">mouseenter me!</a-button>
  <a-button type="primary" icon="poweroff" :loading="iconLoading" @click="enterIconLoading">
    延迟1s
  </a-button>
  <br />
  <a-button type="primary" loading />
  <a-button type="primary" shape="circle" loading />
  <a-button type="danger" shape="round" loading />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from 'ant-design-vue';
export default {
  name: 'Home',
  components: {
    HelloWorld,
    AButton: Button,
  }
}
</script>
