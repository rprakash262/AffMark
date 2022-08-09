import axios from 'axios';

// const apiRootTesting = 'http://192.168.43.95:5000/';

export const fetchHomePageContent = async () => {
  const response = await axios.get('/home-page-content');

  const { data } = response;

  return data;
}

export const fetchNavbar = async () => {
  const response = await axios.get('/get-navbar');

  const { data } = response;

  return data;
}

export const fetchOneCategoryContent = async categoryId => {
  const response = await axios.post('/one-category-content', { categoryId });

  const { data } = response;

  return data;
}

export const fetchOneSubcategoryContent = async subCategoryId => {
  const response = await axios.post('/one-subcategory-content', { subCategoryId });

  const { data } = response;

  return data;
}

export const fetchOneProduct = async productId => {
  const response = await axios.post('/get-one-product', { productId });

  const { data } = response;

  return data;
}

export const searchQuery = async query => {
  const response = await axios.post('/search-query', { query });

  const { data } = response;

  return data;
}

// export const fetchItemsByCategory = async categoryIds => {
//   const response = await axios.post('/items-by-category', {
//     categoryIds,
//   });

//   const { data } = response;

//   return data;
// }