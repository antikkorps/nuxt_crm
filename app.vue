<template>
  <UApp>
    <NuxtLayout>
      <NuxtLoadingIndicator color="primary" />
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup>
// Définir un thème de couleur pour l'application
const appConfig = useAppConfig()
appConfig.ui = appConfig.ui || {}
appConfig.ui.primary = "indigo"
appConfig.ui.gray = "slate"
</script>
