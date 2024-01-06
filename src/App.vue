<template>
  <router-view :id="cssId"/>
  <el-backtop style="color:#333;" :right="20" :bottom="220"/>
  <el-backtop style="color:#333;"
              :right="20" :bottom="160"
              @click="changeCss">
    <el-icon>
      <Sunny v-if="isDark === 'false'"/>
      <Moon v-else/>
    </el-icon>
  </el-backtop>
  <el-backtop style="color:#333;"
              :right="20" :bottom="100"
              v-if="showAnchorButton"
              @click="openAnchor">
    <el-icon>
      <Tickets />
    </el-icon>
  </el-backtop>
  <obc-anchor-article :show-anchor="showAnchor" @close="args => showAnchor = args"/>
</template>

<script setup>
import {Moon, Sunny, Tickets} from "@element-plus/icons-vue";
import {onBeforeMount, ref, watch, watchEffect} from "vue";
import {scrollToOriginal} from "@/utils/affixUtils"
import {useIsDarkStore} from "@/store/store";
import ObcAnchorArticle from "@/components/article/Obc-Anchor-Article.vue";
import {useRouter} from "vue-router";

// 暗黑模式
const cssId = ref("app-light")
const isDark = ref()
const isDarkStore = useIsDarkStore()
const changeCss = () => {
  scrollToOriginal()
  if (isDark.value === null){
    dark()
  }else {
    isDark.value === "true" ? light() : dark()
  }
  localStorage.setItem("isDark", isDark.value)
}

const dark = () => {
  cssId.value = "app-dark"
  isDark.value = "true"
}

const light = () => {
  cssId.value = "app-light"
  isDark.value = "false"
}

watch(isDark, (newVal, oldValue) => {
  if (newVal !== oldValue){
    isDarkStore.setIsDark(newVal)
  }
})


// 目录相关
const showAnchor = ref(false)
const openAnchor = () => {
  showAnchor.value = true
  scrollToOriginal()
}
const route = useRouter()
const showAnchorButton = ref(false)
watchEffect(() => {
  showAnchorButton.value = route.currentRoute.value.name === 'homeArticleDetail';
})

onBeforeMount(() => {
  if (localStorage.getItem("isDark") !== null){
    isDark.value = localStorage.getItem("isDark");
    isDark.value === "true" ? dark() : light()
  }
})
</script>

<!--suppress CssUnusedSymbol -->
<style>

html body{
  color: #000;
  margin: 0;
  padding: 0;
}
#app-light{
  background-color: #fff;
}
#app-dark{
  background-color: #111;
  color: #fff;
}
</style>

