import {
  addNewCategory,
  addNewSubCategory,
  getCategories,
  getSubCategories,
  getSubCategoriesByCategoryId,
  fileUpload,
  addNewItem,
  postEditItem,
  postDeleteItem,
} from './adminActions';

import {
  fetchHomePageContent,
  fetchNavbar,
  fetchOneCategoryContent,
  fetchOneSubcategoryContent,
  fetchOneProduct,
} from './mainActions';

export const adminActions = {
  addNewCategory,
  addNewSubCategory,
  getCategories,
  getSubCategories,
  getSubCategoriesByCategoryId,
  fileUpload,
  addNewItem,
  postEditItem,
  postDeleteItem,
};

export const mainActions = {
  fetchHomePageContent,
  fetchNavbar,
  fetchOneCategoryContent,
  fetchOneSubcategoryContent,
  fetchOneProduct,
};
