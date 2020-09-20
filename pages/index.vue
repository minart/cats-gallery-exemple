<template>
  <div class="page">
    <gallery 
      @prev="navigate(currentPage - 1)"
      @next="navigate(currentPage + 1)"
      :datas="data"
      :format="{
        id: 'id',
        title: 'breeds.0.name',
        picture: 'url', 
        link: 'breeds.0.wikipedia_url',
      }">
      <template v-slot:bottom>
        <Pagination
          @navigate="navigate($event)"
          :max="totalPage" 
          :current="currentPage || 1"
          :range="5"/>
      </template>
    </gallery>
  </div>
</template>

<script>
export default {
  methods: {
    navigate(page){
      const p = (!page || page > this.totalPage) ? 1 : page;
      this.$router.push({ query: { 'page' : p }});
    }
  },
  computed: {
    elements(){
      return parseInt(this.headers['pagination-count']);
    },
    currentPage(){
      return parseInt(this.headers['pagination-page']);
    },
    limit(){
      return parseInt(this.headers['pagination-limit']);
    },
    totalPage(){
      return Math.floor(this.elements / this.limit);
    }
  },
  watchQuery: ['page'],
  async asyncData({ route, app }) {
    const { data, headers } = await app.$catsApiImageSearch.simpleRequest(route.query.page);
    return {
      data, headers
    }
  }
}
</script>