<script setup>
import {useRouter} from "vue-router";

const route = useRouter()
const home = () => {
  route.push('/')
}

</script>

<template>
  <el-affix :offset="0">
    <el-card shadow="never" style="border-radius: 0;background-color: #fff;" :body-style="{paddingTop:'20px', paddingBottom:'20px'}">
      <el-row>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-tooltip
              effect="dark"
              content="使用 Devbox 升级您的开发环境,使开发环境具有隔离特征"
              placement="bottom"
              trigger="click"
          >
            <span class="article-title">使用 Devbox 升级您的开发环境,使开发环境具有隔离特征</span>
          </el-tooltip>
        </el-col>
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="right">
          <span style="cursor: pointer;user-select: none" @click="home">OrganWalk</span>
        </el-col>
      </el-row>
    </el-card>
  </el-affix>

</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.article-title{
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  cursor: pointer;
}
:global(.github-markdown-body){
  padding: 0 20px;
}
</style>