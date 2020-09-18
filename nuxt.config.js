require('dotenv').config();
export default {
  mode: 'universal',
  target: 'server',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'Jellynote test', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css' }
    ]
  },
  css: [
    '~/css/layout.css'
  ],
  router: {
  },
  plugins: [
    '~/plugins/catsApi'
  ],
  components: true,
  buildModules: [
    '@nuxtjs/dotenv'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  build: { 
  }
}
