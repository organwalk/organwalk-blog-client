const routes = [
    {
        path : '/',
        name : 'home',
        component: ()=>import('@/view/home/HomeView.vue'),
        meta: { title: 'OrganWalk' }
    },
    {
        path : '/tag/:tagName',
        name : 'homeTagResult',
        component: ()=>import('@/view/article-tag-result/TagArticleView.vue'),
        key: Date.now(),
        meta: { title: 'OrganWalk-Tag' }
    },
    {
        path : '/article/:articleId',
        name : 'homeArticleDetail',
        component: ()=>import('@/view/article-detail/ArticleDetailView.vue'),
        key: Date.now(),
        meta: { title: 'OrganWalk-Article' }
    },
    {
        path: '/type/:typeId',
        name: 'articleTypeList',
        component:() => import('@/view/article-type-list/ArticleTypeListView.vue'),
        meta: { title: 'OrganWalk-Type' },
        beforeEnter: (to, from, next) => {
            const validTypeIds = ['1', '2', '3'];
            if (validTypeIds.includes(to.params['typeId'])) {
                next(); // typeId有效，继续路由导航
            } else {
                next({ name: 'notFound' });
            }
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/view/article-not-found/NotFoundPage.vue')
    }
]

export default routes