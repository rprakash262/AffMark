import { cloneDeep } from 'lodash';

import { adminActions as AA } from '../actions';
import { ACTIONS as layoutActions } from './LayoutReducer';
import { ACTIONS as homePageActions } from './HomePageReducer';
import { storage } from '../firebase-config';

const {
  getCategories,
  getSubCategories,
  addNewItem,
  postEditItem,
  postDeleteItem,
} = AA;

const SET_ALL_CATEGORIES = 'addNewItem/SET_ALL_CATEGORIES';
const SET_ALL_SUB_CATEGORIES = 'addNewItem/SET_ALL_SUB_CATEGORIES';
const SET_SUB_CATEGORIES_FOR_CATEGORY = 'addNewItem/SET_SUB_CATEGORIES_FOR_CATEGORY';
const SELECT_CATEGORY = 'addNewItem/SELECT_CATEGORY';
const SELECT_SUB_CATEGORY = 'addNewItem/SELECT_SUB_CATEGORY';
const SET_NEW_ITEM_FORM_DATA = 'addNewItem/SET_NEW_ITEM_FORM_DATA';
const SET_IMAGE_FORM_DATA = 'addNewItem/SET_IMAGE_DATA';
const SET_IMAGE_URLS = 'addNewItem/SET_IMAGE_URLS';
const SET_UPLOADING_IMAGE = 'addNewItem/SET_UPLOADING_IMAGE';
const SET_LOADING_EDIT_ITEM_MODAL = 'addNewItem/SET_LOADING_EDIT_ITEM_MODAL';
const SET_SUBMITTING_FLAG = 'addNewItem/SET_SUBMITTING_FLAG';
const SET_ITEM_NAME = 'addNewItem/SET_ITEM_NAME';
const SET_ITEM_PRICE = 'addNewItem/SET_ITEM_PRICE';
const SET_ITEM_DISCOUNT = 'addNewItem/SET_ITEM_DISCOUNT';
const SET_ITEM_BEST_OFFER = 'addNewItem/SET_ITEM_BEST_OFFER';
const SET_ITEM_FEATURED = 'addNewItem/SET_ITEM_FEATURED';
// const SET_ITEM_RATING = 'addNewItem/SET_ITEM_RATING';
const SET_ITEM_DESC = 'addNewItem/SET_ITEM_DESC';
const SET_ITEM_BUY_LINK = 'addNewItem/SET_ITEM_BUY_LINK';
const SET_DELETING_ITEM = 'addNewItem/SET_DELETING_ITEM';
const SET_DELETING_ITEM_FLAG = 'addNewItem/SET_DELETING_ITEM_FLAG';
const SET_EDITING_ITEM_ID = 'addNewItem/SET_EDITING_ITEM_ID';

const setAllCategories = arr => ({ type: SET_ALL_CATEGORIES, arr });
const setAllSubCategories = arr => ({ type: SET_ALL_SUB_CATEGORIES, arr });
const selectCategoryInternal = catId => ({ type: SELECT_CATEGORY, catId });
const setSubcategoriesForCategory = arr => ({ type: SET_SUB_CATEGORIES_FOR_CATEGORY, arr });
const selectSubCategory = subCatId => ({ type: SELECT_SUB_CATEGORY, subCatId });
const setImageFormData = imageFormData => ({ type: SET_IMAGE_FORM_DATA, imageFormData });
const setImageUrls = imageUrls => ({ type: SET_IMAGE_URLS, imageUrls });
const setUploadingImage = bool => ({ type: SET_UPLOADING_IMAGE, bool });
const loadEditItemModal = bool => ({ type: SET_LOADING_EDIT_ITEM_MODAL, bool });
const setSubmitting = bool => ({ type: SET_SUBMITTING_FLAG, bool });
const setNewItemFormData = formData => ({ type: SET_NEW_ITEM_FORM_DATA, formData });
const setItemName = name => ({ type: SET_ITEM_NAME, name });
const setItemPrice = price => ({ type: SET_ITEM_PRICE, price });
const setItemDesc = desc => ({ type: SET_ITEM_DESC, desc });
const setItemFeatured = bool => ({ type: SET_ITEM_FEATURED, bool });
const setItemBuyLink = link => ({ type: SET_ITEM_BUY_LINK, link });
const setDeletingItem = item => ({ type: SET_DELETING_ITEM, item });
const setDeletingItemFlag = bool => ({ type: SET_DELETING_ITEM_FLAG, bool });
const setEditingItemId = id => ({ type: SET_EDITING_ITEM_ID, id });

const defaultState = {
  allCategories: [],
  allSubCategories: [],
  subcategoriesForCategory: [],
  imageFormData: null,
  uploadingImage: false,
  submitttingFlag: false,
  selectedSubCategoryId: '',
  selectedCategoryId: '',
  itemName: '',
  itemPrice: '',
  itemDescription: '',
  imageUrls: [],
  isFeatured: false,
  buyLink: '',
  newItemFormData: {},
  deletingItem: {},
  deletingItemFlag: false,
  loadingEditItemModal: false,
  editingItemId: '',
};

const init = () => (dispatch, getState) => {
  const { allCategories, allSubCategories } = getState().admin;
  dispatch(setAllCategories(allCategories));
  dispatch(setAllSubCategories(allSubCategories));
}

const selectCategory = catId => async (dispatch, getState) => {
  dispatch(selectCategoryInternal(catId))

  try {
    const { allSubCategories } = getState().addNewItem;

    const subcategoriesForCategory = allSubCategories.filter(subCat => subCat.categoryId === catId);
    console.log(allSubCategories, subcategoriesForCategory, '===>>>>>>')
    dispatch(setSubcategoriesForCategory(subcategoriesForCategory));
  } catch (err) {
    console.error(err);
  }
}

const changeItemImage = e => async (dispatch, getState) => {
  const img = e.target.files[0];

  dispatch(setImageFormData(img));
}

const uploadItemImage = () => async (dispatch, getState) => {
  dispatch(setUploadingImage(true));
  const { imageFormData, imageUrls } = getState().addNewItem;

  if (!imageFormData) {
    dispatch(layoutActions.setAlert(true, 'danger', 'Select an image!'));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'Select an image!'));
    }, 4000);

  }

  const clonedUrls = cloneDeep(imageUrls);

  const uploadTask = storage.ref(`images/${imageFormData.name}`).put(imageFormData);

  uploadTask.on("state_changed", snapshot => {}, error => console.log(error), () => {
    storage
      .ref("images")
      .child(imageFormData.name)
      .getDownloadURL()
      .then(url => {
        clonedUrls.push(url);
        console.log({clonedUrls})
        dispatch(setImageUrls(clonedUrls))
        dispatch(setImageFormData(null));
        dispatch(setUploadingImage(false));
      })
  })
}

const submitNewItem = () => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const {
    newItemFormData,
    imageUrls,
    selectedCategoryId,
    selectedSubCategoryId,
    itemName,
    itemDescription,
    itemPrice,
    isFeatured,
    buyLink,
  } = getState().addNewItem;

  newItemFormData['categoryId'] = selectedCategoryId;
  newItemFormData['subCategoryId'] = selectedSubCategoryId;
  newItemFormData['itemName'] = itemName;
  newItemFormData['itemDescription'] = itemDescription;
  newItemFormData['itemPrice'] = itemPrice;
  newItemFormData['isFeatured'] = isFeatured;
  newItemFormData['buyLink'] = buyLink;
  newItemFormData['itemImage'] = imageUrls;
  newItemFormData['date'] = new Date();

  if (!selectedCategoryId ||
      !selectedSubCategoryId ||
      !imageUrls.length > 0 ||
      !itemName ||
      !itemDescription ||
      !itemPrice ||
      !buyLink) {
    dispatch(layoutActions.setAlert(true, 'danger', 'All fields are required!'));
    dispatch(setSubmitting(false));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'All fields are required!'));
    }, 4000);
  }

  try {
    const response = await addNewItem(newItemFormData);

    if (!response.success) {
      dispatch(layoutActions.setAlert(true, 'danger', 'Something went wrong!'));

      return setTimeout(() => {
        return dispatch(layoutActions.setAlert(false, 'danger', 'Something went wrong!'));
      }, 4000);
    }

    dispatch(selectCategoryInternal(''));
    dispatch(selectSubCategory(''));
    dispatch(setImageFormData({}));
    dispatch(setImageUrls(''))
    dispatch(setItemFeatured(false))
    dispatch(setSubmitting(false));
    dispatch(setNewItemFormData({}));
    dispatch(layoutActions.setAlert(true, 'success', 'Item added successfully!'));

    setTimeout(() => {
      dispatch(layoutActions.setAlert(false, 'success', 'Item added successfully!'));
    }, 4000);
  } catch (err) {
    console.error(err);
    dispatch(setSubmitting(false));
  }
}

const editItem = item => async (dispatch, getState) => {
  dispatch(loadEditItemModal(true));
  dispatch(layoutActions.showEditItemModal(true));

  let subCategories = [];

  try {
    const categories = await getCategories();
    subCategories = await getSubCategories();

    dispatch(setAllCategories(categories));
    dispatch(setAllSubCategories(subCategories));
  } catch (err) {
    console.error(err);
  }

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
    id,
  } = item;

  const subcategoriesForCategory = subCategories.filter(subCat => subCat.categoryId === categoryId);

  dispatch(setSubcategoriesForCategory(subcategoriesForCategory));
  
  dispatch(selectCategoryInternal(categoryId));
  dispatch(selectSubCategory(subCategoryId));
  dispatch(setItemName(itemName));
  dispatch(setItemPrice(itemPrice));
  dispatch(setItemDesc(itemDescription));
  dispatch(setItemBuyLink(buyLink));
  dispatch(setImageUrls([itemImage]));
  dispatch(setEditingItemId(id));

  dispatch(loadEditItemModal(false));
}

const submitEditNewItem = () => async (dispatch, getState) => {
  const {
    newItemFormData,
    selectedCategoryId,
    selectedSubCategoryId,
    itemName,
    itemPrice,
    itemDescription,
    buyLink,
    imageUrls,
    editingItemId,
  } = getState().addNewItem;

  newItemFormData['categoryId'] = selectedCategoryId;
  newItemFormData['subCategoryId'] = selectedSubCategoryId;
  newItemFormData['itemName'] = itemName;
  newItemFormData['itemDescription'] = itemDescription;
  newItemFormData['itemPrice'] = itemPrice;
  newItemFormData['buyLink'] = buyLink;
  newItemFormData['itemImage'] = imageUrls;
  newItemFormData['date'] = new Date();

  if (!selectedCategoryId ||
      !selectedSubCategoryId ||
      !imageUrls.length > 0 ||
      !itemName ||
      !itemDescription ||
      !itemPrice ||
      !buyLink) {
    dispatch(layoutActions.setAlert(true, 'danger', 'All fields are required!'));
    dispatch(setSubmitting(false));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'danger', 'All fields are required!'));
    }, 4000);
  }

  console.log({editingItemId}, {newItemFormData});

  try {
    const response = await postEditItem(editingItemId, newItemFormData);

    dispatch(layoutActions.setAlert(true, 'success', 'Item added successfully!'));

    setTimeout(() => {
      dispatch(layoutActions.setAlert(false, 'success', 'Item added successfully!'));
      setTimeout(() => {
        window.location.reload();        
      }, 1000);
    }, 4000);
  } catch (err) {
    console.log(err);
  }
}

const discardImage = index => (dispatch, getState) => {
  const { imageUrls } = getState().addNewItem;

  const clonedUrls = cloneDeep(imageUrls);
  clonedUrls.splice(index, 1);

  dispatch(setImageFormData(null));
  dispatch(setImageUrls(clonedUrls));
}

const deleteItem = item => async (dispatch) => {
  dispatch(setDeletingItem(item));
  dispatch(layoutActions.showConfirmDeleteItemPrompt());
}

const submitDeleteItem = (item) => async (dispatch, getState) => {
  dispatch(setDeletingItemFlag(true));

  const { deletingItem } = getState().addNewItem;
  const { id } = deletingItem;

  try {
    const response = await postDeleteItem(id);
    const { success } = response;

    if (success) {
      dispatch(homePageActions.init());
      dispatch(layoutActions.hideConfirmDeleteItemPrompt());
      dispatch(setDeletingItem({}));
      dispatch(setDeletingItemFlag(false));
      dispatch(layoutActions.setAlert(true, 'success', 'Item deleted successfully!'));

      setTimeout(() => {
        dispatch(layoutActions.setAlert(false, 'success', 'Item deleted successfully!'));
      }, 4000);
    } else {
      dispatch(homePageActions.init());
      dispatch(layoutActions.hideConfirmDeleteItemPrompt());
      dispatch(setDeletingItem({}));
      dispatch(setDeletingItemFlag(false));
      dispatch(layoutActions.setAlert(true, 'success', 'Something went wrong!'));

      setTimeout(() => {
        dispatch(layoutActions.setAlert(false, 'success', 'Something went wrong!'));
      }, 4000);
    }
  } catch (err) {
    console.log(err);
    dispatch(layoutActions.setAlert(true, 'success', 'Something went wrong!'));

    setTimeout(() => {
      dispatch(layoutActions.setAlert(false, 'success', 'Something went wrong!'));
    }, 4000);
  }
}

export const ACTIONS = {
  init,
  selectCategory,
  selectSubCategory,
  changeItemImage,
  uploadItemImage,
  submitNewItem,
  editItem,
  submitEditNewItem,
  discardImage,
  setItemName,
  setItemPrice,
  setItemDesc,
  setItemFeatured,
  setItemBuyLink,
  deleteItem,
  submitDeleteItem,
};

function AddNewItemReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALL_CATEGORIES:
      return Object.assign({}, state, {
        allCategories: action.arr,
        filteredCategories: action.arr,
      });
    case SET_ALL_SUB_CATEGORIES:
      return Object.assign({}, state, {
        allSubCategories: action.arr,
      });
    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        selectedCategoryId: action.catId,
      });
    case SET_SUB_CATEGORIES_FOR_CATEGORY:
      return Object.assign({}, state, {
        subcategoriesForCategory: action.arr,
      });
    case SELECT_SUB_CATEGORY:
      return Object.assign({}, state, {
        selectedSubCategoryId: action.subCatId,
      });
    case SET_NEW_ITEM_FORM_DATA:
      return Object.assign({}, state, {
        newItemFormData: action.formData,
      });
    case SET_IMAGE_FORM_DATA:
      return Object.assign({}, state, {
        imageFormData: action.imageFormData,
      });
    case SET_IMAGE_URLS:
      return Object.assign({}, state, {
        imageUrls: action.imageUrls,
      });
    case SET_UPLOADING_IMAGE:
      return Object.assign({}, state, {
        uploadingImage: action.bool,
      });
    case SET_LOADING_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        loadingEditItemModal: action.bool,
      });
    case SET_SUBMITTING_FLAG:
      return Object.assign({}, state, {
        submitttingFlag: action.bool,
      });
    case SET_ITEM_NAME:
      return Object.assign({}, state, {
        itemName: action.name,
      });
    case SET_ITEM_PRICE:
      return Object.assign({}, state, {
        itemPrice: action.price,
      });
    case SET_ITEM_DESC:
      return Object.assign({}, state, {
        itemDescription: action.desc,
      });
    case SET_ITEM_FEATURED:
      return Object.assign({}, state, {
        isFeatured: action.bool,
      });
    case SET_ITEM_BUY_LINK:
      return Object.assign({}, state, {
        buyLink: action.link,
      });
    case SET_DELETING_ITEM:
      return Object.assign({}, state, {
        deletingItem: action.item,
      });
    case SET_DELETING_ITEM_FLAG:
      return Object.assign({}, state, {
        deletingItemFlag: action.bool,
      });
    case SET_EDITING_ITEM_ID:
      return Object.assign({}, state, {
        editingItemId: action.id,
      });
    default:
      return state;
  }
}

export default AddNewItemReducer;