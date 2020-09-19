<template>
  <div class="gallery">
    <div class="paginate">
      <button class="btn" @click="$emit('prev')">
        <i class="fa fa-angle-left"/>
      </button>
    </div>
    <div class="grid" :class="{ 'pair' : this.$route.query.page % 2 === 0 }">
      <template v-if="datas.length">
        <div v-for="item in data" :key="item.id">
          <a :href="item.links">
            <img :src="item.picture" />
            <span v-if="item.title">{{ item.title }}</span>
          </a>
        </div>
      </template>
      <template v-else>
        Pas de données
      </template>
      <slot name="bottom"></slot>
    </div>
    <div class="paginate">
      <button class="btn" @click="$emit('next')">
        <i class="fa fa-angle-right"/>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    datas: {
      type: Array,
      required: true
    },
    format: {
      type: Object,
      required: true
    }
  },
  methods : {
    stringObjectSearch(obj, prop) {
      if(typeof obj === 'undefined')
        return false;
      const id = prop.indexOf('.')
      if(id > -1)
        return this.stringObjectSearch(obj[prop.substring(0, id)], prop.substr(id + 1));
      return obj[prop];
    }
  },
  computed: {
    data(){
      return this.datas.map(item => ({
        id : this.stringObjectSearch(item, this.format.id),
        title : this.stringObjectSearch(item, this.format.title),
        picture : this.stringObjectSearch(item, this.format.picture),
        link : this.stringObjectSearch(item, this.format.link),
      }))
    }
  }
}
</script>

<style scoped src="@/css/gallery.css"></style>