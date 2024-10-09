<template>
  <button><slot>默认内容</slot></button>
</template>

<script lang="ts" setup>
import "./style/index.less";
defineOptions({ name: "test-button" });
withDefaults(defineProps<{
  type: string,
  disabled: boolean
}>(), {
        type: '',
        disabled: false,
    });
</script>
