const routes = [
    {
        path : '/',
        name : 'home',
        component: ()=>import('@/view/home/HomeView.vue')
    },
]

export default routes