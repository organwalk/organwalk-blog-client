<script setup>
// 目录
import {computed, nextTick, ref, watchEffect, defineProps, defineEmits} from "vue";
import {useMarkdownView} from "@/store/store";
import {Close} from "@element-plus/icons-vue";

const props = defineProps({
  showAnchor: Boolean
})
const showAnchor = ref(false)
watchEffect(() => {
  showAnchor.value = props.showAnchor
})
const emit = defineEmits(['close'])

const close = () => {
  emit('close', false)
}


const markdownViewStore = useMarkdownView()
const markdownView = computed(() => markdownViewStore.markdownView)
const titles = ref()

watchEffect(async () => {
  if (markdownView.value) {
    titles.value = await getAnchor()
  }
})
const getAnchor = async () => {
  return new Promise((resolve) => {
    nextTick(() => {
      const anchors = markdownView.value.$el.querySelectorAll("h1,h2,h3,h4,h5,h6");
      const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
      if (!titles.length) {
        resolve([]);
      }
      const hTags = Array.from(new Set(titles.map((title) => title.tagName))).sort();
      const result = titles.map((el) => ({
        title: el.innerText,
        lineIndex: el.getAttribute("data-v-md-line"),
        indent: hTags.indexOf(el.tagName),
      }));
      resolve(result);
    });
  });
}
const handleAnchorClick = (anchor, markdownView) => {
  close()
  const heading = markdownView.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`);
  if (heading) {
    markdownView.scrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 100,
    });
  }
}
</script>

<template>
  <el-dialog v-model="showAnchor"
             v-if="showAnchor"
             width="95%" top="0"
             style="border-radius: 15px; height: 90vh; margin-top: 15px"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :show-close="false"
             :lock-scroll="true"
  >
    <template #header>
      <div class="card-header" style="height: 5vh">
        <el-row style="display: flex; align-items: center;">
          <el-col :xs="1" :sm="1" :md="1" :lg="1" :xl="1">
            <el-button style="border: none"
                       :icon="Close"
                       @click="close"
                       circle/>
          </el-col>
          <el-col :xs="17" :sm="17" :md="17" :lg="17" :xl="17">
            <h3 style="margin-top: 0;margin-bottom: 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;文章目录</h3>
          </el-col>
        </el-row>
      </div>
    </template>
    <el-card style="border-radius: 10px;margin-top: -10px;height: 70vh;overflow-y: auto"
             shadow="never">
      <div
          v-for="(anchor, index) in titles" :key="index"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
          @click="handleAnchorClick(anchor, markdownView)"
      >
        <a style="cursor: pointer">{{ anchor.title }}</a>
      </div>
    </el-card>

  </el-dialog>
</template>

<style scoped>

</style>