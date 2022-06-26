import { ACTIONS as layoutActions } from './LayoutReducer';

import { adminActions } from '../actions';

const { addNewSubCategory } = adminActions;

const SET_ALL_CATEGORIES = 'addNewSubCategory/SET_ALL_CATEGORIES';
const SET_NEW_SUB_CATEGORY = 'addNewSubCategory/SET_NEW_SUB_CATEGORY';
const SELECT_CATEGORY_INTERNAL = 'addNewSubCategory/SELECT_CATEGORY_INTERNAL';
const SET_SUB_CATEGORIES_FOR_CATEGORY = 'addNewSubCategory/SET_SUB_CATEGORIES_FOR_CATEGORY';
const SET_SUBMITTING_NEW_SUB_CAT_FLAG = 'addNewSubCategory/SET_SUBMITTING_NEW_SUB_CAT_FLAG';
const SET_FILTERED_SUB_CATEGORIES = 'addNewSubCategory/SET_FILTERED_SUB_CATEGORIES';

const setAllCategories = categories => ({ type: SET_ALL_CATEGORIES, categories });
const setNewSubCategory = newSubCategory => ({ type: SET_NEW_SUB_CATEGORY, newSubCategory })
const selectCategoryInternal = catId => ({ type: SELECT_CATEGORY_INTERNAL, catId });
const setSubcategoriesForCategory = arr => ({ type: SET_SUB_CATEGORIES_FOR_CATEGORY, arr });
const setSubmittingNewSubCat = bool => ({ type: SET_SUBMITTING_NEW_SUB_CAT_FLAG, bool });
const setFilteredSubCategories = cat => ({ type: SET_FILTERED_SUB_CATEGORIES, cat });

const defaultState = {
  newSubCategory: '',
  selectedCategoryId: '',
  allCategories: [],
  filteredCategories: [],
  filteredSubCategories: [],
  submitttingNewSubCatFlag: false,
};

const init = () => (dispatch, getState) => {
  const { allCategories } = getState().admin;

  dispatch(setAllCategories(allCategories));
}

const changeNewSubCategory = txt => (dispatch, getState) => {
  const { allSubCategories } = getState().admin;

  dispatch(setNewSubCategory(txt));

  const x = allSubCategories.filter(d => d.subCategoryName.toLowerCase().indexOf(txt.toLowerCase()) > -1);
  dispatch(setFilteredSubCategories(x));
}

const selectCategory = catId => async (dispatch, getState) => {
  dispatch(selectCategoryInternal(catId))

  try {
    const { allSubCategories } = getState().admin;

    const subcategoriesForCategory = allSubCategories.filter(subCat => subCat.categoryId === catId);

    dispatch(setSubcategoriesForCategory(subcategoriesForCategory));
  } catch (err) {
    console.error(err);
  }
}

const submitNewSubCategory = () => async (dispatch, getState) => {
  dispatch(setSubmittingNewSubCat(true));
  const { newSubCategory, selectedCategoryId } = getState().admin;

  if (!selectedCategoryId) {
    dispatch(layoutActions.setAlert(true, 'danger', 'Please select a category!'));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'Please select a category!'));
    }, 4000);
  }

  if (!newSubCategory) {
    dispatch(layoutActions.setAlert(true, 'danger', 'Please enter sub-category name!'));
    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'Please enter sub-category name!'));
    }, 4000);
  }

  try {
    const response = await addNewSubCategory(selectedCategoryId, newSubCategory);

    if (!response.success) {
      dispatch(layoutActions.setAlert(true, 'danger', response.result));

      return setTimeout(() => {
        return dispatch(layoutActions.setAlert(false, 'danger', response.result));
      }, 4000);
    }

    const { result } = response;
    const { subCategoryName: subCatName } = result;

    dispatch(changeNewSubCategory(''));
    dispatch(selectCategoryInternal(''));
    dispatch(setSubmittingNewSubCat(false));
    dispatch(layoutActions.setAlert(true, 'success', `Sub-Category "${subCatName}" added successfully!`));

    setTimeout(() => {
      dispatch(layoutActions.setAlert(false, 'success', `Sub-Category "${subCatName}" added successfully!`));
    }, 4000);
  } catch (err) {
    console.error(err);
    dispatch(setSubmittingNewSubCat(false));
  }
}

export const ACTIONS = {
  init,
  changeNewSubCategory,
  selectCategory,
  submitNewSubCategory,
}

function AddNewSubCategoryReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES: 
      return Object.assign(state, {}, {
        allCategories: action.categories
      });
    case SET_NEW_SUB_CATEGORY: 
      return Object.assign(state, {}, {
        newSubCategory: action.newSubCategory
      });
    case SELECT_CATEGORY_INTERNAL: 
      return Object.assign(state, {}, {
        selectedCategoryId: action.catId
      });
    case SET_SUB_CATEGORIES_FOR_CATEGORY: 
      return Object.assign(state, {}, {
        subcategoriesForCategory: action.arr
      });
    case SET_SUBMITTING_NEW_SUB_CAT_FLAG: 
      return Object.assign(state, {}, {
        submitttingNewSubCatFlag: action.bool
      });
    case SET_FILTERED_SUB_CATEGORIES:
      return Object.assign({}, state, {
        filteredSubCategories: action.cat,
      });
    default:
      return state;
  }
}

export default AddNewSubCategoryReducer;