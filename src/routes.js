import { createRouter, createWebHashHistory } from 'vue-router';

const routers = [
  {
    path: '/',
    component: () => import('./pages/home/index')
  },
  {
    path: '/cafeteria',
    component: () => import('./pages/cafeteria/index')
  },
  {
    path: '/fruit',
    component: () => import('./pages/fruit/index')
  },
  {
    path: '/particle',
    component: () => import('./pages/particle/index')
  },
  // {
  //   path: '/watermelon',
  //   component: () => import('./pages/watermelon/index')
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
});

export default router;