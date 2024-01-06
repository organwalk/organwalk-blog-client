<script setup>
import HomeHead from "@/view/home/HomeHead.vue";
import HomeArticleList from "@/view/home/HomeArticleList.vue";
import HomeFooter from "@/view/home/HomeFooter.vue";
</script>

<template>
  <el-row>
    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1" />
    <el-col :xs="8" :sm="6" :md="4" :lg="16" :xl="1">
      <home-head/>
      <home-article-list/>
      <home-footer />
    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="4" :xl="1" />
  </el-row>
</template>

<style scoped>

</style>