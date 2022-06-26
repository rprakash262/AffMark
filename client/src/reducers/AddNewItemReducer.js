import { cloneDeep } from 'lodash';

import { adminActions } from '../actions';
import { ACTIONS as layoutActions } from './LayoutReducer';
import { storage } from '../firebase-config';

const {
  getCategories,
  getSubCategories,
  addNewItem,
  postEditItem,
} = adminActions;

const SET_ALL_CATEGORIES = 'admin/SET_ALL_CATEGORIES';
const SET_ALL_SUB_CATEGORIES = 'admin/SET_ALL_SUB_CATEGORIES';
const SET_SUB_CATEGORIES_FOR_CATEGORY = 'admin/SET_SUB_CATEGORIES_FOR_CATEGORY';
const SELECT_CATEGORY = 'admin/SELECT_CATEGORY';
const SELECT_SUB_CATEGORY = 'admin/SELECT_SUB_CATEGORY';
const SET_NEW_ITEM_FORM_DATA = 'admin/SET_NEW_ITEM_FORM_DATA';
const SET_IMAGE_FORM_DATA = 'admin/SET_IMAGE_DATA';
const SET_IMAGE_URLS = 'admin/SET_IMAGE_URLS';
const SET_UPLOADING_IMAGE = 'admin/SET_UPLOADING_IMAGE';
const SET_LOADING_EDIT_ITEM_MODAL = 'admin/SET_LOADING_EDIT_ITEM_MODAL';
const SET_EDITING_ITEM = 'admin/SET_EDITING_ITEM';
const SET_SUBMITTING_FLAG = 'admin/SET_SUBMITTING_FLAG';
const SET_ITEM_NAME = 'admin/SET_ITEM_NAME';
const SET_ITEM_PRICE = 'admin/SET_ITEM_PRICE';
const SET_ITEM_DISCOUNT = 'admin/SET_ITEM_DISCOUNT';
const SET_ITEM_BEST_OFFER = 'admin/SET_ITEM_BEST_OFFER';
const SET_ITEM_RATING = 'admin/SET_ITEM_RATING';
const SET_NUMBER_OF_RATING = 'admin/SET_NUMBER_OF_RATING';
const SET_ITEM_WARRENTY = 'admin/SET_ITEM_WARRENTY';
const SET_RETURN_POLICY = 'admin/SET_RETURN_POLICY';
const SET_REPLACEMENT_POLICY = 'admin/SET_REPLACEMENT_POLICY';
const SET_COD = 'admin/SET_COD';
const SET_ITEM_DESC = 'admin/SET_ITEM_DESC';
const SET_AVAILABLE_COLORS = 'admin/SET_AVAILABLE_COLORS';

const setAllCategories = arr => ({ type: SET_ALL_CATEGORIES, arr });
const setAllSubCategories = arr => ({ type: SET_ALL_SUB_CATEGORIES, arr });
const selectCategoryInternal = catId => ({ type: SELECT_CATEGORY, catId });
const selectSubCategory = subCatId => ({ type: SELECT_SUB_CATEGORY, subCatId });
const setImageFormData = imageFormData => ({ type: SET_IMAGE_FORM_DATA, imageFormData });
const setImageUrls = imageUrls => ({ type: SET_IMAGE_URLS, imageUrls });
const setUploadingImage = bool => ({ type: SET_UPLOADING_IMAGE, bool });
const loadEditItemModal = bool => ({ type: SET_LOADING_EDIT_ITEM_MODAL, bool });
const setEditingItem = item => ({ type: SET_EDITING_ITEM, item });
const setSubmitting = bool => ({ type: SET_SUBMITTING_FLAG, bool });
const setItemName = name => ({ type: SET_ITEM_NAME, name });
const setItemPrice = price => ({ type: SET_ITEM_PRICE, price });
const setItemDiscount = discount => ({ type: SET_ITEM_DISCOUNT, discount });
const setItemBestOffer = bestOffer => ({ type: SET_ITEM_BEST_OFFER, bestOffer });
const setItemRating = rating => ({ type: SET_ITEM_RATING, rating });
const setNumberOfRating = number => ({ type: SET_NUMBER_OF_RATING, number });
const setItemWarrenty = warrenty => ({ type: SET_ITEM_WARRENTY, warrenty });
const setReturnPolicy = policy => ({ type: SET_RETURN_POLICY, policy });
const setReplacementPolicy = policy => ({ type: SET_REPLACEMENT_POLICY, policy });
const setCOD = bool => ({ type: SET_COD, bool });
const setItemDesc = desc => ({ type: SET_ITEM_DESC, desc });
const setAvailableColors = colors => ({ type: SET_AVAILABLE_COLORS, colors });
const selectCategory = () => {};

const defaultState = {
  allCategories: [],
  allSubCategories: [],
  subcategoriesForCategory: [],
  imageFormData: null,
  uploadingImage: false,
  editingItem: {},
  submitttingFlag: false,
  selectedSubCategoryId: '',
  selectedCategoryId: '',
  itemName: '',
  itemPrice: '',
  itemDescription: '',
  discount: '',
  imageUrls: [],
  bestOffer: '',
  customerRating: '',
  numberOfRating: '',
  warrenty: '',
  returnPolicy: '',
  replacement: '',
  avaliableColors: '',
  COD: false, 
};

const changeItemImage = e => async (dispatch, getState) => {
  const img = e.target.files[0];

  dispatch(setImageFormData(img));
}

const uploadItemImage = () => async (dispatch, getState) => {
  dispatch(setUploadingImage(true));
  const { imageFormData, imageUrls } = getState().admin;
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
  } = getState().admin;

  newItemFormData['categoryId'] = selectedCategoryId;
  newItemFormData['subCategoryId'] = selectedSubCategoryId;
  newItemFormData['itemImage'] = imageUrls;

  const {
    categoryId,
    subCategoryId,
    itemImage,
    itemName,
    itemPrice,
    buyLink,
  } = newItemFormData;

  if (!categoryId ||
      !subCategoryId ||
      !itemImage.length > 0 ||
      !itemName ||
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
    dispatch(setSubmitting(false));
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
  dispatch(setEditingItem(item));
  dispatch(layoutActions.showEditItemModal(true));

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

  dispatch(selectCategory(categoryId));
  dispatch(selectSubCategory(subCategoryId));
  dispatch(setImageUrls(itemImage))

  dispatch(loadEditItemModal(false));
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

const discardImage = index => (dispatch, getState) => {
  const { imageUrls } = getState().addNewItem;

  const clonedUrls = cloneDeep(imageUrls);
  clonedUrls.splice(index, 1);

  dispatch(setImageFormData({}));
  dispatch(setImageUrls(clonedUrls));
}

export const ACTIONS = {
  selectSubCategory,
  changeItemImage,
  uploadItemImage,
  submitNewItem,
  editItem,
  submitEditNewItem,
  discardImage,
  setItemName,
  setItemPrice,
  setItemDiscount,
  setItemBestOffer,
  setItemRating,
  setNumberOfRating,
  setItemWarrenty,
  setReturnPolicy,
  setReplacementPolicy,
  setCOD,
  setItemDesc,
  setAvailableColors,
};

function AdminReducer(state = defaultState, action) {
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
    case SET_SUB_CATEGORIES_FOR_CATEGORY:
      return Object.assign({}, state, {
        subcategoriesForCategory: action.arr,
      });
    case SELECT_CATEGORY:
      return Object.assign({}, state, {
        selectedCategoryId: action.catId,
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
    case SET_EDITING_ITEM:
      return Object.assign({}, state, {
        editingItem: action.item,
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
    case SET_ITEM_DISCOUNT:
      return Object.assign({}, state, {
        discount: action.discount,
      });
    case SET_ITEM_BEST_OFFER:
      return Object.assign({}, state, {
        bestOffer: action.bestOffer,
      });
    case SET_ITEM_RATING:
      return Object.assign({}, state, {
        rating: action.rating,
      });
    case SET_NUMBER_OF_RATING:
      return Object.assign({}, state, {
        numberOfRating: action.number,
      });
    case SET_ITEM_WARRENTY:
      return Object.assign({}, state, {
        warrenty: action.warrenty,
      });
    case SET_RETURN_POLICY:
      return Object.assign({}, state, {
        returnPolicy: action.policy,
      });
    case SET_REPLACEMENT_POLICY:
      return Object.assign({}, state, {
        replacement: action.policy,
      });
    case SET_COD:
      return Object.assign({}, state, {
        COD: action.bool,
      });
    case SET_ITEM_DESC:
      return Object.assign({}, state, {
        itemDescription: action.desc,
      });
    case SET_AVAILABLE_COLORS:
      return Object.assign({}, state, {
        avaliableColors: action.colors,
      });
    default:
      return state;
  }
}

export default AdminReducer;