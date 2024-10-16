<template>
  <button><slot>默认内容</slot></button>
  <el-button type="danger" round>Danger</el-button>
</template>

<script lang="ts" setup>
import "./style/index.less";
import { ElButton } from 'element-plus';
defineOptions({ name: "test-button" });
withDefaults(defineProps<{
  type: string,
  disabled: boolean
}>(), {
        type: '',
        disabled: false,
    });
</script>
