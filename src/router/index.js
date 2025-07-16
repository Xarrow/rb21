import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Posts from '../views/Posts.vue';
import Admin from '../views/Admin.vue';
import Articles from '../views/Articles.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/articles',
    name: 'Articles',
    component: Articles,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '',
        redirect: '/admin/create'
      },
      {
        path: 'create',
        name: 'AdminCreate',
        component: Admin,
        meta: { tab: 'create' }
      },
      {
        path: 'images',
        name: 'AdminImages',
        component: Admin,
        meta: { tab: 'images' }
      },
      {
        path: 'articles',
        name: 'AdminArticles',
        component: Admin,
        meta: { tab: 'articles' }
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;