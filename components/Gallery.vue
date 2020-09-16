<template>
  <div class="gallery">
    <div class="paginate">
      <nuxt-link v-if="current_page > 1" :to="{ name: 'gallery-page', params : { page : +current_page - 1 }}">
        <i class="fa fa-angle-left"/>
      </nuxt-link>
    </div>
    <div class="grid">
      <div v-for="cat in cats":key="cat.id">
        <a v-if="cat.breeds[0] && cat.breeds[0].wikipedia_url" :href="cat.breeds[0].wikipedia_url">
          <img :id="cat.id" :src="cat.url" />
          <span v-if="cat.breeds[0]">{{ cat.breeds[0].name }}</span>
        </a>
      </div>
    </div>
    <div class="paginate">
      <nuxt-link v-if="current_page < total_page" :to="{ name: 'gallery-page', params : { page : +current_page + 1 }}">
        <i class="fa fa-angle-right"/>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cats: [],
      total_page: 0,
      current_page: 1
    }
  },
  watchQuery: ['page'],
  async fetch() {
    const query = {
      limit: 12,
      has_breeds: 1,
      order: 'Asc',
      page: this.$route.params['page'] || 1
    };
    axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
    try {
      const {
        data,
        headers
      } = await axios.get(`${process.env.URL_API}images/search`, {
        params: query
      });
      this.cats = data;
      console.log(this.cats);
      this.total_page = headers['pagination-count'];
      this.current_page = headers['pagination-page'];
    } catch (e) {
      console.log('error', e);
    }
  }
}
</script>

<style scoped>
  .gallery {
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
  }

  .gallery .paginate {
    width: 120px;
  }

  .gallery .paginate a {
    text-decoration: none;
    font-size: 72px;
    color: #777;
  }

  .gallery .paginate a:hover {
    color: #000;
  }

  .grid {
    padding: 60px 0;
    box-sizing: border-box;
    display: grid;
    grid-gap: 0.5em;
    height: 100vh;
    width: 100vw;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(3, 32.3%);
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

  .grid>div {
    position: relative;
  }

  .grid a {
    display: contents;
  }

  .grid img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    display: block;
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
  .grid :nth-child(11) { grid-area: p11}
  .grid :nth-child(12) { grid-area: p12 }

  @media (max-width:1050px) and (min-width:451px) {
    .grid {
      padding: 20px 0;
      grid-template-columns: repeat(4, 1fr);
      grid-template-rows: repeat(3, 33%);
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
    .grid {
      padding: 10px 0;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(6, 15.5%);
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