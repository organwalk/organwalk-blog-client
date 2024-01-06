<script setup>
import {useRouter} from "vue-router";

const route = useRouter()
const beiAn = () => {
  window.location.href = 'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44133002100240'
}
const ICP = () => {
  window.location.href = 'https://beian.miit.gov.cn/'
}
const home = () => {
  route.push('/')
}
</script>

<template>
  <el-divider/>
  <el-row style="font-size: 0.9rem;">
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" align="left">
      <span style="user-select: none;cursor: pointer" @click="home">© OrganWalk. All rights reserved.</span>
    </el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" align="center">
      <span class="link" @click="beiAn" >粤公网安备 44133002100240号</span>
    </el-col>
    <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" align="right">
      <span class="link" @click="ICP" >粤ICP备2023035858号</span>
    </el-col>
  </el-row><br/>
</template>

<style scoped>
.link:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>