<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 class="text-xl font-semibold mb-4">CRM Platform</h3>
          <p class="text-gray-400 mb-4">
            La solution complète pour gérer vos relations client efficacement.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white">
              <UIcon name="i-simple-icons-twitter" class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <UIcon name="i-simple-icons-facebook" class="h-5 w-5" />
            </a>
            <a href="#" class="text-gray-400 hover:text-white">
              <UIcon name="i-simple-icons-linkedin" class="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Produit</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-white">Fonctionnalités</a>
            </li>
            <li><a href="#" class="text-gray-400 hover:text-white">Tarifs</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Démo</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Ressources</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">Blog</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Documentation</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Guides</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Webinaires</a></li>
          </ul>
        </div>

        <div>
          <h3 class="text-lg font-semibold mb-4">Entreprise</h3>
          <ul class="space-y-2">
            <li><a href="#" class="text-gray-400 hover:text-white">À propos</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Contact</a></li>
            <li><a href="#" class="text-gray-400 hover:text-white">Carrières</a></li>
            <li>
              <a href="#" class="text-gray-400 hover:text-white">Mentions légales</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-700 pt-8 mt-8 text-gray-400 text-sm text-center">
        <p>&copy; {{ new Date().getFullYear() }} CRM Platform. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>
