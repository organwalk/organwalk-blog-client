<script setup>
import {ref} from "vue";
import {scrollToTop} from "@/utils/affixUtils";
import {useRouter} from "vue-router";
import {defineAsyncComponent} from "vue";
const ObcArticleList = defineAsyncComponent(() => import("@/components/article/Obc-ArticleList.vue"))
const ObcColArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Col-ArticleList.vue"))

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

// 进入Tag分类专区
const route = useRouter()
const clickTag = (tagName) => {
  route.push({path:'/tag/' +tagName, query:{load: Date.now()}}).then(() => {
    scrollToTop()
  })
}

const tags = ref(
    [{
      "name": "devbox",
      "sum": 4
    },
    {
      "name": "software",
      "sum": 6
    },
    {
      "name": "development-environments",
      "sum": 10
    },
    {
      "name": "nix",
      "sum": 20
    }]
)

const readMore = () => {

}
</script>

<template>
  <el-row :gutter="30">
    <ObcColArticleList v-for="(data, index) in dataList" :key="index">
      <ObcArticleList :data="data" @clickTag="clickTag"/>
    </ObcColArticleList>
  </el-row>
  <div>
    <el-row style="font-size: 0.5rem;" >
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
      <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8" align="center">
        <el-link @click="readMore">查看更多</el-link>
      </el-col>
      <el-col :xs="0" :sm="0" :md="8" :lg="8" :xl="8" />
    </el-row><br/>
  </div>

  <el-divider content-position="left">类别标签集群</el-divider>
  <el-tag v-for="(tag, tagIndex) in tags" :key="tagIndex"
          class="tags" type="info" @click="clickTag(tag.name)">{{ tag.name }} &nbsp;&nbsp;&nbsp; {{ tag.sum }}</el-tag>

</template>

<style scoped>
.tags {
  margin: 5px 20px 10px 0;
  border: none;
  color: #333;
  background-color: #f3f4f6;
}
.tags:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>