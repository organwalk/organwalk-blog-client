<script setup>
import {ref, defineProps, computed, watchEffect} from "vue";
import {Search} from '@element-plus/icons-vue'
import {useIsDarkStore, useKeywordStore} from "@/store/store";
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


// 暗黑模式样式调整
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)

</script>

<template>
  <br/>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <h1 :style="{ backgroundColor: isDark === 'true' ? '#282a36' : '#f3f4f6' }"
          style="font-size: 9rem;margin: 30px 0 0 0;
            user-select: none;word-wrap: break-word;
            display: initial">{{ realTagName }}</h1>
      <h1
          style="font-size: 9rem;margin: -30px 0 30px 0;
            user-select: none;" v-html="'Tag'"/>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-input v-model="keyword" :prefix-icon="Search"
                @input="getKeyword"
                style="font-size: 16px" placeholder="搜索该标签下的文章" size="large" clearable/>
    </el-col>
  </el-row>
  <br/><br/>
</template>

<style scoped>
:deep(.el-input__wrapper) {
  background-color: #f1f2f3;
  border-radius: 20px;
  box-shadow: none;
  padding: 5px 20px;
}
</style>

