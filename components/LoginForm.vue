<template>
  <UCard
    :ui="{
      base: 'relative overflow-hidden backdrop-blur-xl bg-white/80 dark:bg-gray-900/80',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      shadow: 'shadow-xl',
      rounded: 'rounded-xl',
    }"
    class="w-full max-w-md mx-auto"
  >
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800/50 dark:to-gray-900/50 -z-10 opacity-50"
    />
    <div
      class="absolute -top-24 -right-24 w-64 h-64 bg-primary-200 dark:bg-primary-900/20 rounded-full blur-3xl -z-10 opacity-30"
    />
    <div
      class="absolute -bottom-24 -left-24 w-64 h-64 bg-primary-300 dark:bg-primary-800/20 rounded-full blur-3xl -z-10 opacity-30"
    />

    <div class="space-y-8">
      <div class="text-center">
        <div
          class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 mb-3"
        >
          <UIcon
            name="i-heroicons-lock-closed"
            class="text-primary-500 dark:text-primary-400 h-8 w-8"
          />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
          Bon retour parmi nous
        </h2>
        <p class="text-gray-500 dark:text-gray-400">
          Connectez-vous pour accéder à votre espace
        </p>
      </div>

      <UForm :state="state" @submit="handleLogin">
        <div class="space-y-6">
          <UFormGroup>
            <UInput
              v-model="state.email"
              type="email"
              placeholder="Email"
              autocomplete="email"
              icon="i-heroicons-envelope"
              size="lg"
              :ui="{
                base: 'relative block w-full transition duration-100 focus-within:z-10',
                rounded: 'rounded-xl',
                icon: {
                  base: 'text-gray-400',
                },
                padding: {
                  lg: 'py-3 pl-12 pr-4',
                },
              }"
            />
          </UFormGroup>

          <UFormGroup>
            <UInputGroup>
              <UInput
                v-model="state.password"
                :type="passwordVisible ? 'text' : 'password'"
                placeholder="Mot de passe"
                autocomplete="current-password"
                icon="i-heroicons-lock-closed"
                size="lg"
                :ui="{
                  base: 'relative block w-full transition duration-100 focus-within:z-10',
                  rounded: 'rounded-xl',
                  icon: {
                    base: 'text-gray-400',
                  },
                  padding: {
                    lg: 'py-3 pl-12 pr-12',
                  },
                }"
              />
              <template #append>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon
                  class="absolute right-0 top-0 bottom-0 z-10"
                  :padded="false"
                  @click="passwordVisible = !passwordVisible"
                >
                  <UIcon
                    :name="passwordVisible ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                    class="h-5 w-5 text-gray-500"
                  />
                </UButton>
              </template>
            </UInputGroup>
          </UFormGroup>

          <div class="flex items-center justify-between mt-1">
            <UCheckbox
              v-model="rememberMe"
              name="remember"
              label="Se souvenir de moi"
              class="text-sm"
            />
            <UButton
              variant="link"
              to="/auth/forgot-password"
              size="sm"
              class="text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
            >
              Mot de passe oublié?
            </UButton>
          </div>
        </div>

        <div class="mt-8">
          <UButton
            type="submit"
            color="primary"
            block
            :loading="loading"
            :ui="{
              rounded: 'rounded-xl',
              size: {
                lg: 'text-base py-3.5',
              },
            }"
            size="lg"
          >
            <span class="font-medium">Se connecter</span>
          </UButton>
        </div>
      </UForm>

      <div>
        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white dark:bg-gray-900 px-4 text-sm text-gray-500">
              ou continuer avec
            </span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mt-4">
          <UButton
            color="white"
            variant="outline"
            block
            :ui="{
              rounded: 'rounded-xl',
              padding: {
                lg: 'py-3',
              },
              shadow: 'shadow-sm',
            }"
            size="lg"
            class="flex items-center justify-center gap-2"
          >
            <UIcon name="i-simple-icons-google" class="h-5 w-5" />
            <span>Google</span>
          </UButton>
          <UButton
            color="white"
            variant="outline"
            block
            :ui="{
              rounded: 'rounded-xl',
              padding: {
                lg: 'py-3',
              },
              shadow: 'shadow-sm',
            }"
            size="lg"
            class="flex items-center justify-center gap-2"
          >
            <UIcon name="i-simple-icons-apple" class="h-5 w-5" />
            <span>Apple</span>
          </UButton>
        </div>
      </div>

      <div class="text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Pas encore de compte?
          <NuxtLink
            to="/auth/register"
            class="text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600"
          >
            Créer un compte
          </NuxtLink>
        </p>
      </div>
    </div>
  </UCard>
</template>

<script setup>
const { $toast } = useNuxtApp()
const router = useRouter()
const loading = ref(false)
const passwordVisible = ref(false)
const rememberMe = ref(false)

const state = reactive({
  email: "",
  password: "",
})

// Récupérer l'email enregistré si "Se souvenir de moi" a été coché
onMounted(() => {
  const savedEmail = localStorage.getItem("crm_email")
  if (savedEmail) {
    state.email = savedEmail
    rememberMe.value = true
  }
})

const handleLogin = async () => {
  if (!state.email || !state.password) {
    $toast.add({
      title: "Erreur",
      description: "Veuillez remplir tous les champs",
      color: "red",
      icon: "i-heroicons-exclamation-triangle",
    })
    return
  }

  loading.value = true

  try {
    // Stocker l'email si "Se souvenir de moi" est coché
    if (rememberMe.value) {
      localStorage.setItem("crm_email", state.email)
    } else {
      localStorage.removeItem("crm_email")
    }

    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulation d'API pour la démo

    // Ici, nous simulons juste une connexion réussie car nous n'avons plus besoin de tenantId
    // Dans une implémentation réelle, vous utiliseriez votre logique d'authentification

    // Redirection vers le tableau de bord
    router.push("/dashboard")
  } catch (error) {
    console.error("Erreur de connexion:", error)
    $toast.add({
      title: "Échec de connexion",
      description: "Identifiants incorrects. Veuillez réessayer.",
      color: "red",
      icon: "i-heroicons-exclamation-triangle",
    })
  } finally {
    loading.value = false
  }
}
</script>
