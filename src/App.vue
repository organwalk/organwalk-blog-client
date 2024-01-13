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
  <obc-anchor-article :dialog="showAnchor" @close="args => showAnchor = args"/>
</template>

<script setup>
import {Moon, Sunny, Tickets} from "@element-plus/icons-vue";
import {onBeforeMount, ref, watchEffect} from "vue";
import {useIsDarkStore} from "@/store/store";
import ObcAnchorArticle from "@/components/article/Obc-Anchor-Article.vue";
import {useRouter} from "vue-router";
import {withScrollToOriginal} from "@/utils/aopUtils";

// 暗黑与亮色主题相关代码
const cssId = ref("app-light")
const isDark = ref()
const isDarkStore = useIsDarkStore()

// 切换主题
const toggleTheme = (cssIdValue, isDarkValue) => {
  cssId.value = cssIdValue
  isDark.value = isDarkValue
  isDarkStore.setIsDark(isDark.value)
}

// 暗黑主题
const dark = () => {
  toggleTheme("app-dark", "true")
}

// 亮色主题
const light = () => {
  toggleTheme("app-light", "false")
}

// 手动切换主题
const changeCss = withScrollToOriginal(() => {
  if (isDark.value === null){
    dark()
  }else {
    isDark.value === "true" ? light() : dark()
  }
  localStorage.setItem("isDark", isDark.value)
})

// 从缓存中应用主题，如果存在
const applyThemeFromCache = () => {
  if (localStorage.getItem("isDark") !== null){
    isDark.value = localStorage.getItem("isDark");
    isDark.value === "true" ? dark() : light()
  }
}


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


// 组件被挂载前执行
onBeforeMount(() => {
  // 从缓存中应用主题
  applyThemeFromCache()
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
#app-light{
  background-color: #fff;
}
#app-dark{
  background-color: #111;
  color: #fff;
}
</style>

