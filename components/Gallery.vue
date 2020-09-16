<template>
  <div class="gallery">
    <div class="paginate">
      <nuxt-link v-if="current_page > 1" :to="{ path: '', query : { page : +current_page - 1 }}">
        <i class="fa fa-angle-left"/>
      </nuxt-link>
    </div>
    <div class="grid" v-if="!$fetchState.pending">
      <div v-for="cat in cats" :key="cat.id">
        <a v-if="cat.breeds[0] && cat.breeds[0].wikipedia_url" :href="cat.breeds[0].wikipedia_url">
          <img :id="cat.id" :src="cat.url" />
          <span v-if="cat.breeds[0]">{{ cat.breeds[0].name }}</span>
        </a>
      </div>
    </div>
    <div class="grid" v-else-if="$fetchState.error"><p>{{ $fetchState.error.message }}</p></div>
    <div class="grid" v-else><div class="preload-grid" v-for="i in limit" :key="i">Loading data ...</div></div>
    <div class="paginate">
      <nuxt-link v-if="current_page < total_page" :to="{ path: '', query : { page : +current_page + 1 }}">
        <i class="fa fa-angle-right"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cats: [],
      limit: 12,
      total_page: 0,
      current_page: 1
    }
  },
  watch: {
    '$route.query' : async function(){
        this.$nuxt.$loading.start();
        await this.$fetch();
        this.$nuxt.$loading.finish();
    },
  },
  async fetch() {
    const query = {
      limit: this.limit,
      has_breeds: 1,
      order: 'Asc',
      page: this.$route.query.page || 1
    };
    axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
    try {
      const { data, headers } = await axios.get(`${process.env.URL_API}images/search`, { params: query });
      this.cats = data;
      this.total_page = headers['pagination-count'];
      this.current_page = headers['pagination-page'];
    } catch (e) {
      console.log('error', e);
    }
  }
}
</script>

<style scoped src="@/css/gallery.css"></style>