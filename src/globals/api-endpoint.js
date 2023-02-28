import CONFIG from './config';

const API_ENDPOINT = {
  NOW_PLAYING: `${CONFIG.BASE_URL}movie/now_playing?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  UPCOMING: `${CONFIG.BASE_URL}movie/upcoming?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  LIST_RESTAURANT: `${CONFIG.BASE_URL}list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
};

export default API_ENDPOINT;
