<template>
  <div class="component">
    <div class="gallery">
      <div class="paginate">
        <button class="btn" @click="$emit('prev')">
          <i class="fa fa-angle-left"/>
        </button>
      </div>
      <section class="central">
        <div class="grid" v-if="datas.length">
          <div v-for="item in data" :key="item.id">
            <a :href="item.links">
              <img :src="item.picture" />
              <span v-if="item.title">{{ item.title }}</span>
            </a>
          </div>
        </div>
        <div v-else>
          Pas de données
        </div>
      </section>
      <div class="paginate">
        <button class="btn" @click="$emit('next')">
          <i class="fa fa-angle-right"/>
        </button>
      </div>
      <div class="pagination">
        <slot name="bottom">
        </slot>
      </div>
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
    },
    totalPage: Number,
    currentPage: Number,
    rangePage: Number
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

<style scoped>
.gallery {
    display: grid;
    text-align: center;
    align-items: center;
    grid-template-columns: 80px auto 80px;
    grid-template-rows: auto 80px;
}

.paginate .btn {
    padding: 6px;
    border: 0;
    font-size: 72px;
    background: none;
    border-radius: 3px;
}
.gallery .paginate a {
    text-decoration: none;
    font-size: 72px;
    color: #777;
}
.gallery .paginate a:hover { color: #000 }
.preload-grid {
    background-color: #999;
    border: 1px solid #fff;
    color: #fff;
}
.pagination {
    grid-column:2 / 3
}
button {
    cursor: pointer;
}
.grid {
    box-sizing: border-box;
    display: grid;
    grid-gap: 0.5em;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, minmax(120px, 200px));
    grid-template-areas:
      "p1 p1 p4 p6 p3 p10"
      "p1 p1 p5 p2 p2 p11"
      "p8 p9 p7 p2 p2 p12";
}

.grid>div {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ebebeb;
    padding: 2px;
}

.grid>div { position: relative }
.grid a { display: contents }

.grid img {
    height: 100%;
    background-color: #333;
    width: 100%;
    object-fit: cover;
    display: block;
}

.grid img:hover {
    filter: brightness(120%);
}
  
.grid span {
    position: absolute;
    padding: 10px;
    opacity: .9;
    box-sizing: border-box;
    background-color: #fff;
    bottom: 0;
    color: #000;
    left: 0;
}

.grid :nth-child(1) { grid-area: p1 }
.grid :nth-child(2) { grid-area: p2 }
.grid :nth-child(3) { grid-area: p3 }
.grid :nth-child(4) { grid-area: p4 }
.grid :nth-child(5) { grid-area: p5 }
.grid :nth-child(6) { grid-area: p6 }
.grid :nth-child(7) { grid-area: p7 }
.grid :nth-child(8) { grid-area: p8 }
.grid :nth-child(9) { grid-area: p9 }
.grid :nth-child(10) { grid-area: p10 }
.grid :nth-child(11) { grid-area: p11 }
.grid :nth-child(12) { grid-area: p12 }
  
@media (max-width:1050px) and (min-width:451px) {
    .grid {
        padding: 20px 0;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas:
            "p1 p2 p3 p10"
            "p4 p5 p6 p11"
            "p7 p8 p9 p12";
    }
    .grid span {
        width: 100%;
        padding: 3px 6px;
        font-size: 14px;
    }
    .gallery .paginate {
        width: 60px;
    }
}
  
@media (max-width:450px) and (min-width:0) {
    .paginate {
        display: none;
    }
    .pagination {
        grid-column: auto;
    }
    .gallery {
        display: block;
        grid-template-columns: 1fr;
    }
    .grid {
        padding: 20px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(6, 15%);
        height: 90vh;
        grid-template-areas:
            "p1 p2"
            "p3 p4"
            "p5 p6"
            "p7 p8"
            "p9 p10"
            "p11 p12";
    }
    .grid span {
        width: 100%;
        padding: 3px 6px;
        font-size: 14px;
    }
}
</style>