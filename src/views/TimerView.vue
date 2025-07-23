<script setup>
import { ref } from 'vue'
import SettingsPopup from './SettingsPopup.vue'
import { usePomodoroStore } from '@/stores/pomodoroStore'
import bellSound from '/sounds/bell_sound.mp3'

const settingsActive = ref(false)
const activeMode = ref('pomodoro')
const pomodoro = usePomodoroStore()
const bellAudio = new Audio(bellSound)

function selectMode(mode) {
  activeMode.value = mode

  if (mode === 'pomodoro') timeLeft.value = pomodoro.focusLength * 60
  if (mode === 'short') timeLeft.value = pomodoro.shortBreakLength * 60
  if (mode === 'long') timeLeft.value = pomodoro.longBreakLength * 60

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
      bellAudio.play()
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
            'px-4 py-2 rounded-2xl border transition duration-200 cursor-pointer',
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
            'px-4 py-2 rounded-2xl border transition duration-200 cursor-pointer',
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
            'px-4 py-2 rounded-2xl border transition duration-200 cursor-pointer',
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

      <div class="flex items-center space-x-4">
        <button
          @click="handleClick"
          class="bg-white py-4 px-8 rounded-xl text-black text-sm hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          {{ isRunning ? 'Pause' : 'Start' }}
        </button>

        <button class="cursor-pointer" @click="settingsActive = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>
      <SettingsPopup v-if="settingsActive" @close="settingsActive = false" />
    </div>
  </div>
</template>
