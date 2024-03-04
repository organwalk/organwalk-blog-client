<script setup>
import {useRouter} from "vue-router";
import urlConfig from "@/config/url-config.json"
import {scrollToTop} from "@/utils/affixUtils";

const route = useRouter()
const beiAn = () => {
  window.location.href = urlConfig.aboutBA.beiAn
}
const ICP = () => {
  window.location.href = urlConfig.aboutBA.ICP
}

const home = () => {
  route.push('/').then(() => {
    scrollToTop()
  })
}
</script>

<template>

  <el-divider/>
  <el-row style="font-size: 0.9rem;color: #606266">
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <span style="user-select: none;cursor: pointer" @click="home">© OrganWalk. All rights reserved.</span><br/>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <span class="link" @click="beiAn" >粤公网安备 44133002100240号</span><br/>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <span class="link" @click="ICP" >粤ICP备2023035858号</span><br/>
    </el-col>
  </el-row><br/>
</template>

<style scoped>
.link:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>