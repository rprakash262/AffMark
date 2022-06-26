import axios from 'axios';

// const apiRootTesting = 'http://192.168.43.95:5000/';

export const addNewCategory = async (categoryName) => {
  const response = await axios.post('/add-new-category', {
    categoryName,
  });

  const { data } = response;

  return data;
}

export const addNewSubCategory = async (categoryId, subCategoryName) => {
  const response = await axios.post('/add-new-subcategory', {
    categoryId,
    subCategoryName,
  });

  const { data } = response;

  return data;
}

export const getCategories = async () => {
  const response = await axios.get('/get-all-categories');

  const { data } = response;

  const { categories } = data;

  return categories;
}

export const getSubCategories = async () => {
  const response = await axios.get('/get-all-subcategories');

  const { data } = response;

  const { subCategories } = data;

  return subCategories;
}

export const getSubCategoriesByCategoryId = async categoryId => {
  const response = await axios.post('/get-subcategories', {
    categoryId,
  });

  const { data } = response;

  return data;
}

export const fileUpload = async imageObj => {
  const response = await axios.post('/file-upload', imageObj);

  const { data } = response;

  return data;
}

export const addNewItem = async postData => {
  console.log({postData})
  const response = await axios.post('/add-new-item', {
    postData,
  });

  const { data } = response;

  return data;
}

export const postEditItem = async (id, newItemFormData) => {
  const response = await axios.post('/edit-one-product', {
    id,
    newItemFormData,
  });

  const { data } = response;

  return data;
}

export const postDeleteItem = async (itemId) => {
  const response = await axios.post('/delete-one-product', {
    itemId,
  });

  const { data } = response;

  return data;
}