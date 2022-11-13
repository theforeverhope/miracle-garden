import { createRouter, createWebHashHistory } from 'vue-router';

const routers = [
  {
    path: '/',
    component: () => import('./pages/home/index')
  },
  {
    path: '/cafeteria',
    component: () => import('./pages/midnight-cafeteria/index')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers
});

export default router;