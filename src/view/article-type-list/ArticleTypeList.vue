<script setup>
import {computed, onBeforeMount, ref, watch} from "vue";
import {scrollToTop} from "@/utils/affixUtils";
import {useRouter} from "vue-router";
import {defineAsyncComponent} from "vue";
import ObcLoadingMore from "@/components/article/Obc-LoadingMore.vue";
import ObcEmpty from "@/components/container/Obc-Empty.vue";
import {useKeywordStore} from "@/store/store";
import {getTagsArticleCountByType, getTypeArticleData, searchArticleAboutType} from "@/api/api";
import {withLoading} from "@/utils/aopUtils";
const ObcArticleList = defineAsyncComponent(() => import("@/components/article/Obc-ArticleList.vue"))
const ObcColArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Col-ArticleList.vue"))
const ObcSkeleton = defineAsyncComponent(() => import("@/components/container/Obc-Skeleton.vue"))

const loading = ref(true)
const dataList = ref([])
const originDataList = ref([])
const total = ref(0)
const loadingDataList = async (offset) => {
  const res = await getTypeArticleData(route.currentRoute.value.params['typeId'], offset)
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
// 从状态管理中获取搜索关键词
const keywordStore = useKeywordStore()
const keyword = computed(() => keywordStore.keyword)
const isSearch = ref(false)
const searchArticle = async (keyword, offset) => {
  if (keyword === "") {
    dataList.value = originDataList.value
  } else {
    const res = await searchArticleAboutType(keyword, route.currentRoute.value.params['typeId'], offset)
    if (res['code'] === 2002) {
      total.value = Number(res['total'])
      if (offset !== 0){
        dataList.value.push(...res.data)
      }else {
        dataList.value = res.data
      }
    } else {
      dataList.value = []
    }
  }
}
watch(keyword, (newVal, oldValue) => {
  if (newVal !== oldValue) {
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
    scrollToTop()
  })
}
const tags = ref([])
const loadingTags = async () => {
  const res = await getTagsArticleCountByType(route.currentRoute.value.params['typeId'])
  if (res['code'] === 2002){
    tags.value = res.data
  }else {
    tags.value = []
  }
}

const showEmpty = computed(() => {
  return dataList.value.length === 0 && !loading.value
})

onBeforeMount(() => {
  const loadingData = withLoading(loading, () => loadingDataList(0))
  loadingData()
  loadingTags()
})

</script>

<template>
  <obc-skeleton v-if="loading"/>
  <div class="type-data" v-if="!loading">
    <el-row :gutter="30"  style="margin-left: 5px;margin-right: 5px">
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
  </div><br/>
  <el-divider content-position="left">类别标签集群</el-divider>
  <el-tag v-for="(tag, tagIndex) in tags" :key="tagIndex"
          class="tags" type="info" @click="clickTag(tag.name)">{{ tag.name }} &nbsp;&nbsp;{{ tag.count }}</el-tag>
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