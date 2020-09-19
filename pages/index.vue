<template>
  <div>
    <div>
      <gallery 
        @next="navigate(currentPage + 1)"
        @prev="navigate(currentPage - 1)"
        :datas="datas"
        :format="{
          id: 'id',
          title: 'breeds.0.name',
          picture: 'url', 
          link: 'breeds.0.wikipedia_url'
        }">
        <template v-slot:bottom>
          <Pagination 
            @navigate="navigate"
            :max="totalPage" 
            :current="currentPage || 1"
            :range="5"/>
        </template>
      </gallery>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigate(event){
      this.$router.push({ query: { 'page' : event || 1 }});
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
    const { headers, data } = await app.$catsApiImageSearch.simpleRequest(route.query.page);
    return {
      headers,
      datas : data
    }
  }
}
</script>

<style scoped>
.btn {
  margin: 0 40px;
}
</style>