import { createRouter, createWebHistory } from 'vue-router'
import SelectionView from '../views/SelectionView.vue'
import TimerView from '../views/TimerView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'selection',
      component: SelectionView,
    },
    {
      path: '/timer',
      name: 'timer',
      // component: () => import('../views/TimerView.vue'),
      component: TimerView,
    },
  ],
})

export default router
