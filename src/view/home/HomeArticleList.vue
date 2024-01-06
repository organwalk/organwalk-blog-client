<script setup>
import ObcArticleList from "@/components/article/Obc-ArticleList.vue";
import ObcHeadArticleList from "@/components/article/Obc-Head-ArticleList.vue";
import ObcCheckBoxArticleList from "@/components/article/Obc-CheckBox-ArticleList.vue";
import HomeInformation from "@/view/home/HomeInformation.vue";

const dataList = [
  {
    "id": 1,
    "name": "使用 Devbox 升级您的开发环境,使开发环境具有隔离特征",
    "outline": "创建隔离开发环境的简易指南",
    "tags": ["devbox", "software", "development-environments", "nix"]
  },
  {
    "id": 2,
    "name": "禁用 JavaScript 源映射",
    "outline": "调试代码时应禁用 JS 源映射的原因",
    "tags": ["debugging", "javascript"]
  },
  {
    "id": 3,
    "name": "文字适应，随处可用",
    "outline": "如何在浏览器或服务器上使文本填充容器",
    "tags": ["typography", "satori", "javascript", "next.js"]
  },
  {
    "id": 4,
    "name": "文字适应，随处可用",
    "outline": "如何在浏览器或服务器上使文本填充容器",
    "tags": ["typography", "satori", "javascript", "next.js"]
  }
]

</script>

<template>
  <div>
    <ObcHeadArticleList content="Timeline"/>
    <el-row :gutter="30">
      <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1"
              v-for="(data, index) in dataList" :key="index"
              style="height: 220px">
        <ObcArticleList :data="data"/>
      </el-col>
    </el-row>
  </div>
  <div>
    <ObcHeadArticleList content="All Blog"/>
    <div style="margin: 0 0 15px 0">
      <ObcCheckBoxArticleList :types="['Random', 'Tech', 'Utopia', 'Walk']"/>
    </div>
    <el-row :gutter="30">
      <el-col :xs="8" :sm="6" :md="4" :lg="8" :xl="1"
              v-for="(data, index) in dataList" :key="index"
              style="height: 220px">
        <ObcArticleList :data="data"/>
      </el-col>
    </el-row>
  </div>
  <HomeInformation/>
</template>

<style scoped>

</style>