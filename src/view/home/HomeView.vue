<script setup>
import { defineAsyncComponent } from 'vue';
import HomeArticleList from "@/view/home/HomeArticleList.vue";

const HomeHead = defineAsyncComponent(() => import('@/view/home/HomeHead.vue'));
const HomeFooter = defineAsyncComponent(() => import('@/view/home/HomeFooter.vue'));
const ObcContainerArticleList = defineAsyncComponent(() => import('@/components/container/Obc-Container-ArticleList.vue'));
</script>


<template>
  <obc-container-article-list>
    <home-head/>
    <home-article-list/>
    <home-footer />
  </obc-container-article-list>
</template>

<style scoped>

</style>