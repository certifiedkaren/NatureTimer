<script setup>
import { ref } from 'vue'
import SettingsPopup from './SettingsPopup.vue'
import { usePomodoroStore } from '@/stores/pomodoroStore'
import bellSound from '/sounds/bell_sound.mp3'

const settingsActive = ref(false)
const showMusic = ref(false)
const activeMode = ref('pomodoro')
const pomodoro = usePomodoroStore()
const bellAudio = new Audio(bellSound)
const videoUrl = ref('')
const videoUrlInput = ref('')

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
      document.title = 'Pomodoro Timer'
      bellAudio.play()
      isRunning.value = false
      return
    }

    timeLeft.value--
    timerText.value = formatTime(timeLeft.value)
    document.title = `${formatTime(timeLeft.value)}`
  }, 1000)
}

function pauseTimer() {
  clearInterval(intervalId)
  intervalId = null
  document.title = 'Pomodoro Timer'
}

function resetTimer() {
  clearInterval(intervalId)
  intervalId = null
  isRunning.value = false

  if (activeMode.value === 'pomodoro') {
    timeLeft.value = pomodoro.focusLength * 60
  } else if (activeMode.value === 'short') {
    timeLeft.value = pomodoro.shortBreakLength * 60
  } else if (activeMode.value === 'long') {
    timeLeft.value = pomodoro.longBreakLength * 60
  }

  document.title = 'Pomodoro Timer'
  timerText.value = formatTime(timeLeft.value)
}

function handleClick() {
  if (isRunning.value) {
    pauseTimer()
  } else {
    startTimer()
  }
  isRunning.value = !isRunning.value
}

function handleSettingsClose() {
  settingsActive.value = false

  if (activeMode.value === 'pomodoro') {
    timeLeft.value = pomodoro.focusLength * 60
  } else if (activeMode.value === 'short') {
    timeLeft.value = pomodoro.shortBreakLength * 60
  } else if (activeMode.value === 'long') {
    timeLeft.value = pomodoro.longBreakLength * 60
  }
  timerText.value = formatTime(timeLeft.value)
}

function getVideoUrl() {
  // const newUrl = videoUrlInput.split('=', 2)[1]
  // const finalUrl = newUrl.includes('&') ? newUrl.split('&')[0] : newUrl
  // videoUrl.value = finalUrl
  const url = videoUrlInput.value
  const regex = /(?:youtube\.com\/(?:.*v=|.*\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regex)
  videoUrl.value = match ? match[1] : ''
  videoUrlInput.value = ''
}
</script>

<template>
  <div
    class="relative w-screen h-screen bg-cover bg-center"
    style="background-image: url('/images/lake-aurora.jpg')"
  >
    <div class="absolute inset-0 bg-black/20 z-0"></div>

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

        <button class="cursor-pointer" @click="resetTimer">
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
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <SettingsPopup :show="settingsActive" @close="handleSettingsClose" />
    </div>

    <div class="absolute bottom-5 left-10 z-10 text-white flex flex-col items-center">
      <div v-show="showMusic" class="mb-4 bg-black/70 p-4 rounded-lg">
        <div class="flex items-center space-x-4 mb-2">
          <p class="text-md font-bold whitespace-nowrap">Music</p>
          <input
            v-model="videoUrlInput"
            type="text"
            placeholder="URL from YT"
            class="w-64 px-2 py-1 rounded-lg bg-black border border-white/10 text-center"
          />
          <button class="cursor-pointer text-gray-600 hover:text-white/80">
            <svg
              @click="getVideoUrl"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </button>
        </div>
        <iframe
          width="315"
          height="215"
          :src="'https://www.youtube.com/embed/' + videoUrl"
          class="rounded-lg"
        >
        </iframe>
      </div>

      <button
        class="cursor-pointer p-2 bg-black/40 rounded-lg hover:bg-black/70"
        @click="showMusic = !showMusic"
      >
        <svg
          v-if="!showMusic"
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
            d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
          />
        </svg>
      </button>
      <button class="cursor-pointer p-2 bg-black/70 rounded-lg" @click="showMusic = !showMusic">
        <svg
          v-if="showMusic"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
