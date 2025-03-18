<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Bannière latérale (visible uniquement sur les écrans md et plus grands) -->
    <div
      class="hidden md:flex md:w-1/2 bg-primary-600 flex-col justify-center items-center text-white px-8"
    >
      <div class="max-w-md mx-auto">
        <h1 class="text-4xl font-bold mb-4">CRM Pro</h1>
        <p class="text-xl mb-8 opacity-90">
          Gérez vos relations clients plus efficacement que jamais avec notre solution CRM
          complète.
        </p>
        <div class="bg-white/10 backdrop-blur-md p-6 rounded-xl">
          <div class="flex items-start mb-4">
            <UIcon
              name="i-heroicons-star"
              class="text-yellow-300 h-5 w-5 shrink-0 mt-1 mr-2"
            />
            <p class="italic text-white/90">
              "Ce CRM a transformé notre façon de gérer nos clients. Simple et puissant à
              la fois."
            </p>
          </div>
          <div class="flex items-center">
            <NuxtImg
              src="/images/avatar-testimonial.jpg"
              alt="Client satisfait"
              class="h-10 w-10 rounded-full object-cover mr-3"
              onerror="this.src='https://ui.shadcn.com/avatars/03.png'"
            />
            <div>
              <p class="font-medium">Sophie Martin</p>
              <p class="text-sm opacity-75">Directrice des ventes, InnovaTech</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire de connexion -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
      <div class="w-full max-w-md">
        <div class="text-center mb-8 md:hidden">
          <h1 class="text-2xl font-bold text-primary-600">CRM Pro</h1>
          <p class="text-gray-600">Votre plateforme de gestion client</p>
        </div>

        <LoginForm />

        <div class="text-center mt-8 text-xs text-gray-500">
          <p>
            En vous connectant, vous acceptez nos
            <a href="#" class="underline">Conditions d'utilisation</a> et notre
            <a href="#" class="underline">Politique de confidentialité</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
})

useHead({
  title: "Connexion - CRM Pro",
})
</script>
