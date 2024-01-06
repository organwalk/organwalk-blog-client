import {defineStore} from "pinia";
import {ref} from "vue";

export const useKeywordStore = defineStore('keyword', () => {
    const keyword = ref()
    function setKeyword(realKeyword){
        keyword.value = realKeyword
    }
    return { keyword, setKeyword}
})

export const useIsDarkStore = defineStore('isDark', () => {
    const isDark = ref()
    function setIsDark(realIsDark){
        isDark.value = realIsDark
    }
    return {isDark, setIsDark}
})

export const useMarkdownView = defineStore('markdownView', () => {
    const markdownView = ref()
    function setMarkdownView(realMarkdownView){
        markdownView.value = realMarkdownView
    }
    return {markdownView, setMarkdownView}
})