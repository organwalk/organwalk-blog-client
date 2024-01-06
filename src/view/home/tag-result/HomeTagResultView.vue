<script setup>
import {useRouter} from "vue-router";
import {computed} from "vue";
import HomeTagResultHead from "@/view/home/tag-result/HomeTagResultHead.vue";
import HomeTagResultArticleList from "@/view/home/tag-result/HomeTagResultArticleList.vue";
import HomeFooter from "@/view/home/HomeFooter.vue";

const route = useRouter()
const tagName = computed(() => String(route.currentRoute.value.params.tagName))

</script>

<template>
  <el-row>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
    <el-col :xs="22" :sm="22" :md="22" :lg="16" :xl="16">
      <home-tag-result-head :tag-name="tagName"/>
      <home-tag-result-article-list/>
      <home-footer />
    </el-col>
    <el-col :xs="1" :sm="1" :md="1" :lg="4" :xl="4" />
  </el-row>
</template>

<style scoped>

</style>