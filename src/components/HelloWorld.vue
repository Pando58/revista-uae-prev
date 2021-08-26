<template>
  <div class="flex flex-col items-center p-10">
    <h1 class="mb-2">
      <b>msg:</b> {{ msg }}
    </h1>
    <button type="button" @click="state.count++" class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
      Count: {{ state.count }}
    </button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>
