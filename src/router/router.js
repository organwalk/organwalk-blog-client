const routes = [
    {
        path : '/',
        name : 'home',
        component: ()=>import('@/view/home/HomeView.vue')
    },
    {
        path : '/tag/:tagName',
        name : 'homeTagResult',
        component: ()=>import('@/view/home/tag-result/HomeTagResultView.vue')
    },
    {
        path : '/article/:articleId',
        name : 'homeArticleDetail',
        component: ()=>import('@/view/home/article-detail/HomeArticleDetailView.vue')
    },
]

export default routes