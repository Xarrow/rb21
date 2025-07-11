import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Admin from '../views/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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