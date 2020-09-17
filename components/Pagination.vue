<template>

  <div class="box" v-if="renderRange.length && max > 0">
    <div class="limit" v-if="!renderRange.includes(1)">
      <nuxt-link class="limit" :to="{ path: '', query : { page : 1 }}">1</nuxt-link>
      <span>...</span>
    </div>
    <nuxt-link
      v-for="i in renderRange" 
      :class="(i === current) ? 'current' : ''"
      :key="i" 
      :to="{ path: '', query : { page : i }}">
      {{i}}
    </nuxt-link>
    <div class="limit" v-if="!renderRange.includes(max)">
      <span>...</span>
      <nuxt-link class="limit" :to="{ path: '', query : { page : max }}">{{max}}</nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    max : Number,
    current : Number,
    range : Number,
  },
  computed: {
    renderRange(){
      let { max, range, current } = this;
      let start = current - range;
      if (start < 1) start = 1;
      let end = current + range - start + 1;
      if (current + range > max) end = max - current + range + 1;
      return Array.from({ length: end }, (v, k) => k + start);
    }
  },
  mounted(){
  },
  data(){
      return {
          rangeArray : []
      }
  }
}
</script>

<style scoped>
.box {display: flex; }
  a {
    border:1px solid #fff;
    padding: 6px;
    display: inline-block;
    color: #333;
    text-align: center;
    border-radius: 3px;
    text-decoration:none;
  }
  a.current {
    border:1px solid #ccc;
    color: #000;
  }
  .limit {
    margin: 0 22px;
  }
  @media (max-width:1050px) and (min-width:451px) {
    a {
      font-size: 13px;
    }
  }
</style>