<script setup>
import {defineProps, ref, watchEffect} from "vue"
import {useNowTypeStore} from "@/store/store";
defineProps({
  types:Array
})
const nowType = ref(0)

const nowTypeStore = useNowTypeStore()
watchEffect(() => {
  nowTypeStore.setNowType(nowType.value)
})
</script>

<template>
  <el-button v-for="(type, index) in types" :key="index"
             :type="nowType === index ? 'primary' : ''"
             :color="nowType === index ? '#333333' : ''"
             @click="nowType = index"
             style="min-width: 70px"
             v-html="type" round v-btn/>
</template>

<style scoped>
:global(.el-button) {
  --el-button-hover-text-color:none;
  --el-button-hover-bg-color:none;
  --el-button-hover-border-color:none;
}
</style>