
const BASE_URL = 'https://api.themoviedb.org/3/movie/now_playing?api_key=7bfe007798875393b05c5aa1ba26323e';

export const movies = (page = 1) => {
  let url = BASE_URL;
  if (page){
    url += '&page=' + page;
  }

  return fetch(url);
};