<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 dark:bg-gray-900"
  >
    <div class="w-full max-w-md">
      <UCard
        :ui="{
          base: 'relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80',
          ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
          shadow: 'shadow-xl',
          rounded: 'rounded-xl',
        }"
      >
        <div
          class="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50"
        ></div>

        <div class="space-y-6">
          <div class="text-center">
            <UIcon
              name="i-heroicons-key"
              class="text-primary-500 dark:text-primary-400 h-12 w-12 mx-auto mb-3"
            />
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Mot de passe oublié
            </h2>
            <p class="text-gray-500 dark:text-gray-400 mt-1">
              Entrez votre adresse email pour réinitialiser votre mot de passe
            </p>
          </div>

          <UForm :state="state" @submit="handleSubmit">
            <UFormGroup label="Email" name="email">
              <UInput
                v-model="state.email"
                type="email"
                placeholder="votre@email.com"
                icon="i-heroicons-envelope"
                :ui="{
                  rounded: 'rounded-lg',
                  size: {
                    md: 'py-2.5',
                  },
                }"
              />
            </UFormGroup>

            <div class="mt-6">
              <UButton
                type="submit"
                color="primary"
                block
                :loading="loading"
                :ui="{ rounded: 'rounded-lg', size: { md: 'py-3' } }"
                icon="i-heroicons-envelope"
                trailing
                :disabled="!state.email"
              >
                Envoyer les instructions
              </UButton>
            </div>
          </UForm>

          <div
            v-if="emailSent"
            class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 p-4 rounded-lg text-center"
          >
            Instructions envoyées ! Vérifiez votre boîte de réception.
          </div>

          <div class="text-center pt-2">
            <UButton
              variant="link"
              color="primary"
              to="/auth/login"
              size="sm"
              icon="i-heroicons-arrow-left"
            >
              Retour à la connexion
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
})

useHead({
  title: "Mot de passe oublié - CRM Pro",
})

const loading = ref(false)
const emailSent = ref(false)
const state = reactive({
  email: "",
})

const handleSubmit = async () => {
  loading.value = true

  try {
    // Simulation d'API pour la démonstration
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Ici vous implémenteriez l'appel API réel pour envoyer l'email de réinitialisation
    console.log("Demande de réinitialisation pour:", state.email)

    emailSent.value = true
  } catch (error) {
    console.error("Erreur:", error)
  } finally {
    loading.value = false
  }
}
</script>
