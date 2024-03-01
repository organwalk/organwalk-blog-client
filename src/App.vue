<template>
  <router-view />
  <el-backtop style="color:#333;" :right="20" :bottom="220"/>
  <el-backtop style="color:#333;"
              :right="20" :bottom="160"
              v-if="showAnchorButton"
              @click="openAnchor">
    <el-icon>
      <Tickets />
    </el-icon>
  </el-backtop>
  <obc-anchor-article :dialog="showAnchor" @close="args => showAnchor = args"/>
</template>

<script setup>
import {Tickets} from "@element-plus/icons-vue";
import {ref, watchEffect} from "vue";
import ObcAnchorArticle from "@/components/article/Obc-Anchor-Article.vue";
import {useRouter} from "vue-router";
import {withScrollToOriginal} from "@/utils/aopUtils";


// 目录相关代码
const showAnchor = ref(false)

// 手动打开目录
const openAnchor = withScrollToOriginal(()  => {
  showAnchor.value = true
})

// 当路由非文章时，隐藏目录
const route = useRouter()
const showAnchorButton = ref(false)
watchEffect(() => {
  showAnchorButton.value = route.currentRoute.value.name === 'homeArticleDetail';
})

</script>

<!--suppress CssUnusedSymbol -->
<style>

html body{
  color: #000;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  outline: none;
}
</style>

