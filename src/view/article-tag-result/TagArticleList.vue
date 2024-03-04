<script setup>
import {useKeywordStore} from "@/store/store";
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {scrollToTop} from "@/utils/affixUtils";
import {defineAsyncComponent} from "vue";
import {withLoading} from "@/utils/aopUtils";
import {getTagArticleData, searchArticleAboutTag} from "@/api/api";
import ObcLoadingMore from "@/components/article/Obc-LoadingMore.vue";
import ObcEmpty from "@/components/container/Obc-Empty.vue";
const ObcArticleList = defineAsyncComponent(() => import("@/components/article/Obc-ArticleList.vue"))
const ObcColArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Col-ArticleList.vue"))
const ObcSkeleton = defineAsyncComponent(() => import("@/components/container/Obc-Skeleton.vue"))

const dataList = ref([])
const originDataList = ref([])
const loading = ref(false)
const loadingDataList = async (offset) => {
  const res = await getTagArticleData(route.currentRoute.value.params['tagName'], offset)
  if (res['code'] === 2002) {
    total.value = Number(res['total'])
    if (offset !== 0){
      dataList.value.push(...res.data)
    }else {
      dataList.value = res.data
      originDataList.value = res.data
    }
  } else {
    dataList.value = []
  }
}
const showReadMore = computed(() => {
  return !loading.value && dataList.value.length !== total.value && !isSearch.value
})
const readMore = async () => {
  await loadingDataList(dataList.value.length)
}

// 呈现搜索列表
// 从状态管理种获取搜索关键词
const keywordStore = useKeywordStore()
const keyword = computed(() => keywordStore.keyword)
const isSearch = ref(false)
const total = ref(0)
const searchArticle = async (keyword, offset) => {
  if (keyword === ""){
    dataList.value = originDataList.value
  }else {
    const res = await searchArticleAboutTag(keyword, route.currentRoute.value.params.tagName, offset)
    if (res['code'] === 2002){
      total.value = Number(res['total'])
      if (offset !== 0){
        dataList.value.push(...res.data)
      }else {
        dataList.value = res.data
      }
    }else {
      dataList.value = []
    }
  }
}
watch(keyword, (newVal, oldValue) => {
  if (newVal !== oldValue){
    isSearch.value = newVal !== "";
    const wrappedSearchArticle = withLoading(loading, () => searchArticle(newVal, 0));
    wrappedSearchArticle();
  }
})
const showSearchMore = computed(() => {
  return isSearch.value && total.value !== dataList.value.length
})
// 加载更多搜索结果
const loadingSearchMore = async () => {
  let offset = dataList.value.length
  await searchArticle(keyword.value, offset)
}

// 进入Tag分类专区
const route = useRouter()
const clickTag = (tagName) => {
  route.push({path:'/tag/' +tagName, query:{load: Date.now()}}).then(() => {
    window.location.reload()
    scrollToTop()
  })
}

const showEmpty = computed(() => {
  return dataList.value.length === 0 && !loading.value
})

onBeforeMount(() => {
  const loadingData = withLoading(loading, () => loadingDataList(0))
  loadingData()
})
</script>

<template>
  <obc-skeleton v-if="loading"/>
  <div class="tag-result-list" v-if="!loading" style="margin-left: 5px;margin-right: 5px">
    <el-row :gutter="30">
      <ObcColArticleList v-for="(data, index) in dataList" :key="index">
        <ObcArticleList :data="data" @clickTag="clickTag"/>
      </ObcColArticleList>
    </el-row><br/>
  </div>
  <div class="read-more" v-if="showReadMore">
    <obc-loading-more content="加载更多" @click="readMore"/>
  </div>
  <div class="search-more" v-if="showSearchMore">
    <obc-loading-more content="加载更多搜索结果" @click="loadingSearchMore"/>
  </div>
  <div class="is-empty">
    <obc-empty v-if="showEmpty"/>
  </div>
</template>

<style scoped>

</style>