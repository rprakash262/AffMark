import { cloneDeep } from 'lodash';

import { adminActions } from '../actions';
import { ACTIONS as layoutActions } from './LayoutReducer';
import { storage } from '../firebase-config';

const {
  getCategories,
  addNewCategory,
  addNewSubCategory,
  getSubCategories,
  // getSubCategoriesByCategoryId,
  fileUpload,
  addNewItem,
  postEditItem,
  postDeleteItem,
} = adminActions;

const SET_SECURITY_KEY = 'admin/SET_SECURITY_KEY';
const SET_LOGGED_IN = 'admin/SET_LOGGED_IN';
const SET_CATEGORY = 'admin/SET_CATEGORY';
const SET_SUB_CATEGORY = 'admin/SET_SUB_CATEGORY';
const SET_SELECTED_TAB = 'admin/SET_SELECTED_TAB';
const SET_ALL_CATEGORIES = 'admin/SET_ALL_CATEGORIES';
const SET_ALL_SUB_CATEGORIES = 'admin/SET_ALL_SUB_CATEGORIES';
const SET_SUB_CATEGORIES_FOR_CATEGORY = 'admin/SET_SUB_CATEGORIES_FOR_CATEGORY';
const SELECT_CATEGORY = 'admin/SELECT_CATEGORY';
const SELECT_SUB_CATEGORY = 'admin/SELECT_SUB_CATEGORY';
const SET_NEW_ITEM_FORM_DATA = 'admin/SET_NEW_ITEM_FORM_DATA';
const SET_IMAGE_FORM_DATA = 'admin/SET_IMAGE_DATA';
const SET_IMAGE_URL = 'admin/SET_IMAGE_URL';
const SET_UPLOADING_IMAGE = 'admin/SET_UPLOADING_IMAGE';
const SET_FILTERED_CATEGORIES = 'admin/SET_FILTERED_CATEGORIES';
const SET_FILTERED_SUB_CATEGORIES = 'admin/SET_FILTERED_SUB_CATEGORIES';
const SET_LOADING_EDIT_ITEM_MODAL = 'admin/SET_LOADING_EDIT_ITEM_MODAL';
const SET_EDITING_ITEM = 'admin/SET_EDITING_ITEM';
const SET_SUBMITTING_FLAG = 'admin/SET_SUBMITTING_FLAG';
const SET_DELETING_ITEM = 'admin/SET_DELETING_ITEM';

const changeSecurityKey = key => ({ type: SET_SECURITY_KEY, key });
const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setNewCategory = category => ({ type: SET_CATEGORY, category });
const setSelectedTab = selectedTab => ({ type: SET_SELECTED_TAB, selectedTab });
const setAllCategories = arr => ({ type: SET_ALL_CATEGORIES, arr });
const setAllSubCategories = arr => ({ type: SET_ALL_SUB_CATEGORIES, arr });
const setNewSubCategory = subCategory => ({ type: SET_SUB_CATEGORY, subCategory })
const selectCategoryInternal = catId => ({ type: SELECT_CATEGORY, catId });
const selectSubCategory = subCatId => ({ type: SELECT_SUB_CATEGORY, subCatId });
const setNewItemFormData = formData => ({ type: SET_NEW_ITEM_FORM_DATA, formData });
const setSubcategoriesForCategory = arr => ({ type: SET_SUB_CATEGORIES_FOR_CATEGORY, arr });
const setImageFormData = imageFormData => ({ type: SET_IMAGE_FORM_DATA, imageFormData });
const setImageUrl = imageUrl => ({ type: SET_IMAGE_URL, imageUrl });
const setUploadingImage = bool => ({ type: SET_UPLOADING_IMAGE, bool });
const setFilteredCategories = cat => ({ type: SET_FILTERED_CATEGORIES, cat });
const setFilteredSubCategories = cat => ({ type: SET_FILTERED_SUB_CATEGORIES, cat });
const loadEditItemModal = bool => ({ type: SET_LOADING_EDIT_ITEM_MODAL, bool });
const setEditingItem = item => ({ type: SET_EDITING_ITEM, item });
const setSubmitting = bool => ({ type: SET_SUBMITTING_FLAG, bool });
const setDeletingItem = item => ({ type: SET_DELETING_ITEM, item });

const defaultState = {
  loadingEditItemModal: false,
  loggedIn: false,
  securityKey: '',
  newCategory: '',
  newSubCategory: '',
  selectedCategoryId: '',
  selectedTab: 'addNewCategory',
  allCategories: [],
  allSubCategories: [],
  subcategoriesForCategory: [],
  selectedSubCategoryId: '',
  newItemFormData: {
    isFeatured: false,
  },
  imageFormData: {},
  imageUrl: '',
  uploadingImage: false,
  filteredCategories: [],
  filteredSubCategories: [],
  editingItem: {},
  submitttingFlag: false,
  deletingItem: {},
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

const changeNewCategory = txt => (dispatch, getState) => {
  const { allCategories } = getState().admin;

  dispatch(setNewCategory(txt));

  const x = allCategories.filter(d => d.categoryName.toLowerCase().indexOf(txt.toLowerCase()) > -1);
  dispatch(setFilteredCategories(x));
}

const changeNewSubCategory = txt => (dispatch, getState) => {
  const { allSubCategories } = getState().admin;

  dispatch(setNewSubCategory(txt));

  const x = allSubCategories.filter(d => d.subCategoryName.toLowerCase().indexOf(txt.toLowerCase()) > -1);
  dispatch(setFilteredSubCategories(x));
}

const submitSecurityKey = () => async (dispatch, getState) => {
  const { securityKey } = getState().admin;

  if (securityKey === 'secret') {
    await localStorage.setItem('loggedIn', true);
    dispatch(setLoggedIn(true));
  }
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

const submitNewCategory = () => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const { newCategory } = getState().admin;

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
    dispatch(setSubmitting(false));
    dispatch(layoutActions.setAlert(true, 'success', `Category "${catName}" added successfully!`));

    return setTimeout(() => {
      return dispatch(layoutActions.setAlert(false, 'success', `Category "${catName}" added successfully!`));
    }, 4000);
  } catch (err) {
    console.error(err);
    dispatch(setSubmitting(false));
  }
}

const submitNewSubCategory = () => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
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
    dispatch(setSubmitting(false));
    dispatch(layoutActions.setAlert(true, 'success', `Sub-Category "${subCatName}" added successfully!`));

    setTimeout(() => {
      dispatch(layoutActions.setAlert(false, 'success', `Sub-Category "${subCatName}" added successfully!`));
    }, 4000);
  } catch (err) {
    console.error(err);
    dispatch(setSubmitting(false));
  }
}

const changeNewItemFormData = (type, value) => (dispatch, getState) => {
  const { newItemFormData } = getState().admin;

  const clonedFormData = cloneDeep(newItemFormData);

  clonedFormData[type] = value;

  dispatch(setNewItemFormData(clonedFormData));
}

const changeItemImage = (e) => async (dispatch, getState) => {
  // const imageFormObj = new FormData();

  const img = e.target.files[0];

  // imageFormObj.append('imageName', `multer-image-${Date.now()}`);
  // imageFormObj.append('imageData', e.target.files[0]);

  // dispatch(setImageFormData(imageFormObj));
  dispatch(setImageFormData(img));
}

const uploadItemImage = () => async (dispatch, getState) => {
  dispatch(setUploadingImage(true));
  const { imageFormData } = getState().admin;

  // try {
  //   const response = await fileUpload(imageFormData);

  //   const { result } = response;
  //   const { imageData } = result;

  //   dispatch(setImageUrl(imageData))
  //   dispatch(setUploadingImage(false));
  // } catch (err) {
  //   console.error(err);
  //   dispatch(setUploadingImage(false));
  // }
  const uploadTask = storage.ref(`images/${imageFormData.name}`).put(imageFormData);

  uploadTask.on("state_changed", snapshot => {}, error => console.log(error), () => {
    storage
      .ref("images")
      .child(imageFormData.name)
      .getDownloadURL()
      .then(url => {
        dispatch(setImageUrl(url))
        dispatch(setUploadingImage(false));
      })
  })
}

const submitNewItem = () => async (dispatch, getState) => {
  dispatch(setSubmitting(true));
  const {
    newItemFormData,
    imageUrl,
    selectedCategoryId,
    selectedSubCategoryId,
  } = getState().admin;

  newItemFormData['categoryId'] = selectedCategoryId;
  newItemFormData['subCategoryId'] = selectedSubCategoryId;
  newItemFormData['itemImage'] = imageUrl;

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
      !itemImage ||
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
    dispatch(setImageUrl(''))
    dispatch(setNewItemFormData({}))
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

  dispatch(selectCategory(categoryId));
  dispatch(selectSubCategory(subCategoryId));
  dispatch(setNewItemFormData(newItemFormData));
  dispatch(setImageUrl(itemImage))

  console.log({item})
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

const deleteItem = item => async (dispatch) => {
  dispatch(setDeletingItem(item));
  dispatch(layoutActions.showConfirmDeleteItemPrompt());
}

const submitDeleteItem = (item) => async (dispatch, getState) => {
  const { deletingItem } = getState().admin;
  const { id } = deletingItem;

  try {
    const response = await postDeleteItem(id);

    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

const discardImage = () => dispatch => {
  dispatch(setImageFormData({}));
  dispatch(setImageUrl(''));
}

export const ACTIONS = {
  init,
  changeNewCategory,
  setSelectedTab,
  submitNewCategory,
  submitNewSubCategory,
  changeNewSubCategory,
  selectCategory,
  selectSubCategory,
  changeNewItemFormData,
  changeItemImage,
  uploadItemImage,
  submitNewItem,
  changeSecurityKey,
  submitSecurityKey,
  editItem,
  submitEditNewItem,
  deleteItem,
  submitDeleteItem,
  discardImage,
};

function AdminReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CATEGORY:
      return Object.assign({}, state, {
        newCategory: action.category,
      });
    case SET_SUB_CATEGORY:
      return Object.assign({}, state, {
        newSubCategory: action.subCategory,
      });
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
    case SET_IMAGE_URL:
      return Object.assign({}, state, {
        imageUrl: action.imageUrl,
      });
    case SET_UPLOADING_IMAGE:
      return Object.assign({}, state, {
        uploadingImage: action.bool,
      });
    case SET_SECURITY_KEY:
      return Object.assign({}, state, {
        securityKey: action.key,
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    case SET_FILTERED_CATEGORIES:
      return Object.assign({}, state, {
        filteredCategories: action.cat,
      });
    case SET_FILTERED_SUB_CATEGORIES:
      return Object.assign({}, state, {
        filteredSubCategories: action.cat,
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
    case SET_DELETING_ITEM:
      return Object.assign({}, state, {
        deletingItem: action.item,
      });
    default:
      return state;
  }
}

export default AdminReducer;