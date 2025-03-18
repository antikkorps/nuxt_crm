<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Tableau de bord</h1>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Contacts</h3>
            <UIcon name="i-heroicons-users" class="w-5 h-5 text-primary-500" />
          </div>
        </template>
        <p class="text-3xl font-bold">{{ stats.contacts || 0 }}</p>
        <p class="text-gray-500 text-sm">Total des contacts</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Entreprises</h3>
            <UIcon name="i-heroicons-building-office" class="w-5 h-5 text-primary-500" />
          </div>
        </template>
        <p class="text-3xl font-bold">{{ stats.companies || 0 }}</p>
        <p class="text-gray-500 text-sm">Total des entreprises</p>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Notes</h3>
            <UIcon name="i-heroicons-document-text" class="w-5 h-5 text-primary-500" />
          </div>
        </template>
        <p class="text-3xl font-bold">{{ stats.notes || 0 }}</p>
        <p class="text-gray-500 text-sm">Total des notes</p>
      </UCard>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-2">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Statuts des contacts</h3>
          </div>
        </template>
        <p class="text-gray-500 mb-4">Distribution des contacts par statut</p>
        <div v-if="!stats.contactStatuses?.length" class="py-8 text-center text-gray-500">
          Aucune donnée disponible
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="status in stats.contactStatuses"
            :key="status.id"
            class="flex items-center"
          >
            <div
              class="w-3 h-3 rounded-full mr-2"
              :style="{ backgroundColor: status.color || '#cbd5e1' }"
            ></div>
            <div class="flex-1">{{ status.name }}</div>
            <div class="font-medium">{{ status.count }}</div>
          </div>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium">Activité récente</h3>
          </div>
        </template>
        <p class="text-gray-500 mb-4">Dernières actions dans votre CRM</p>
        <div v-if="!stats.recentActivity?.length" class="py-8 text-center text-gray-500">
          Aucune activité récente
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="(activity, index) in stats.recentActivity"
            :key="index"
            class="flex items-start"
          >
            <div class="mt-1 mr-3 p-1 rounded-full bg-gray-100">
              <UIcon :name="activityIcon(activity.type)" class="w-4 h-4 text-gray-700" />
            </div>
            <div class="flex-1">
              <div class="text-sm font-medium">{{ activity.title }}</div>
              <div class="text-xs text-gray-500">{{ formatDate(activity.date) }}</div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns"
import { fr } from "date-fns/locale"

definePageMeta({
  auth: {
    authenticated: true,
  },
})

// Données de démonstration (à remplacer par des appels API réels)
const stats = reactive({
  contacts: 125,
  companies: 48,
  notes: 273,
  contactStatuses: [
    { id: 1, name: "Nouveau", count: 32, color: "#3B82F6" },
    { id: 2, name: "En contact", count: 45, color: "#10B981" },
    { id: 3, name: "Qualifié", count: 28, color: "#F59E0B" },
    { id: 4, name: "Inactif", count: 20, color: "#6B7280" },
  ],
  recentActivity: [
    {
      type: "contact",
      title: "Contact ajouté : Marie Dupont",
      date: new Date(2023, 5, 12),
    },
    {
      type: "company",
      title: "Entreprise mise à jour : TechSolutions",
      date: new Date(2023, 5, 11),
    },
    { type: "note", title: "Note ajoutée pour Jean Martin", date: new Date(2023, 5, 10) },
    {
      type: "contact",
      title: "Contact mis à jour : Paul Leblanc",
      date: new Date(2023, 5, 9),
    },
    {
      type: "company",
      title: "Entreprise ajoutée : Innovate Corp",
      date: new Date(2023, 5, 8),
    },
  ],
})

// Déterminer l'icône en fonction du type d'activité
const activityIcon = (type) => {
  switch (type) {
    case "contact":
      return "i-heroicons-user"
    case "company":
      return "i-heroicons-building-office"
    case "note":
      return "i-heroicons-document-text"
    default:
      return "i-heroicons-bell"
  }
}

// Formater les dates
const formatDate = (date) => {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr })
}
</script>
