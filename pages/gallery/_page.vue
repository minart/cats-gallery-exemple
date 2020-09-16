<template>
  <div>
    {{$fetchState}}
    <ul>
      <li v-for="cat in cats" :key="cat.id">
        <img :id="cat.id" width="100px" :src="cat.url" />
        <p v-if="cat.breeds[0]">{{ cat.breeds[0].name }} - {{ cat.breeds[0].wikipedia_url }}</p>
      </li>
    </ul>
    <button @click="$fetch">Refresh</button>
    <nuxt-link v-if="current_page > 1" :to="{ name: 'gallery-page', params : { page : +current_page - 1 }}">prev</nuxt-link>
    <nuxt-link :to="{ name: 'gallery-page', params : { page : +current_page + 1 }}">next</nuxt-link>
    <p>Total : {{total_page}}</p>{{current_page}}
  </div>
</template>

<script>

import axios from 'axios';

export default {
  
  mounted(){
    console.log(this.$route);
  },
  watch: {
    '$route.query': '$fetch'
  },
  data(){
    return {
      cats : [],
      total_page : 0,
      current_page : 1
    }
  },

  methods: {
      prev(){
          console.log('prev');
      },
      next(){
          console.log('next');
      }
  },

  async fetch() {
    const query = {
        limit : 20,
        has_breeds: 1,
        order : 'Asc',
        page : this.$route.params['page'] || 1
    };
    axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
    try {
      const response = await axios.get(`${process.env.URL_API}images/search`, { params: query });
      this.cats = response.data;
      this.total_page = response.headers['pagination-count'];
      this.current_page = response.headers['pagination-page'];
      return response;
    } catch(e) {
      console.log('error', e);
    }
  }

}
</script>

<style>
</style>