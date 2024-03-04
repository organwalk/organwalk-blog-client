<script setup>
import {defineAsyncComponent} from "vue";
import {useRouter} from "vue-router";
const ObcContainerArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Container-ArticleList.vue"))
const route = useRouter()
</script>

<template>
<obc-container-article-list align="center">
  <el-result icon="info" title="OrganWalk">
    <template #sub-title>
      <span>来到了不存在的岛屿</span>
    </template>
    <template #extra>
      <el-button type="primary" color="#333" round @click="route.back">Back</el-button>
    </template>
  </el-result>
</obc-container-article-list>
</template>

<style scoped>
:global(.el-button) {
  --el-button-hover-text-color:none;
  --el-button-hover-bg-color:none;
  --el-button-hover-border-color:none;
}
</style>