<script setup>
import gmail from "@/assets/icon/gmail.png";
import github from "@/assets/icon/github.png";
import bilibili from "@/assets/icon/bilibili.png";
import zhihu from "@/assets/icon/zhihu.png";
import ObcHeadArticleList from "@/components/article/Obc-Head-ArticleList.vue";

const toGithub = () => {
  window.location.href = 'https://github.com/organwalk'
}

const toBilibili = () => {
  window.location.href = 'https://space.bilibili.com/38163549'
}

const toZhiHu = () => {
  window.location.href = 'https://www.zhihu.com/people/shitsugo'
}
</script>

<template>
  <div>
    <ObcHeadArticleList content="Information"/>
    <el-card shadow="never" style="border-radius: 15px;background-color: transparent">
      <el-row :gutter="30">
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div class="div-icon">
            <el-tooltip
                effect="dark"
                content="harukisea0@gmail.com"
                placement="top"
                trigger="click"
            >
              <el-image class="icon" :src="gmail" />
            </el-tooltip>
          </div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div class="div-icon"><el-image class="icon" :src="github" @click="toGithub" /></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div class="div-icon"><el-image class="icon" :src="bilibili" @click="toBilibili"/></div>
        </el-col>
        <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6" align="center">
          <div class="div-icon"><el-image class="icon" :src="zhihu" @click="toZhiHu"/></div>
        </el-col>
      </el-row>
    </el-card>
  </div><br/>
</template>

<style scoped>
.div-icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
}
.icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid #D4D7DE;
  cursor: pointer;
}
</style>