<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-b from-primary-500 to-primary-700 text-white py-20">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div class="lg:w-1/2 space-y-8">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Gérez vos relations client en toute simplicité
            </h1>
            <p class="text-lg md:text-xl opacity-90">
              Augmentez vos ventes et fidélisez vos clients grâce à notre plateforme CRM
              intuitive et puissante.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton size="xl" to="/auth/register" color="white" variant="solid">
                Commencer gratuitement
              </UButton>
              <UButton size="xl" to="/auth/login" color="white" variant="outline">
                Se connecter
              </UButton>
            </div>
          </div>
          <div class="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/images/dashboard-preview.png"
              alt="Dashboard Preview"
              class="rounded-lg shadow-xl"
              onerror="this.src='https://placehold.co/600x400?text=Dashboard+Preview'"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Fonctionnalités principales</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Notre CRM est conçu pour vous aider à gérer efficacement vos contacts et
            entreprises partenaires.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="i-heroicons-users"
            title="Gestion des contacts"
            description="Centralisez toutes les informations de vos contacts et suivez l'historique de vos interactions."
          />
          <FeatureCard
            icon="i-heroicons-building-office"
            title="Gestion des entreprises"
            description="Organisez vos clients par entreprise et gardez une vue d'ensemble sur vos partenaires."
          />
          <FeatureCard
            icon="i-heroicons-chart-bar"
            title="Tableaux de bord"
            description="Visualisez vos performances et prenez des décisions basées sur des données précises."
          />
          <FeatureCard
            icon="i-heroicons-calendar"
            title="Suivi des activités"
            description="Planifiez vos tâches et ne manquez jamais une échéance importante."
          />
          <FeatureCard
            icon="i-heroicons-document-text"
            title="Gestion des notes"
            description="Prenez des notes lors de vos interactions et gardez toutes les informations importantes à portée de main."
          />
          <FeatureCard
            icon="i-heroicons-users-group"
            title="Multi-organisation"
            description="Gérez plusieurs organisations avec une seule plateforme grâce à notre architecture multi-tenant."
          />
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-gray-100">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez comment notre CRM aide des entreprises à se développer.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="Ce CRM a transformé notre façon de gérer nos relations client. Nous avons augmenté nos ventes de 30% en seulement 3 mois."
            author="Marie Dubois"
            position="Directrice Commerciale, Techno Solutions"
          />
          <TestimonialCard
            quote="L'interface intuitive et la flexibilité du système nous ont permis d'adopter rapidement l'outil dans toute notre équipe."
            author="Thomas Martin"
            position="CEO, StartupLab"
          />
          <TestimonialCard
            quote="Le support client est exceptionnel et l'équipe est toujours à l'écoute de nos besoins pour améliorer le produit."
            author="Julie Lefèvre"
            position="Responsable Marketing, GlobalCorp"
          />
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-primary-600 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Prêt à améliorer votre gestion client ?
        </h2>
        <p class="text-lg mb-8 max-w-2xl mx-auto">
          Rejoignez des milliers d'entreprises qui utilisent notre CRM pour développer
          leur activité.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <UButton size="xl" to="/auth/register" color="white" variant="solid">
            Commencer gratuitement
          </UButton>
          <UButton size="xl" to="/auth/demo" color="white" variant="outline">
            Demander une démo
          </UButton>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <LandingFooter />
  </div>
</template>

<script setup>
// Pas besoin d'authentification pour la landing page
definePageMeta({
  auth: false,
})
</script>
