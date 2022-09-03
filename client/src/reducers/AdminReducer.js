import { cloneDeep } from 'lodash';

import { adminActions } from '../actions';
import { ACTIONS as layoutActions } from './LayoutReducer';

const {
  getCategories,
  getSubCategories,
} = adminActions;

const SET_SECURITY_KEY = 'admin/SET_SECURITY_KEY';
const SET_LOGGED_IN = 'admin/SET_LOGGED_IN';
const SET_SELECTED_TAB = 'admin/SET_SELECTED_TAB';
const SET_ALL_CATEGORIES = 'admin/SET_ALL_CATEGORIES';
const SET_ALL_SUB_CATEGORIES = 'admin/SET_ALL_SUB_CATEGORIES';

const changeSecurityKey = key => ({ type: SET_SECURITY_KEY, key });
const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setSelectedTab = selectedTab => ({ type: SET_SELECTED_TAB, selectedTab });
const setAllCategories = arr => ({ type: SET_ALL_CATEGORIES, arr });
const setAllSubCategories = arr => ({ type: SET_ALL_SUB_CATEGORIES, arr });

const defaultState = {
  loggedIn: false,
  securityKey: '',
  selectedTab: 'addNewCategory',
  allCategories: [],
  allSubCategories: [],
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

export const ACTIONS = {
  init,
  setSelectedTab,
  changeSecurityKey,
  submitSecurityKey,
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
    default:
      return state;
  }
}

export default AdminReducer;