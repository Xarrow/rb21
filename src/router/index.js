import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Posts from '../views/Posts.vue';
import Admin from '../views/Admin.vue';
import Articles from '../views/Articles.vue';
import Demo  from '../views/Demo.vue';
const routes = [
  {
    path: '/demo',
    name: 'Demo',
    component: Demo,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/',
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
        path: 'tags',
        name: 'AdminTags',
        component: Admin,
        meta: { tab: 'tags' }
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