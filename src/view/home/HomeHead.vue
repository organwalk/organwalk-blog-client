<script setup>
import {onMounted, ref} from "vue";
import { Search } from '@element-plus/icons-vue'
import {useKeywordStore} from "@/store/store";
import {inputDebounce} from "@/utils/aopUtils"
const keyword = ref('')

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
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <h1 style="margin: 30px 0;user-select: none;word-wrap: break-word;" :style="{fontSize:fontSize}" v-html="'OrganWalk.'"/>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <el-input v-model="keyword" :prefix-icon="Search"
                @input="getKeyword" maxlength="30"
                style="font-size: 16px" placeholder="搜索博客文章" size="large" clearable/>
    </el-col>
  </el-row><br/>
</template>

<style scoped>
:deep(.el-input__wrapper){
  background-color: #f1f2f3;
  border-radius: 20px;
  box-shadow:none;
  padding:5px 20px;
}
</style>

