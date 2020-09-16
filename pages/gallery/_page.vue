<template>
  <div>
    <div class="grid">
      <div 
        v-for="cat in cats" 
        :key="cat.id">
        <a v-if="cat.breeds[0] && cat.breeds[0].wikipedia_url" :href="cat.breeds[0].wikipedia_url">
          <img :id="cat.id" :src="cat.url" />
          <span v-if="cat.breeds[0]">{{ cat.breeds[0].name }}</span>
        </a>
      </div>
    </div>
    <nuxt-link v-if="current_page > 1" :to="{ name: 'gallery-page', params : { page : +current_page - 1 }}">prev</nuxt-link>
    <nuxt-link :to="{ name: 'gallery-page', params : { page : +current_page + 1 }}">next</nuxt-link>
    <p>Total : {{total_page}}</p>{{current_page}}
  </div>
</template>

<script>

import axios from 'axios';

export default {
  
  mounted(){
  },

  data(){
    return {
      cats : [],
      total_page : 0,
      current_page : 1
    }
  },

  async fetch() {
    const query = {
        limit : 50,
        has_breeds: 1,
        order : 'Asc',
        page : this.$route.params['page'] || 1
    };
    axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
    try {
      const { data, headers} = await axios.get(`${process.env.URL_API}images/search`, { params: query });
      this.cats = data;
      this.total_page = headers['pagination-count'];
      this.current_page = headers['pagination-page'];
    } catch(e) {
      console.log('error', e);
    }
  }

}
</script>

<style scoped>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .grid { 
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    grid-gap: 1px;
  }
  .grid > div {
    position: relative;
  } 
  .grid img {
    align-self: stretch;
    justify-self: stretch;
    object-fit: cover;
    object-position: center center;
    width: 100%;
    height: 100%;
  }
  .grid span {
    position: absolute;
    padding: 10px;
    opacity: .9;
    box-sizing: border-box;
    background-color: #000;
    width: 100%;
    bottom: 0;
    color: #fff;
    left: 0;
  }
</style>