<script setup>
import HomeHead from "@/view/home/HomeHead.vue";
import HomeArticleList from "@/view/home/HomeArticleList.vue";
import HomeFooter from "@/view/home/HomeFooter.vue";
</script>

<template>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
    <el-col :xs="22" :sm="22" :md="22" :lg="16" :xl="16">
      <home-head/>
      <home-article-list/>
      <home-footer />
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
  </el-row>
</template>

<style scoped>

</style>