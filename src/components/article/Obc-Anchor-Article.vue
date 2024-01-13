<script setup>
// 目录组件
import {computed, nextTick, ref, watchEffect, defineProps, defineEmits} from "vue";
import {useIsDarkStore, useMarkdownView} from "@/store/store";
import {scrollingDebounce} from "@/utils/aopUtils";
import {Close} from "@element-plus/icons-vue";

// 组件父子传值，主要包括了目录组件打开和关闭的触发
const props = defineProps({
  dialog: Boolean
})
const showAnchor = ref(false)
watchEffect(() => {
  showAnchor.value = props.dialog
})

const emit = defineEmits(['close'])
const close = () => {
  emit('close', false)
}


// 目录数组相关代码
const markdownViewStore = useMarkdownView()
const markdownView = computed(() => markdownViewStore.markdownView)
const titles = ref()

// 异步获取目录，其返回值是目录标题数组
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

// 定义监听器，当状态管理获取到markdown文档的ref对象时
// 异步获取目录，并赋值目录标题数组
watchEffect(async () => {
  if (markdownView.value) {
    titles.value = await getAnchor()
  }
})


// 定义点击目录时的切换方法
const handleAnchorClick = (anchor, markdownView) => {
  nowTitle.value = anchor.title
  setTimeout(() => {
    close() //关闭目录组件

    // 跳转当前浏览视窗至指定目录标题
    const heading = markdownView.$el.querySelector(`[data-v-md-line="${anchor.lineIndex}"]`);
    if (heading) {
      markdownView.scrollToTarget({
        target: heading,
        scrollContainer: window,
        top: 100,
        behavior:'smooth',
        block:'start'
      });
    }
  }, 100)

}

// 监听滚动事件，获取当前标题
const nowTitle = ref('')
window.addEventListener('scroll', scrollingDebounce(() => {
  const container = document.scrollingElement.querySelector('#md-article');
  if (container) {
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let topmostHeading;

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const contentRect = heading.nextElementSibling.getBoundingClientRect();
        if (contentRect.top < window.innerHeight) {
          topmostHeading = heading;
        }
      }
    });

    if (topmostHeading) {
      nowTitle.value = topmostHeading.textContent
    }
  }
}));


// 媒体查询，更改相应样式
const drawerSize = ref('100%')
const mediaQuery = window.matchMedia('(max-width: 768px)');
const handleMediaQueryChange = (mediaQuery) => {
  if (mediaQuery.matches) {
    drawerSize.value = '100%'
  } else {
    drawerSize.value = '45%'
  }
};
handleMediaQueryChange(mediaQuery);


// 暗黑模式
const isDarkStore = useIsDarkStore()
const isDark = computed(() => isDarkStore.isDark)
</script>

<template>
  <el-drawer
      v-model="showAnchor"
      :with-header="false" :size="drawerSize" :lock-scroll="false" :before-close="close"
      :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff',
      color:isDark === 'true' ? '#b2b2b2' : '#000'}"
      direction="rtl" style="padding-left: 10px;user-select: none"
  >
    <el-affix :offset="0">
      <div :style="{backgroundColor:isDark === 'true' ? '#1c1c1d' : '#ffffff'}">
        <el-row>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
            <h3 style="margin-top: 5px;color: #606266">文章目录</h3>
          </el-col>
          <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" align="right">
            <el-button :icon="Close" style="border: none;background-color: transparent" @click="close" circle />
          </el-col>
        </el-row>
      </div>
    </el-affix>
    <div
        v-for="(anchor, index) in titles" :key="index"
        :style="{ padding: `10px 0 20px ${anchor.indent * 20}px` }"
        @click="handleAnchorClick(anchor, markdownView)"
    >
      <div :class="anchor.title === nowTitle ? 'now-span' : ''">
        <span style="cursor: pointer">{{ anchor.title }}</span>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
.now-span{
  padding: 10px 15px;
  margin-top: -5px;
  margin-bottom: -5px;
  background-color: #f3f4f6;
  border-radius: 5px;
}
</style>