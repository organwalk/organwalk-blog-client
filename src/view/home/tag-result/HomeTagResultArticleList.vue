<script setup>
import ObcArticleList from "@/components/article/Obc-ArticleList.vue";
import ObcColArticleList from "@/components/article/Obc-Col-ArticleList.vue";
import {useKeywordStore} from "@/store/store";
import {computed, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {scrollToTop} from "@/utils/affixUtils";

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


// 呈现搜索列表
// 从状态管理种获取搜索关键词
const keywordStore = useKeywordStore()
const keyword = computed(() => keywordStore.keyword)
const isSearch = ref(false)
watch(keyword, (newVal, oldValue) => {
  if (newVal !== oldValue){
    if (newVal === ""){
      isSearch.value = false
    }else {
      isSearch.value = true
      console.log(newVal)
    }
  }
})

// 进入Tag分类专区
const route = useRouter()
const clickTag = (tagName) => {
  route.push({path:'/tag/' +tagName, query:{load: Date.now()}})
  scrollToTop()
}
</script>

<template>
  <div class="tag-result-list" v-show="!isSearch">
    <el-row :gutter="30">
      <ObcColArticleList v-for="(data, index) in dataList" :key="index">
        <ObcArticleList :data="data" @clickTag="clickTag"/>
      </ObcColArticleList>
    </el-row>
  </div>
</template>

<style scoped>

</style>