<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Page non trouvée</h1>
    <h1 v-else>Erreur</h1>
    <NuxtLink to="/">Retour</NuxtLink>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>