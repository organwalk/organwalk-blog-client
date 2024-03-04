<script setup>
import {defineAsyncComponent} from "vue";
const ObcContainerArticleList = defineAsyncComponent(() => import("@/components/container/Obc-Container-ArticleList.vue"))
</script>
<template>
<obc-container-article-list align="center">
  <el-card style="border: none;" shadow="never">
    <el-result icon="info" title="OrganWalk">
      <template #sub-title>
        <span style="color: #606266">当前内容为空</span>
      </template>
    </el-result>

  </el-card>

</obc-container-article-list>

</template>