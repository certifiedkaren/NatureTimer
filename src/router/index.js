import { createRouter, createWebHistory } from 'vue-router'
import SelectionView from '../views/SelectionView.vue'
import TimerView from '../views/TimerView.vue'
import SettingsPopup from '../views/SettingsPopup.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'timer',
      component: TimerView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsPopup,
    },
  ],
})

export default router
