<template>
  <div>
    <div>
      <gallery 
        @next="navigate(currentPage + 1)"
        @prev="navigate(currentPage - 1)"
        :datas="datas">
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
  data(){
    return {
      datas : [],
      elements: 0,
      currentPage: 1,
      limit: 0,
      req: false,
      totalPage: 0
    }
  },
  methods: {
    navigate(event){
      this.$router.push({ query: { 'page' : event || 1 }});
    }
  },
  watchQuery: ['page'],
  async asyncData({ route, app }) {
    const { headers, data } = await app.$catsApiImageSearch.simpleRequest(route.query.page);
    const elements = parseInt(headers['pagination-count']);
    const limit = parseInt(headers['pagination-limit']);
    const mappedData = data.map(image => {
      return { 
        id: image.id,
        name: image.breeds[0].name, 
        url: image.url, 
        wikipedia_url: image.breeds[0].wikipedia_url
      }
    });
    return {
      datas : mappedData,
      elements,
      totalPage : Math.floor(elements / limit),
      limit,
      currentPage: parseInt(route.query.page)
    };
  }
}
</script>

<style scoped>
.btn {
  margin: 0 40px;
}
</style>