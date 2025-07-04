<script setup>
import { ref } from 'vue'

const activeMode = ref('pomodoro')

function selectMode(mode) {
  activeMode.value = mode

  if (mode === 'pomodoro') timeLeft.value = 25 * 60
  if (mode === 'short') timeLeft.value = 5 * 60
  if (mode === 'long') timeLeft.value = 15 * 60

  timerText.value = formatTime(timeLeft.value)
  isRunning.value = false
  pauseTimer()
}

const timeLeft = ref(25 * 60)
const timerText = ref(formatTime(timeLeft.value))
const isRunning = ref(false)
let intervalId = null

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function startTimer() {
  if (intervalId !== null) return
  timerText.value = formatTime(timeLeft.value)

  intervalId = setInterval(() => {
    if (timeLeft.value <= 0) {
      clearInterval(intervalId)
      timerText.value = "Time's up!"
      isRunning.value = false
      return
    }

    timeLeft.value--
    timerText.value = formatTime(timeLeft.value)
  }, 1000)
}

function pauseTimer() {
  clearInterval(intervalId)
  intervalId = null
}

function handleClick() {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
  isRunning.value = !isRunning.value
}
</script>

<template>
  <div
    class="relative w-screen h-screen bg-cover bg-center"
    style="background-image: url('/images/dubai-background.jpg')"
  >
    <div class="absolute inset-0 bg-black/40 z-0"></div>

    <div
      class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center flex flex-col items-center space-y-6"
    >
      <div class="flex space-x-4">
        <button
          @click="selectMode('pomodoro')"
          :class="[
            'px-4 py-2 rounded-2xl border transition duration-200',
            activeMode === 'pomodoro'
              ? 'bg-white text-black'
              : 'bg-transparent text-white border-white hover:bg-white hover:text-black',
          ]"
        >
          Pomodoro
        </button>

        <button
          @click="selectMode('short')"
          :class="[
            'px-4 py-2 rounded-2xl border transition duration-200',
            activeMode === 'short'
              ? 'bg-white text-black'
              : 'bg-transparent text-white border-white hover:bg-white hover:text-black',
          ]"
        >
          Short Break
        </button>

        <button
          @click="selectMode('long')"
          :class="[
            'px-4 py-2 rounded-2xl border transition duration-200',
            activeMode === 'long'
              ? 'bg-white text-black'
              : 'bg-transparent text-white border-white hover:bg-white hover:text-black',
          ]"
        >
          Long Break
        </button>
      </div>

      <div class="text-8xl font-bold">
        {{ timerText }}
      </div>

      <button
        @click="handleClick"
        class="bg-white py-4 px-8 rounded-xl text-black text-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
      >
        {{ isRunning ? 'Pause' : 'Start' }}
      </button>
    </div>
  </div>
</template>
