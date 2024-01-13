<script setup>
import HomeArticleDetailHead from "@/view/home/article-detail/HomeArticleDetailHead.vue";
import HomeFooter from "@/view/home/HomeFooter.vue";
import HomeArticleDetail from "@/view/home/article-detail/HomeArticleDetail.vue";
import {useIsDarkStore} from "@/store/store";
import {computed} from "vue";

// 暗黑模式
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)
</script>

<template>
  <home-article-detail-head/>
  <el-row>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff'}"/>
    <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
      <home-article-detail/>
      <home-footer />
    </el-col>
    <el-col :xs="0" :sm="0" :md="0" :lg="4" :xl="4" :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff'}"/>
  </el-row>
</template>

<style scoped>

</style>