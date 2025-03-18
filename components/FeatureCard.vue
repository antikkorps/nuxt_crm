<template>
  <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div
      class="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4"
    >
      <UIcon :name="icon" class="h-6 w-6" />
    </div>
    <h3 class="text-xl font-semibold mb-3">{{ title }}</h3>
    <p class="text-gray-600">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>
