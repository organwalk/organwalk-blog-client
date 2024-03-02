<script setup>
import {ref, defineProps, watchEffect, onMounted} from "vue";
import {Search} from '@element-plus/icons-vue'
import {useKeywordStore} from "@/store/store";
import {inputDebounce} from "@/utils/aopUtils"

const props = defineProps({
  tagName: String
})
const keyword = ref('')
const realTagName = ref()
watchEffect(() => {
  if (props.tagName){
    realTagName.value = props.tagName
  }
})

// 将输入的关键词纳入状态管理
const keywordStore = useKeywordStore()
const getKeyword = inputDebounce((word) => {
  keywordStore.setKeyword(word)
})

const fontSize = ref('9rem')
onMounted(() => {
  if (window.matchMedia('(max-width: 768px)').matches){
    fontSize.value = '4rem'
  }else {
    fontSize.value = '9rem'
  }
})

</script>

<template>
  <br/>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <h1 style="margin: 30px 0 0 0;
            user-select: none;word-wrap: break-word;background-color: #f3f4f6;
            display: initial" :style="{fontSize:fontSize}">{{ realTagName }}</h1>
      <h1 style="margin: -15px 0 30px 0;
            user-select: none;" :style="{fontSize:fontSize}" v-html="'Tag'"/>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-input v-model="keyword" :prefix-icon="Search"
                @input="getKeyword"
                style="font-size: 16px" placeholder="搜索包含该标签的文章" size="large" clearable/>
    </el-col>
  </el-row>
  <br/>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: #f1f2f3;
  border-radius: 20px;
  box-shadow: none;
  padding: 5px 20px;
}
</style>

