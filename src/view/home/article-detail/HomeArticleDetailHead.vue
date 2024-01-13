<script setup>
import {useRouter} from "vue-router";
import {useIsDarkStore} from "@/store/store";
import {computed} from "vue";

const route = useRouter()
const home = () => {
  route.push('/')
}

// 暗黑模式
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)
</script>

<template>
  <el-affix :offset="0">
    <el-card :body-style="{paddingTop:'20px', paddingBottom:'20px'}"
             :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff',
             color:isDark === 'true' ? '#b2b2b2' : '#000'}"
             shadow="never" style="border-radius: 0;border-left: none;border-right: none;border-top: none;">
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
.article-title {
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}

:global(.github-markdown-body) {
  padding: 0 20px;
}
</style>