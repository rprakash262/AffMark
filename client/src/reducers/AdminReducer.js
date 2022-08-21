import { cloneDeep } from 'lodash';

import { adminActions } from '../actions';
import { ACTIONS as layoutActions } from './LayoutReducer';

const {
  getCategories,
  getSubCategories,
  postEditItem,
  postDeleteItem,
} = adminActions;

const SET_SECURITY_KEY = 'admin/SET_SECURITY_KEY';
const SET_LOGGED_IN = 'admin/SET_LOGGED_IN';
const SET_SELECTED_TAB = 'admin/SET_SELECTED_TAB';
const SET_ALL_CATEGORIES = 'admin/SET_ALL_CATEGORIES';
const SET_ALL_SUB_CATEGORIES = 'admin/SET_ALL_SUB_CATEGORIES';
const SET_LOADING_EDIT_ITEM_MODAL = 'admin/SET_LOADING_EDIT_ITEM_MODAL';
const SET_EDITING_ITEM = 'admin/SET_EDITING_ITEM';

const changeSecurityKey = key => ({ type: SET_SECURITY_KEY, key });
const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setSelectedTab = selectedTab => ({ type: SET_SELECTED_TAB, selectedTab });
const setAllCategories = arr => ({ type: SET_ALL_CATEGORIES, arr });
const setAllSubCategories = arr => ({ type: SET_ALL_SUB_CATEGORIES, arr });
const loadEditItemModal = bool => ({ type: SET_LOADING_EDIT_ITEM_MODAL, bool });
const setEditingItem = item => ({ type: SET_EDITING_ITEM, item });

const defaultState = {
  loadingEditItemModal: false,
  loggedIn: false,
  securityKey: '',
  selectedTab: 'addNewCategory',
  allCategories: [],
  allSubCategories: [],
  editingItem: {},
};

const init = () => async dispatch => {
  const loggedIn = await localStorage.getItem('loggedIn');

  if (loggedIn) {
    dispatch(setLoggedIn(true));
  }

  try {
    const categories = await getCategories();
    const subCategories = await getSubCategories();

    dispatch(setAllCategories(categories));
    dispatch(setAllSubCategories(subCategories));
  } catch (err) {
    console.error(err);
  }
}

const submitSecurityKey = () => async (dispatch, getState) => {
  const { securityKey } = getState().admin;

  if (securityKey === 'secret') {
    await localStorage.setItem('loggedIn', true);
    dispatch(setLoggedIn(true));
  }
}

const editItem = item => async (dispatch, getState) => {
  dispatch(loadEditItemModal(true));
  dispatch(setEditingItem(item));
  dispatch(layoutActions.showEditItemModal());

  try {
    const categories = await getCategories();
    const subCategories = await getSubCategories();

    dispatch(setAllCategories(categories));
    dispatch(setAllSubCategories(subCategories));
  } catch (err) {
    console.error(err);
  }

  let newItemFormData = {};

  const {
    categoryId,
    subCategoryId,
    itemName,
    itemPrice,
    itemDescription,
    offer,
    isFeatured,
    buyLink,
    itemImage,
  } = item;

  newItemFormData['itemName'] = itemName;
  newItemFormData['itemPrice'] = itemPrice;
  newItemFormData['itemDescription'] = itemDescription;
  newItemFormData['offer'] = offer;
  newItemFormData['isFeatured'] = isFeatured;
  newItemFormData['buyLink'] = buyLink;

  // dispatch(selectCategory(categoryId));
  // dispatch(selectSubCategory(subCategoryId));
  // dispatch(setNewItemFormData(newItemFormData));
  // dispatch(setImageUrl(itemImage))

  console.log({item})
  // dispatch(loadEditItemModal(false));
}

const submitEditNewItem = () => async (dispatch, getState) => {
  const {
    editingItem,
    newItemFormData,
    selectedCategoryId,
    selectedSubCategoryId,
    imageUrl,
  } = getState().admin;

  const { id, itemImage } = editingItem;

  newItemFormData['categoryId'] = selectedCategoryId;
  newItemFormData['subCategoryId'] = selectedSubCategoryId;
  newItemFormData['itemImage'] = imageUrl || itemImage;

  try {
    const response = await postEditItem(id, newItemFormData);

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

const deleteItem = item => async (dispatch) => {
  // dispatch(setDeletingItem(item));
  dispatch(layoutActions.showConfirmDeleteItemPrompt());
}

const submitDeleteItem = (item) => async (dispatch, getState) => {
  const { deletingItem } = getState().addNewItem;
  const { id } = deletingItem;
return;
  try {
    const response = await postDeleteItem(id);

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

const discardImage = () => dispatch => {
  // dispatch(setImageFormData({}));
  // dispatch(setImageUrl(''));
}

export const ACTIONS = {
  init,
  setSelectedTab,
  changeSecurityKey,
  submitSecurityKey,
  editItem,
  submitEditNewItem,
  deleteItem,
  submitDeleteItem,
};

function AdminReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SELECTED_TAB:
      return Object.assign({}, state, {
        selectedTab: action.selectedTab,
      });
    case SET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.arr,
        filteredCategories: action.arr,
      });
    case SET_ALL_SUB_CATEGORIES:
      return Object.assign({}, state, {
        allSubCategories: action.arr,
      });
    case SET_SECURITY_KEY:
      return Object.assign({}, state, {
        securityKey: action.key,
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    case SET_LOADING_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        loadingEditItemModal: action.bool,
      });
    case SET_EDITING_ITEM:
      return Object.assign({}, state, {
        editingItem: action.item,
      });
    default:
      return state;
  }
}

export default AdminReducer;