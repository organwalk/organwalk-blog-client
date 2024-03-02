<script setup>
import{defineProps} from "vue"
defineProps({
  loading:Boolean
})
</script>

<template>
  <el-row>
    <el-skeleton :rows="20"
                 style="margin-left: 15px;margin-right: 15px"
                 v-if="loading" animated />
  </el-row>
</template>

<style scoped>

</style>