<script setup>
import {useRouter} from "vue-router";
import {useNowAnchorTitle} from "@/store/store";
import {computed, ref, watch} from "vue";

const route = useRouter()
const home = () => {
  route.push('/')
}
const nowAnchorTitleStore = useNowAnchorTitle()
const nowAnchorTitle = ref('阅读文章详细')
const newAnchorTitle = computed(() => nowAnchorTitleStore.nowAnchorTitle)
watch(newAnchorTitle, (newVal, oldValue) => {
  if (newVal !== oldValue){
    nowAnchorTitle.value = newVal
  }
})

</script>

<template>
  <el-affix :offset="0">
    <el-card :body-style="{paddingTop:'20px', paddingBottom:'20px'}"
             shadow="never" style="border-radius: 0;border-left: none;border-right: none;border-top: none;">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-tooltip
              effect="dark"
              :content=nowAnchorTitle
              placement="bottom"
              trigger="click"
          >
            <span class="article-title">{{ nowAnchorTitle }}</span>
          </el-tooltip>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="right">
          <span style="cursor: pointer;user-select: none" @click="home">OrganWalk</span>
        </el-col>
      </el-row>
    </el-card>
  </el-affix>

</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.article-title {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

:global(.github-markdown-body) {
  padding: 0 20px;
}
</style>