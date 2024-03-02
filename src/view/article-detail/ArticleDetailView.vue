<script setup>
import {defineAsyncComponent} from "vue";
const ArticleDetailHead = defineAsyncComponent(() => import("@/view/article-detail/ArticleDetailHead.vue"))
const HomeFooter = defineAsyncComponent(() => import("@/view/home/HomeFooter.vue"))
const ArticleDetail = defineAsyncComponent(() => import("@/view/article-detail/ArticleDetail.vue"))
</script>

<template>
  <article-detail-head/>
  <el-row>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" />
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
      <article-detail/>
      <home-footer />
    </el-col>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" />
  </el-row>
</template>

<style scoped>

</style>