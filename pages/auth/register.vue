<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <RegisterForm />
  </div>
</template>

<script setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/",
  },
})
</script>
