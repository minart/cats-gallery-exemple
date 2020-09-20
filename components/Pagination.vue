<template>
  <div class="box">
    <div class="limit" v-if="current > range">
      <button class="limit"@click="$emit('navigate', 1)">1</button>
      <span>...</span>
    </div>
    <button
      v-for="page in renderRange" 
      :class="{ 'current' : page === current }"
      :key="page"
      @click="$emit('navigate', page)">
      {{page}}
    </button>
    <div class="limit" v-if="current < max - range">
      <span>...</span>
      <button class="limit" @click="$emit('navigate', max)">{{max}}</button>
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
  }
}
</script>

<style scoped>
.box { justify-content: center; display: flex; }
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
.box button {
  border-radius: 4px;
  background: none;
  border: 0;
  padding: 6px;
}
.box button.current {
  border: 1px solid #ccc;
}
@media (max-width:1050px) and (min-width:451px) {
  a {
    font-size: 13px;
  }
  .limit {
    margin: 0 12px;
  }
}
@media (max-width:450px) and (min-width:0) {
  .limit {
    margin: 0 2px;
  }
}
</style>