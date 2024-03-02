<script setup>
import {useRouter} from "vue-router";
import urlConfig from "@/config/url-config.json"
import {scrollToTop} from "@/utils/affixUtils";
import {useNowTypeStore} from "@/store/store";
import {computed} from "vue";

const route = useRouter()
const beiAn = () => {
  window.location.href = urlConfig.aboutBA.beiAn
}
const ICP = () => {
  window.location.href = urlConfig.aboutBA.ICP
}
const readMore = () => {
  route.push('/type').then(() => {
    scrollToTop()
  })
}
const home = () => {
  route.push('/').then(() => {
    scrollToTop()
  })
}

// 当type不为0，即不为timeline时，允许查看其他类型的所有文章列表
const nowTypeStore = useNowTypeStore()
const nowType = computed(() => nowTypeStore.nowType)

</script>

<template>
  <el-row style="font-size: 0.5rem;" v-if="nowType !== 0 && route.currentRoute.value.name === 'home'">
    <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <el-link @click="readMore">查看更多</el-link>
    </el-col>
    <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
  </el-row>
  <el-divider/>
  <el-row style="font-size: 0.9rem;">
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <span style="user-select: none;cursor: pointer" @click="home">© OrganWalk. All rights reserved.</span>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
      <span class="link" @click="beiAn" >粤公网安备 44133002100240号</span>
    </el-col>
    <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
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