const routes = [
    {
        path : '/',
        name : 'home',
        component: ()=>import('@/view/home/HomeView.vue')
    },
    {
        path : '/tag/:tagName',
        name : 'homeTagResult',
        component: ()=>import('@/view/home/tag-result/HomeTagResultView.vue'),
        key: Date.now()
    },
    {
        path : '/article/:articleId',
        name : 'homeArticleDetail',
        component: ()=>import('@/view/home/article-detail/HomeArticleDetailView.vue'),
        key: Date.now()
    },
]

export default routes