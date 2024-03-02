const routes = [
    {
        path : '/',
        name : 'home',
        component: ()=>import('@/view/home/HomeView.vue'),
        meta:'Organwalk'
    },
    {
        path : '/tag/:tagName',
        name : 'homeTagResult',
        component: ()=>import('@/view/article-tag-result/TagArticleView.vue'),
        key: Date.now(),
        meta: 'Organwalk-Tag'
    },
    {
        path : '/article/:articleId',
        name : 'homeArticleDetail',
        component: ()=>import('@/view/article-detail/ArticleDetailView.vue'),
        key: Date.now(),
        meta: 'Organwalk-Article'
    },
    {
        path: '/type',
        name: 'articleTypeList',
        component:() => import('@/view/article-type-list/ArticleTypeListView.vue'),
        meta: 'Organwalk-Type'
    }
]

export default routes