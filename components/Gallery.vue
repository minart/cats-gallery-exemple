<template>
  <div class="gallery">
    <div class="paginate">
      <button class="btn" @click="$emit('prev')">
        <i class="fa fa-angle-left"/>
      </button>
    </div>
    <div class="grid" :class="{ 'pair' : this.$route.query.page % 2 === 0 }">
      <template v-if="datas.length">
        <div v-for="cat in datas" :key="cat.id">
          <a :href="cat.wikipedia_url">
            <img :id="cat.id" :src="cat.url" />
            <span v-if="cat.name">{{ cat.name }}</span>
          </a>
        </div>
      </template>
      <template v-else>
        Pas de données
      </template>
      <slot name="bottom"></slot>
    </div>
    <div class="paginate">
      <button class="btn" @click="$emit('next')">
        <i class="fa fa-angle-right"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    datas: Array
  }
}
</script>

<style scoped src="@/css/gallery.css"></style>