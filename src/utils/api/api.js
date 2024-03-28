import axios from 'axios';

const fetchPhotos = (page) =>
  axios.get(
    `https://jsonplaceholder.typicode.com/albums/1/photos?_page=${page}&_limit=10`
  );

export default {
  fetchPhotos,
};
