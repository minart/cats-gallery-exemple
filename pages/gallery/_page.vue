<template>
  <div>
    <ul>
      <li v-for="cat in cats" :key="cat.id">
        <img :id="cat.id" width="100px" :src="cat.url" />
        <p v-if="cat.breeds[0]">{{ cat.breeds[0].name }} - {{ cat.breeds[0].wikipedia_url }}</p>
      </li>
    </ul>
    <p>{{total_page}}</p>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  
  mounted(){
    console.log(this.$route);
  },

  async asyncData({ params }) {
    const { page } = params;
    const baseUrlApi = 'https://api.thecatapi.com/v1/';
    axios.defaults.headers.common['x-api-key'] = "330ad465-8b87-4030-af4b-fbfc132fb1a6";
    const query = {
        limit : 20,
        has_breeds: 1,
        order : 'Asc',
        page : page || 1
    };
    try {
      const { data, headers } = await axios.get(`${baseUrlApi}images/search`, { params: query });
      return {
        cats: data,
        total_page : headers['pagination-count']
      };
    } catch(e) {
    }
  }

}
</script>

<style>
</style>