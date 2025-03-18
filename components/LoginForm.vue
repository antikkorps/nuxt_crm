<template>
  <div class="w-full max-w-md mx-auto">
    <UCard>
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-center">Connexion</h2>
        <UForm :state="state" @submit="handleLogin">
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="votre@email.com"
              autocomplete="email"
            />
          </UFormGroup>
          <UFormGroup label="Mot de passe" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Votre mot de passe"
              autocomplete="current-password"
            />
          </UFormGroup>
          <UFormGroup label="Organisation" name="tenantId">
            <USelect
              v-model="state.tenantId"
              :options="tenants"
              option-attribute="name"
              value-attribute="id"
              placeholder="Sélectionnez votre organisation"
            />
          </UFormGroup>
          <div class="mt-6">
            <UButton type="submit" color="primary" block :loading="loading">
              Se connecter
            </UButton>
          </div>
        </UForm>
        <div class="text-center mt-4">
          <NuxtLink to="/auth/register" class="text-sm text-primary-600 hover:underline">
            Pas encore de compte ? S'inscrire
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { useAuth } from "#imports"

const auth = useAuth()
const router = useRouter()
const loading = ref(false)
const tenants = ref([])
const state = reactive({
  email: "",
  password: "",
  tenantId: "",
})

// Charger les organisations disponibles
onMounted(async () => {
  try {
    const fetchedTenants = await $fetch("/api/tenants")
    tenants.value = fetchedTenants
  } catch (error) {
    console.error("Erreur lors du chargement des organisations:", error)
  }
})

const handleLogin = async () => {
  loading.value = true
  try {
    await auth.signIn("credentials", {
      email: state.email,
      password: state.password,
      tenantId: state.tenantId,
      callbackUrl: "/",
    })
    router.push("/")
  } catch (error) {
    console.error("Erreur de connexion:", error)
  } finally {
    loading.value = false
  }
}
</script>
