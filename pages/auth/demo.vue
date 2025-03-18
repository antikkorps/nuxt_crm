<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-md mx-auto">
      <UCard>
        <div class="space-y-6">
          <div class="text-center">
            <h1 class="text-2xl font-bold mb-2">Demandez une démo</h1>
            <p class="text-gray-600">
              Laissez-nous vos coordonnées et un expert vous contactera pour vous
              présenter notre CRM.
            </p>
          </div>

          <UForm :state="state" @submit="handleSubmit">
            <UFormGroup label="Nom" name="name">
              <UInput v-model="state.name" placeholder="Votre nom complet" />
            </UFormGroup>

            <UFormGroup label="Email professionnel" name="email">
              <UInput
                v-model="state.email"
                type="email"
                placeholder="vous@entreprise.com"
              />
            </UFormGroup>

            <UFormGroup label="Entreprise" name="company">
              <UInput v-model="state.company" placeholder="Nom de votre entreprise" />
            </UFormGroup>

            <UFormGroup label="Poste" name="position">
              <UInput
                v-model="state.position"
                placeholder="Votre poste dans l'entreprise"
              />
            </UFormGroup>

            <UFormGroup label="Téléphone" name="phone">
              <UInput v-model="state.phone" placeholder="Votre numéro de téléphone" />
            </UFormGroup>

            <UFormGroup label="Message (optionnel)" name="message">
              <UTextarea
                v-model="state.message"
                placeholder="Parlez-nous de vos besoins spécifiques"
                rows="4"
              />
            </UFormGroup>

            <div class="mt-6">
              <UButton type="submit" color="primary" block :loading="loading">
                Demander une démo
              </UButton>
            </div>
          </UForm>

          <div
            v-if="submitted"
            class="bg-green-50 text-green-700 p-3 rounded text-center"
          >
            Merci pour votre demande ! Notre équipe vous contactera rapidement.
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  auth: false,
})

const loading = ref(false)
const submitted = ref(false)
const state = reactive({
  name: "",
  email: "",
  company: "",
  position: "",
  phone: "",
  message: "",
})

const handleSubmit = async () => {
  loading.value = true

  // Simulation d'envoi de formulaire - à remplacer par votre logique d'API
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Ici vous pouvez ajouter votre logique pour envoyer le formulaire à votre API
  console.log("Formulaire soumis:", state)

  submitted.value = true
  loading.value = false
}
</script>
