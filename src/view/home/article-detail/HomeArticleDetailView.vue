<script setup>
import HomeArticleDetailHead from "@/view/home/article-detail/HomeArticleDetailHead.vue";
import HomeFooter from "@/view/home/HomeFooter.vue";
import HomeArticleDetail from "@/view/home/article-detail/HomeArticleDetail.vue";
</script>

<template>
  <el-row>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" />
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
      <home-article-detail-head/>
      <home-article-detail/>
      <home-footer />
    </el-col>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" />
  </el-row>
</template>

<style scoped>

</style>