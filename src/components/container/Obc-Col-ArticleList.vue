<script setup>
import {onMounted, ref} from "vue";

const height = ref('220px')
const handleMediaQueryChange = () => {
  if (window.matchMedia('(max-width: 768px)').matches){
    height.value = '180px'
  }else {
    height.value = '220px'
  }
}

onMounted(() => {
  handleMediaQueryChange()
})
</script>

<template>
  <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" :style="{height:height}">
    <slot/>
  </el-col>
</template>

<style scoped>

</style>