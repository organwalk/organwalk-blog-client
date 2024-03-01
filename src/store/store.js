import {defineStore} from "pinia";
import {ref} from "vue";

export const useKeywordStore = defineStore('keyword', () => {
    const keyword = ref()
    function setKeyword(realKeyword){
        keyword.value = realKeyword
    }
    return { keyword, setKeyword}
})

export const useMarkdownView = defineStore('markdownView', () => {
    const markdownView = ref()
    function setMarkdownView(realMarkdownView){
        markdownView.value = realMarkdownView
    }
    return {markdownView, setMarkdownView}
})

export const useNowAnchorTitle = defineStore('nowAnchorTitle', () => {
    const nowAnchorTitle = ref()
    function setNowAnchorTitle(realVal){
        nowAnchorTitle.value = realVal
    }
    return {nowAnchorTitle, setNowAnchorTitle}
})

export const useNowTypeStore = defineStore('nowType', () => {
    const nowType = ref()
    function setNowType(realType){
        nowType.value = realType
    }
    return{nowType, setNowType}
})