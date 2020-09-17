<template>
  <div class="gallery">
    <div class="paginate">
      <nuxt-link v-if="current_page > 1" :to="{ path: '', query : { page : +current_page - 1 }}">
        <i class="fa fa-angle-left"/>
      </nuxt-link>
    </div>
    <div class="grid" :class="isPair">
      <template v-if="!$fetchState.pending">
        <div v-for="cat in cats" :key="cat.id">
          <a v-if="cat.breeds[0] && cat.breeds[0].wikipedia_url" :href="cat.breeds[0].wikipedia_url">
            <img :id="cat.id" :src="cat.url" />
            <span v-if="cat.breeds[0]">{{ cat.breeds[0].name }}</span>
          </a>
        </div>
        <div class="nodata" v-if="!cats.length">
          No datas find ....
        </div>
        <div class="pagination">
          <Pagination :max="total_page" :current="current_page" :range="paginationRange" />
        </div>
      </template>
      <template v-else>
        <div class="preload-grid" v-for="i in limit" :key="i">
          <div> Loading data ... </div>
        </div>
        <div></div>
      </template>
    </div>
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
  props: {
    'pagination-range' : Number
  },
  data() {
    return {
      cats: [],
      limit: 12,
      total_page: 0,
      current_page: 1
    }
  },
  computed: {
      isPair(){
        return (this.$route.query.page % 2 === 0) ? 'pair' : false;
      }
  },
  watch: {
    '$route.query' : async function(){
        this.$nuxt.$loading.start();
        await this.$fetch();
        console.log(this.current_page);
        this.$nuxt.$loading.finish();
    },
  },
  async fetch() {
    const query = {
      limit: this.limit,
      mime_types: 'jpg, png, gif',
      size: 'full',
      has_breeds: 1,
      order: 'ASC',
      page: this.$route.query.page || 1
    };
    axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
    try {
      const { data, headers } = await axios.get(`${process.env.URL_API}images/search`, { params: query });
      this.cats = data;
      this.total_page = +headers['pagination-count'];
      this.current_page = +headers['pagination-page'];
    } catch (e) {
      console.log('error', e);
    }
  }
}
</script>

<style scoped src="@/css/gallery.css"></style>