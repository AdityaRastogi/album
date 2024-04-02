const BASE_URL = "https://jsonplaceholder.typicode.com";
const ALBUM_ID = 1; //can be dynamic too

const fetchPhotos = async (page) =>
  await fetch(`${BASE_URL}/albums/${ALBUM_ID}/photos?_page=${page}&_limit=10`);

export default {
  fetchPhotos,
};
