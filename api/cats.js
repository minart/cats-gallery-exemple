export default $axios => resource => ({
    simpleRequest(page) {
        $axios.setBaseURL(process.env.URL_API);
        $axios.defaults.headers.common['x-api-key'] = process.env.SECRET_API;
        const params = {
            limit: 12,
            mime_types: 'jpg',
            size: 'full',
            has_breeds: 1,
            order: 'asc',
            page: page || 1
        };
        return $axios.get(`${resource}`, { params });
    }
})
  