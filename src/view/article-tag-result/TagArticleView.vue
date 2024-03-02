<script setup>
import {useRouter} from "vue-router";
import {defineAsyncComponent} from "vue";
const TagHead = defineAsyncComponent(() => import("@/view/article-tag-result/TagHead.vue"))
const TagArticleList = defineAsyncComponent(() => import("@/view/article-tag-result/TagArticleList.vue"))
const HomeFooter = defineAsyncComponent(() => import("@/view/home/HomeFooter.vue"))
const ObcContainerArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Container-ArticleList.vue"))


const route = useRouter()
</script>

<template>
  <obc-container-article-list>
    <tag-head :tag-name="String(route.currentRoute.value.params.tagName)"/>
    <tag-article-list/>
    <home-footer />
  </obc-container-article-list>
</template>

<style scoped>

</style>