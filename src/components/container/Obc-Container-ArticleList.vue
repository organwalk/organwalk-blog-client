<template>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
    <el-col :xs="22" :sm="22" :md="22" :lg="16" :xl="16" :align="align">
      <slot/>
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
  </el-row>
</template>

<script setup>
import {defineProps} from "vue";
defineProps({
  align:String
})
</script>