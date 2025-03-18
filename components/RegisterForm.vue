<template>
  <div class="w-full max-w-md mx-auto">
    <UCard>
      <div class="space-y-6">
        <h2 class="text-2xl font-bold text-center">Inscription</h2>
        <UForm :state="state" @submit="handleRegister">
          <UFormGroup label="Prénom" name="firstName">
            <UInput
              v-model="state.firstName"
              placeholder="Votre prénom"
              autocomplete="given-name"
            />
          </UFormGroup>
          <UFormGroup label="Nom" name="lastName">
            <UInput
              v-model="state.lastName"
              placeholder="Votre nom"
              autocomplete="family-name"
            />
          </UFormGroup>
          <UFormGroup label="Email" name="email">
            <UInput
              v-model="state.email"
              type="email"
              placeholder="votre@email.com"
              autocomplete="email"
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
          <UFormGroup label="Mot de passe" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="Votre mot de passe"
              autocomplete="new-password"
            />
          </UFormGroup>
          <UFormGroup label="Confirmer le mot de passe" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              type="password"
              placeholder="Confirmer votre mot de passe"
              autocomplete="new-password"
            />
          </UFormGroup>
          <div class="mt-6">
            <UButton type="submit" color="primary" block :loading="loading">
              S'inscrire
            </UButton>
          </div>
        </UForm>
        <div class="text-center mt-4">
          <NuxtLink to="/auth/login" class="text-sm text-primary-600 hover:underline">
            Déjà un compte ? Se connecter
          </NuxtLink>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const router = useRouter()
const loading = ref(false)
const tenants = ref([])

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
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

const handleRegister = async () => {
  if (state.password !== state.confirmPassword) {
    return alert("Les mots de passe ne correspondent pas")
  }

  loading.value = true
  try {
    await $fetch("/api/auth/register", {
      method: "POST",
      body: {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        tenantId: state.tenantId,
      },
    })

    // Si l'inscription réussit, redirigez vers la page de connexion
    router.push("/auth/login")
  } catch (error) {
    console.error("Erreur d'inscription:", error)
  } finally {
    loading.value = false
  }
}
</script>
