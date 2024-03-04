<script setup>
import {useKeywordStore, useNowTypeStore} from "@/store/store";
import {computed, onBeforeMount, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {scrollToTop} from "@/utils/affixUtils";
import {defineAsyncComponent} from "vue";
import {getHomeData, searchArticleAboutAll} from "@/api/api";
import {withLoading} from "@/utils/aopUtils";
import ObcEmpty from "@/components/container/Obc-Empty.vue";
import ObcLoadingMore from "@/components/article/Obc-LoadingMore.vue";

const ObcArticleList = defineAsyncComponent(() => import("@/components/article/Obc-ArticleList.vue"))
const ObcHeadArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Head-ArticleList.vue"))
const ObcCheckBoxArticleList = defineAsyncComponent(() => import("@/components/check-box/Obc-CheckBox-ArticleList.vue"))
const ObcColArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Col-ArticleList.vue"))
const ObcSkeleton = defineAsyncComponent(() => import("@/components/container/Obc-Skeleton.vue"))

// 加载初始数据
const loading = ref(true)
const dataList = ref([])
const originDataList = ref([])
const loadingDataList = withLoading(loading, async (typeId) => {
  const res = await getHomeData(typeId)
  if (res['code'] === 2002) {
    dataList.value = res.data
    originDataList.value = res.data
  } else {
    dataList.value = []
  }
})


// 切换类别加载新的数据
const nowTypeStore = useNowTypeStore()
const nowType = computed(() => nowTypeStore.nowType)
watchEffect(async () => {
  if (typeof nowType.value === 'number') {
    await loadingDataList(nowType.value)
  }
})
// 类别下查看更多
const readMore = () => {
  route.push('/type/' + nowType.value).then(() => {
    scrollToTop()
  })
}
const showReadMore = computed(() => {
  return nowType.value !== 0 &&
      route.currentRoute.value.name === 'home' &&
      !loading.value && dataList.value.length === 6
})


// 呈现搜索列表
// 从状态管理中获取搜索关键词
const keywordStore = useKeywordStore()
const keyword = computed(() => keywordStore.keyword)
const isSearch = ref(false)
const total = ref(0)
const searchArticle = async (keyword, offset) => {
  if (keyword === "") {
    dataList.value = originDataList.value
  } else {
    const res = await searchArticleAboutAll(keyword, offset)
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
  route.push({path: '/tag/' + tagName, query: {load: Date.now()}}).then(() => {
    scrollToTop()
  })
}

const showEmpty = computed(() => {
  return dataList.value.length === 0 && !loading.value
})

onBeforeMount(async () => {
  await loadingDataList(0)
})
</script>

<template>
  <div class="home-list" v-if="!isSearch">
    <div class="all-blog-list">
      <ObcHeadArticleList content="All Blog"/>
      <div>
        <ObcCheckBoxArticleList :types="['TimeLine', 'Tech', 'Utopia', 'Walk']"/>
      </div>
      <obc-skeleton v-if="loading"/>
      <div style="margin-left: 5px;margin-right: 5px">
        <el-row :gutter="30" v-if="!loading">
          <ObcColArticleList v-for="(data, index) in dataList" :key="index">
            <ObcArticleList :data="data" @clickTag="clickTag"/>
          </ObcColArticleList>
        </el-row>
      </div>
    </div>
  </div>
  <div class="search-result-list" v-if="isSearch" style="margin-left: 5px;margin-right: 5px">
    <ObcHeadArticleList :content="keyword"/>
    <obc-skeleton v-if="loading"/>
    <div style="margin-left: 5px;margin-right: 5px">
      <el-row :gutter="30" v-if="!loading" >
        <ObcColArticleList v-for="data in dataList" :key="data.id">
          <ObcArticleList :data="data" @clickTag="clickTag"/>
        </ObcColArticleList>
      </el-row><br/>
    </div>
  </div>
  <div class="read-more" v-if="showReadMore">
    <obc-loading-more content="查看更多" @click="readMore"/>
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