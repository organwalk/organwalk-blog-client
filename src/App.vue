<template>
  <router-view :id="cssId"/>


  <el-backtop style="color:#333;" :right="100" :bottom="160"/>
  <el-backtop style="color:#333;"
              :right="100" :bottom="100"
              @click="changeCss">
    <el-icon>
      <Sunny v-if="isDark === 'true'"/>
      <Moon v-else/>
    </el-icon>
  </el-backtop>
</template>

<script setup>
import {Moon, Sunny} from "@element-plus/icons-vue";
import {onBeforeMount, ref} from "vue";
import {scrollToOriginal} from "@/utils/affixUtils"
const cssId = ref("app-light")
const isDark = ref("false")
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

onBeforeMount(() => {
  if (localStorage.getItem("isDark") !== null){
    isDark.value = localStorage.getItem("isDark");
  }
})
</script>

<!--suppress CssUnusedSymbol -->
<style>
html body{
  font-family: 微软雅黑, serif;
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
