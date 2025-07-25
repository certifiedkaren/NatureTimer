<script setup>
import { usePomodoroStore } from '@/stores/pomodoroStore'

const pomodoro = usePomodoroStore()

const props = defineProps({
  show: Boolean,
})

defineEmits(['close'])
</script>
<!-- TODO: Make background selector -->
<template>
  <Transition name="slide-down">
    <div class="fixed inset-0 flex items-center justify-center z-[9999] px-4" v-if="props.show">
      <div
        class="bg-black/90 backdrop-blur-sm p-8 rounded-2xl w-full max-w-md transform origin-top"
      >
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-white text-2xl font-bold">Settings</h2>
          <button class="text-white/60 hover:text-white transition-colors" @click="$emit('close')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <h3 class="text-white/80 text-sm font-medium uppercase tracking-wider">
            Timer Duration (minutes)
          </h3>

          <div class="grid grid-cols-3 gap-6">
            <div class="space-y-2">
              <p class="text-white/60 text-sm">Pomodoro</p>
              <input
                type="number"
                class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                v-model="pomodoro.focusLength"
              />
            </div>

            <div class="space-y-2">
              <p class="text-white/60 text-sm">Short Break</p>
              <input
                type="number"
                class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                v-model="pomodoro.shortBreakLength"
              />
            </div>

            <div class="space-y-2">
              <p class="text-white/60 text-sm">Long Break</p>
              <input
                type="number"
                class="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                v-model="pomodoro.longBreakLength"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
