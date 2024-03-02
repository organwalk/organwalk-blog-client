<script setup>
import {defineProps} from "vue";

defineProps({
  content:String
})
</script>

<template>
  <h2 style="font-size: 3rem;font-weight: 600; margin: 15px 0;user-select: none">{{ content }}</h2>
</template>

<style scoped>

</style>