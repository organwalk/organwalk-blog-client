<script setup>
import {defineAsyncComponent} from "vue";
const ObcContainerArticleList = defineAsyncComponent(() => import('@/components/container/Obc-Container-ArticleList.vue'));
const ArticleTypeListHead = defineAsyncComponent(() => import('@/view/article-type-list/ArticleTypeListHead.vue'));
const HomeFooter = defineAsyncComponent(() => import('@/view/home/HomeFooter.vue'));
const ArticleTypeList = defineAsyncComponent(() => import('@/view/article-type-list/ArticleTypeList.vue'));

</script>

<template>
  <obc-container-article-list>
    <article-type-list-head/>
    <article-type-list/>
    <home-footer/>
  </obc-container-article-list>
</template>

<style scoped>

</style>