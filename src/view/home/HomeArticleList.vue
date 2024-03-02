<script setup>
import {useKeywordStore, useNowTypeStore} from "@/store/store";
import {computed, onBeforeMount, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {scrollToTop} from "@/utils/affixUtils";
import {defineAsyncComponent} from "vue";
import {getHomeData} from "@/api/api";
import {withLoading} from "@/utils/aopUtils";
import ObcSkeleton from "@/components/container/Obc-Skeleton.vue";
const ObcArticleList = defineAsyncComponent(() => import("@/components/article/Obc-ArticleList.vue"))
const ObcHeadArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Head-ArticleList.vue"))
const ObcCheckBoxArticleList = defineAsyncComponent(() => import("@/components/check-box/Obc-CheckBox-ArticleList.vue"))
const ObcColArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Col-ArticleList.vue"))

const loading = ref(true)
const dataList = ref([])
const loadingDataList = withLoading(loading, async (typeId) => {
  console.log(loading.value)
  setTimeout(async () => {
    const res = await getHomeData(typeId)
    if (res['code'] === 2002){
      dataList.value = res.data
    }else {
      dataList.value = []
    }
  }, 3000)
})


// 呈现搜索列表
// 从状态管理中获取搜索关键词
const keywordStore = useKeywordStore()
const keyword = computed(() => keywordStore.keyword)
const isSearch = ref(false)
watch(keyword, (newVal, oldValue) => {
  if (newVal !== oldValue){
    isSearch.value = newVal !== "";
  }
})

// 进入Tag分类专区
const route = useRouter()
const clickTag = (tagName) => {
  route.push({path:'/tag/' +tagName, query:{load: Date.now()}}).then(() => {
    scrollToTop()
  })
}

const nowTypeStore = useNowTypeStore()
const nowType = computed(() => nowTypeStore.nowType)
watchEffect(async () => {
  if (nowType.value){
    await loadingDataList(nowType.value)
  }
})

onBeforeMount(async () => {
  await loadingDataList(0)
})
</script>

<template>
  <obc-skeleton :loading="loading"/>
  <div class="home-list" v-if="!isSearch">
    <div class="all-blog-list">
      <ObcHeadArticleList content="All Blog"/>
      <div style="margin: 0 0 15px 0">
        <ObcCheckBoxArticleList :types="['TimeLine', 'Tech', 'Utopia', 'Walk']"/>
      </div>

      <el-row :gutter="30" v-if="!loading">
        <ObcColArticleList v-for="(data, index) in dataList" :key="index">
          <ObcArticleList :data="data" @clickTag="clickTag"/>
        </ObcColArticleList>
      </el-row>
    </div>
  </div>
  <div class="search-result-list" v-if="isSearch">
    <ObcHeadArticleList :content="keyword"/>
    <obc-skeleton :loading="loading"/>
    <el-row :gutter="30" v-if="!loading">
      <ObcColArticleList v-for="(data, index) in dataList" :key="index">
        <ObcArticleList :data="data" @clickTag="clickTag"/>
      </ObcColArticleList>
    </el-row>
  </div>

</template>

<style scoped>

</style>