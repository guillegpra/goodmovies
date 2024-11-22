import { createRouter, createWebHistory } from 'vue-router';
import MovieList from '@/components/MovieList.vue';
import MovieDetail from '@/components/MovieDetail.vue';
import FavoriteMovies from '@/components/FavoriteMovies.vue';

const routes = [
    {
        path: '/',
        name: 'MovieList',
        component: MovieList,
    },
    {
        path: '/movie/:id',
        name: 'MovieDetail',
        component: MovieDetail,
        props: true,
    },
    {
        path: '/favorites',
        name: 'Favorites',
        component: FavoriteMovies,
    },
    {
        path: '/test',
        name: 'Test',
        component: { template: '<h1>Test Page</h1>' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
