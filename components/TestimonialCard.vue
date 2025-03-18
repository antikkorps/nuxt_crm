<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="text-primary-600 mb-4">
      <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="h-8 w-8" />
    </div>
    <blockquote class="text-gray-700 mb-4 italic">"{{ quote }}"</blockquote>
    <div class="flex items-center">
      <div
        class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-3"
      >
        <UIcon name="i-heroicons-user" class="h-6 w-6 text-gray-600" />
      </div>
      <div>
        <div class="font-medium text-gray-900">{{ author }}</div>
        <div class="text-gray-600 text-sm">{{ position }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  quote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
})
</script>
