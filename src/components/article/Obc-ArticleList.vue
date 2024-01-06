<script setup>
import {defineProps} from "vue"
defineProps({
  data:Object
})

</script>

<template>
  <h3 class="title">{{ data['name'] }}</h3>
  <span style="font-size: 1rem;">{{ data['outline'] }}</span>
  <div style="margin: 20px 0;">
    <el-tag v-for="(tag, tagIndex) in data['tags']" :key="tagIndex"
            class="tag" type="info" v-html="tag"/>
  </div>
</template>

<style scoped>
.title{
  font-size: 1.2rem;
  font-weight: 600
}
.title:hover{
  color: #409EFF;
  cursor: pointer;
}
.tag {
  margin: 0 10px 10px 0;
  color: #333;
}
.tag:hover{
  color: #409EFF;
  cursor: pointer;
}
</style>