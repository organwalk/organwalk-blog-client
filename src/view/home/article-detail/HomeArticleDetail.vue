<script setup>
import {computed, onBeforeMount, ref} from "vue";
import axios from "axios";
import {useIsDarkStore, useMarkdownView} from "@/store/store";
import {withLoading} from "@/utils/aopUtils";

const content = ref('')
const markdownView = ref()
const markdownStore = useMarkdownView()

const loading = ref(true)

const loadingData = withLoading(loading, async () => {
  await axios.get('https://raw.gitmirror.com/organwalk/Article/master/Springboot%203%20%2B%20Spring%20Security%206%20%2B%20OAuth2%20%E5%85%A5%E9%97%A8%E7%BA%A7%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.md').then(async (res) => {
    content.value = res.data
    markdownStore.setMarkdownView(markdownView.value)
  })
})


// 暗黑模式
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)

onBeforeMount(async () => {
  await loadingData()
})



</script>

<template>
  <el-card
      :body-style="{paddingLeft:'0px', paddingRight:'0px'}"
      :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff'}"
      shadow="never" style="border-radius: 0;border: none" ref="scrollOut">
    <el-row>
      <el-skeleton :rows="20"
                   style="margin-left: 15px;margin-right: 15px"  v-if="loading" animated />
    </el-row>
    <v-md-preview :text="content" :style="{color:isDark === 'true' ? '#b2b2b2' : '#000'}"
                  ref="markdownView" id="md-article"  v-show="!loading"></v-md-preview>
  </el-card>
</template>

