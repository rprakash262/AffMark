import { combineReducers } from 'redux';

import HomePageReducer from './HomePageReducer';
import AdminReducer from './AdminReducer';
import LayoutReducer from './LayoutReducer';
import OneCategoryReducer from './OneCategoryReducer';
import OneSubCategoryReducer from './OneSubCategoryReducer';
import OneProductReducer from './OneProductReducer';
import AddNewItemReducer from './AddNewItemReducer';
import AddNewCategoryReducer from './AddNewCategoryReducer';
import AddNewSubCategoryReducer from './AddNewSubCategoryReducer';

const rootReducer = combineReducers({
  homePage: HomePageReducer,
  admin: AdminReducer,
  layout: LayoutReducer,
  oneCategory: OneCategoryReducer,
  oneSubCategory: OneSubCategoryReducer,
  oneProduct: OneProductReducer,
  addNewItem: AddNewItemReducer,
  addNewCategory: AddNewCategoryReducer,
  addNewSubCategory: AddNewSubCategoryReducer,
});

export default rootReducer;