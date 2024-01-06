<script setup>
import {ref} from "vue";
import { Search } from '@element-plus/icons-vue'
const keyword = ref('')

</script>

<template>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <h1 style="font-size: 9rem;margin: 30px 0;user-select: none" v-html="'OrganWalk.'"/>
    </el-col>
  </el-row>
  <el-row>
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" >
      <el-input v-model="keyword"
                :prefix-icon="Search"
                style="font-size: 16px" placeholder="搜索博客文章" size="large">
      </el-input>
    </el-col>
  </el-row><br/><br/>
</template>

<style scoped>
:deep(.el-input__wrapper){
  background-color: #f1f2f3;
  border-radius: 20px;
  box-shadow:none;
  padding:5px 20px;
}
</style>

