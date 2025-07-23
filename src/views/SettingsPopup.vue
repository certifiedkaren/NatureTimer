<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999]"
    @click.self="$emit('close')"
  >
    <div class="bg-black p-6 rounded-xl shadow-xl w-full max-w-md text-black">
      <h2 class="text-white text-xl font-bold mb-4">Settings</h2>
      <h3 class="text-white text-lg">Timer length (minutes)</h3>
      <div class="flex space-x-4">
        <div class="flex flex-col items-center">
          <p class="text-white">Pomodoro</p>
          <input
            type="number"
            class="w-20 px-2 py-1 rounded border-white text-center text-white placeholder-white"
            value="1"
          />
        </div>

        <div class="flex flex-col items-center">
          <p class="text-white">Short</p>
          <input
            type="number"
            class="w-20 px-2 py-1 rounded border-white text-center text-white placeholder-white"
            value="1"
          />
        </div>

        <div class="flex flex-col items-center">
          <p class="text-white">Long</p>
          <input
            type="number"
            class="w-20 px-2 py-1 rounded border-white text-center text-white placeholder-white"
            value="1"
          />
        </div>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          @click="$emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

defineEmits(['close'])
</script>
