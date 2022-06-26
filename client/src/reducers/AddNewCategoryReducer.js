import { ACTIONS as layoutActions } from './LayoutReducer';

import { adminActions } from '../actions';

const { addNewCategory } = adminActions;

const SET_CATEGORY = 'admin/SET_CATEGORY';
const SET_FILTERED_CATEGORIES = 'admin/SET_FILTERED_CATEGORIES';
const SET_SUBMITTING_NEW_CAT_FLAG = 'admin/SET_SUBMITTING_NEW_CAT_FLAG';

const setNewCategory = category => ({ type: SET_CATEGORY, category });
const setFilteredCategories = cat => ({ type: SET_FILTERED_CATEGORIES, cat });
const setSubmittingNewCat = bool => ({ type: SET_SUBMITTING_NEW_CAT_FLAG, bool });

const defaultState = {
  newCategory: '',
  filteredCategories: [],
  submitttingNewCatFlag: false,
};

const init = () => (dispatch, getState) => {
  const { allCategories } = getState().admin;

  dispatch(setFilteredCategories(allCategories));
}

const changeNewCategory = txt => (dispatch, getState) => {
  const { allCategories } = getState().admin;

  dispatch(setNewCategory(txt));

  const x = allCategories.filter(d => d.categoryName.toLowerCase().indexOf(txt.toLowerCase()) > -1);
  dispatch(setFilteredCategories(x));
}

const submitNewCategory = () => async (dispatch, getState) => {
  dispatch(setSubmittingNewCat(true));
  const { newCategory } = getState().addNewCategory;

  if (!newCategory) {
    dispatch(layoutActions.setAlert(true, 'danger', 'Enter category name!'));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'Enter category name!'));
    }, 4000);
  }

  try {
    const response = await addNewCategory(newCategory);

    if (!response.success) {
      dispatch(layoutActions.setAlert(true, 'danger', response.result));

      return setTimeout(() => {
        return dispatch(layoutActions.setAlert(false, 'danger', response.result));
      }, 4000);
    }

    const { result } = response;
    const { categoryName: catName } = result;

    dispatch(changeNewCategory(''));
    dispatch(setSubmittingNewCat(false));
    dispatch(layoutActions.setAlert(true, 'success', `Category "${catName}" added successfully!`));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'success', `Category "${catName}" added successfully!`));
    }, 4000);
  } catch (err) {
    console.error(err);
    dispatch(setSubmittingNewCat(false));
  }
}

export const ACTIONS = {
  init,
  changeNewCategory,
  submitNewCategory,
}

function AddNewCategoryReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return Object.assign({}, state, {
        newCategory: action.category,
      });
    case SET_FILTERED_CATEGORIES:
      return Object.assign({}, state, {
        filteredCategories: action.cat,
      })
    case SET_SUBMITTING_NEW_CAT_FLAG:
      return Object.assign({}, state, {
        submitttingNewCatFlag: action.bool,
      })
    default:
      return state;
  }
}

export default AddNewCategoryReducer;