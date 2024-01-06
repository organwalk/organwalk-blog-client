<script setup>
import {defineProps, defineEmits, computed} from "vue"
import {useIsDarkStore} from "@/store/store";
import {useRouter} from "vue-router";
import {scrollToTop} from "@/utils/affixUtils";
defineProps({
  data:Object
})
const emit = defineEmits(['clickTag'])
const clickTag = (tagName) => {
  emit('clickTag', tagName)
}

// 暗黑模式样式调整
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)


// 进入文章详情
const route = useRouter()
const clickArticle = (id) => {
  route.push('/article/' + id)
  scrollToTop()
}
</script>

<template>
  <h3 class="title" @click="clickArticle(data['id'])">{{ data['name'] }}</h3>
  <span style="font-size: 1rem;">{{ data['outline'] }}</span>
  <div style="margin: 20px 0;">
    <el-tag v-for="(tag, tagIndex) in data['tags']" :key="tagIndex"
            :class="isDark === 'true' ? 'tag-dark' : 'tag-light'"
            @click="clickTag(tag)"
            class="tag" type="info" v-html="tag" />
  </div>
</template>

<style scoped src="@/css/article-list-css.css" />
