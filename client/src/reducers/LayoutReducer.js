import { mainActions } from '../actions';

const { fetchNavbar } = mainActions;

const SET_ALERT = 'LayoutReducer/SET_ALERT';
const HIDE_ALERT = 'LayoutReducer/HIDE_ALERT';
const SET_NAVBAR = 'LayoutReducer/SET_NAVBAR';
const TOGGLE_EDIT_ITEM_MODAL = 'LayoutReducer/TOGGLE_EDIT_ITEM_MODAL';
const TOGGLE_CONFIRM_DELETE_ITEM_PROPMT = 'LayoutReducer/TOGGLE_CONFIRM_DELETE_ITEM_PROPMT';
const CHANGE_SEARCH_TEXT = 'LayoutReducer/CHANGE_SEARCH_TEXT';
const CHANGE_SEARCH_FLAG = 'LayoutReducer/CHANGE_SEARCH_FLAG';

const setNavbar = navbar => ({ type: SET_NAVBAR, navbar });
const toggleEditItemModal = bool => ({ type: TOGGLE_EDIT_ITEM_MODAL, bool });
const toggleConfirmDeleteItemPrompt = bool => ({ type: TOGGLE_CONFIRM_DELETE_ITEM_PROPMT, bool });
const changeSearchText = val => ({ type: CHANGE_SEARCH_TEXT, val });

const defaultState = {
  editItemModal: false,
  confirmDeleteItemPrompt: false,
  showAlert: false,
  alertType: '',
  alertMsg: '',
  navbar: {},
  searchText: '',
  searchFlag: false,
};

const init = () => async dispatch => {
  try {
    const response = await fetchNavbar();

    const { result } = response;

    dispatch(setNavbar(result));
  } catch (err) {
    console.log(err);
  }
}

const startSearch = (e) => async (dispatch, getState) => {
  const { searchText } = getState().layout;


  if (e.charCode == 13) {
    localStorage.setItem('query', searchText);
    window.location.href = `/search?q=${searchText}`;
  }
}

export const ACTIONS = {
  init,
  hideAlert: () => ({ type: HIDE_ALERT }),
  setAlert: (bool, alertType, alertMsg) => ({ type: SET_ALERT, bool, alertType, alertMsg }),
  showEditItemModal: () => toggleEditItemModal(true),
  hideEditItemModal: () => toggleEditItemModal(false),
  showConfirmDeleteItemPrompt: () => toggleConfirmDeleteItemPrompt(true),
  hideConfirmDeleteItemPrompt: () => toggleConfirmDeleteItemPrompt(false),
  changeSearchText,
  startSearch,
};

function LayoutReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALERT:
      return Object.assign({}, state, {
        showAlert: action.bool,
        alertType: action.alertType,
        alertMsg: action.alertMsg,
      });
    case HIDE_ALERT:
      return Object.assign({}, state, {
        showAlert: false
      });
    case SET_NAVBAR:
      return Object.assign({}, state, {
        navbar: action.navbar
      });
    case TOGGLE_EDIT_ITEM_MODAL:
      return Object.assign({}, state, {
        editItemModal: action.bool
    });
    case TOGGLE_CONFIRM_DELETE_ITEM_PROPMT:
      return Object.assign({}, state, {
        confirmDeleteItemPrompt: action.bool
      });
    case CHANGE_SEARCH_TEXT:
      return Object.assign({}, state, {
        searchText: action.val
      });
    default:
      return state;
  }
}

export default LayoutReducer;