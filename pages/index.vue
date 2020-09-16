<template>
  <div class="landing">
    <h1>Jellynote test gallery</h1>
    <nuxt-link :to="{ name : 'gallery-page', params : { page: 1 } }">Gallerie component</nuxt-link>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .landing {  width: 300px; margin: 0 auto; }
</style>