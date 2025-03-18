<template>
  <div>
    <!-- Hero Section -->
    <UContainer class="py-20">
      <div class="flex flex-col md:flex-row items-center">
        <div class="md:w-1/2 md:pr-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-primary-600">
            Gérez vos clients en toute simplicité
          </h1>
          <p class="text-lg text-gray-600 mb-8">
            Une solution CRM complète et intuitive pour gérer vos contacts, entreprises et
            opportunités. Boostez votre productivité et améliorez vos relations clients.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <UButton
              size="xl"
              color="primary"
              to="/auth/register"
              icon="i-heroicons-arrow-right-20-solid"
              trailing
            >
              Commencer gratuitement
            </UButton>
            <UButton size="xl" color="neutral" variant="outline" to="/auth/login">
              Se connecter
            </UButton>
          </div>
        </div>
        <div class="md:w-1/2 mt-12 md:mt-0">
          <UCard class="shadow-xl"> image </UCard>
        </div>
      </div>
    </UContainer>

    <!-- Features Section -->
    <div class="bg-gray-50 py-20">
      <UContainer>
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">
            Tout ce dont vous avez besoin pour réussir
          </h2>
          <p class="text-gray-600 max-w-2xl mx-auto">
            Notre CRM multi-tenants offre des fonctionnalités complètes pour gérer
            efficacement vos relations clients.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <div class="p-4 flex items-center">
                <UIcon name="i-heroicons-users" class="text-4xl text-primary-500 mr-4" />
                <h3 class="text-xl font-semibold">Gestion des contacts</h3>
              </div>
            </template>
            <p class="text-gray-600">
              Centralisez toutes les informations de vos clients et prospects. Accédez à
              l'historique complet des interactions et aux détails importants en un clin
              d'œil.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="p-4 flex items-center">
                <UIcon
                  name="i-heroicons-building-office"
                  class="text-4xl text-primary-500 mr-4"
                />
                <h3 class="text-xl font-semibold">Gestion des entreprises</h3>
              </div>
            </template>
            <p class="text-gray-600">
              Suivez vos comptes clients avec toutes les informations pertinentes.
              Visualisez les contacts associés et gérez efficacement les opportunités
              commerciales.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="p-4 flex items-center">
                <UIcon
                  name="i-heroicons-chart-bar"
                  class="text-4xl text-primary-500 mr-4"
                />
                <h3 class="text-xl font-semibold">Tableaux de bord</h3>
              </div>
            </template>
            <p class="text-gray-600">
              Suivez vos performances avec des tableaux de bord personnalisables.
              Visualisez vos KPIs et prenez des décisions éclairées basées sur des données
              réelles.
            </p>
          </UCard>
        </div>
      </UContainer>
    </div>

    <!-- Testimonials Section -->
    <UContainer class="py-20">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Découvrez comment notre CRM aide les entreprises à optimiser leurs relations
          clients.
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <UCard>
          <blockquote class="text-gray-600 italic">
            "Ce CRM a transformé notre approche commerciale. La simplicité d'utilisation
            et l'organisation multi-tenants nous ont permis d'améliorer notre efficacité
            de 40%."
          </blockquote>
          <div class="mt-4 flex items-center">
            <UAvatar src="/api/placeholder/100/100" alt="Marie Dubois" class="mr-3" />
            <div>
              <p class="font-semibold">Marie Dubois</p>
              <p class="text-sm text-gray-500">Directrice Commerciale, Innova</p>
            </div>
          </div>
        </UCard>

        <UCard>
          <blockquote class="text-gray-600 italic">
            "L'organisation des contacts et des entreprises est parfaitement adaptée à nos
            besoins. Le support client est également exceptionnel!"
          </blockquote>
          <div class="mt-4 flex items-center">
            <UAvatar src="/api/placeholder/100/100" alt="Thomas Martin" class="mr-3" />
            <div>
              <p class="font-semibold">Thomas Martin</p>
              <p class="text-sm text-gray-500">PDG, TechSolutions</p>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-primary-500 text-white py-20">
      <UContainer>
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-3xl font-bold mb-4">
            Prêt à transformer vos relations clients?
          </h2>
          <p class="text-xl opacity-90 mb-8">
            Commencez dès aujourd'hui avec notre essai gratuit de 14 jours. Aucune carte
            de crédit requise.
          </p>
          <UButton
            size="xl"
            color="neutral"
            variant="solid"
            to="/auth/register"
            class="bg-white text-primary-500"
          >
            Démarrer votre essai gratuit
          </UButton>
        </div>
      </UContainer>
    </div>

    <!-- Footer -->
    <UContainer class="py-10">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-6 md:mb-0">
          <h3 class="text-xl font-bold text-primary-600">CRM Pro</h3>
          <p class="text-gray-500">© 2025 Tous droits réservés</p>
        </div>
        <div class="flex gap-6">
          <UButton to="/features" variant="ghost" color="neutral">
            Fonctionnalités
          </UButton>
          <UButton to="/pricing" variant="ghost" color="neutral"> Tarifs </UButton>
          <UButton to="/contact" variant="ghost" color="neutral"> Contact </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
