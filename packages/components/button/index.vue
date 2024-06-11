<template>
  <button class="my-button">测试按钮</button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "./style/index.less";
export default defineComponent({
  name: "my-button",
  setup() {
    return {};
  },
});
</script>
<style lang="less" scoped>
@import "./style/index.less";
</style>
