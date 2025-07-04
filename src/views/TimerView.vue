<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const timeLeft = ref(5 * 60)
const timerText = ref('05:00')
let intervalId = null

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

onMounted(() => {
  timerText.value = formatTime(timeLeft.value)

  intervalId = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(intervalId)
      timerText.value = "Time's up!"
      return
    }

    timeLeft.value--
    timerText.value = formatTime(timeLeft.value)
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>

<template>
  <div
    class="relative w-screen h-screen bg-cover bg-center"
    style="background-image: url('/images/dubai-background.jpg')"
  >
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <div
      class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl font-bold text-center"
    >
      {{ timerText }}
    </div>
  </div>
</template>
