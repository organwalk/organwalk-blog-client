<script setup>
import {onBeforeMount, ref} from "vue";
import axios from "axios";
import {useMarkdownView} from "@/store/store";
import {withLoading} from "@/utils/aopUtils";
import ObcSkeleton from "@/components/container/Obc-Skeleton.vue";

const content = ref('')
const createDateTime = '2023-03-21'
const markdownView = ref()
const markdownStore = useMarkdownView()

const loading = ref(true)

const loadingData = withLoading(loading, async () => {
  await axios.get('https://raw.gitmirror.com/organwalk/Article/master/Springboot%203%20%2B%20Spring%20Security%206%20%2B%20OAuth2%20%E5%85%A5%E9%97%A8%E7%BA%A7%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5.md').then(async (res) => {
    content.value = res.data
    markdownStore.setMarkdownView(markdownView.value)
  })
})

onBeforeMount(async () => {
  await loadingData()
})



</script>

<template>
  <el-card
      :body-style="{paddingLeft:'0px', paddingRight:'0px'}"
      shadow="never" style="border-radius: 0;border: none" ref="scrollOut">
    <obc-skeleton :loading="loading"/>
    <v-md-preview :text="content" ref="markdownView" id="md-article"  v-show="!loading" />
    <br/><span style="margin-left: 20px;color: #606266">编辑于 {{ createDateTime }}</span>
  </el-card>

</template>

