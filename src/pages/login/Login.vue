<template>
  <div class="header">这是一个登录页面</div>
  <div>
    用户名：{{ mainStore.name }}
    <br />
    长度：{{ mainStore.nameLength }}
  </div>
  <button @click="updateName">修改名字</button>
  <viod class="viod">1111</viod>
</template>
<script setup lang="ts">
import { useMainStore } from "@/store/main";

const mainStore = useMainStore();
const updateName = () => {
  // mainStore.$patch({
  //   name: "名称变成这个，长度应该增加了",
  // });
  mainStore.insertPost("我是一只鱼");
};
</script>

<style lang="scss">
.viod {
  justify-content: center;
  display: flex;
  align-items: center;
  width: 100px;
  height: 100px;
  background: red;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 5px;
    width: 100%;
    background: orange;
  }
}
.header {
  @apply text-red-300 py-12 rounded-sm bg-dark-100 border;
}
</style>
