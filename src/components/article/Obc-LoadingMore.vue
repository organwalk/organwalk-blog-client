<script setup>
import {defineProps} from "vue"
defineProps({
  content:String
})
</script>

<template>
  <el-row style="font-size: 0.5rem;">
    <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <el-link> {{ content }} </el-link>
    </el-col>
    <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
  </el-row>
</template>

<style scoped>

</style>