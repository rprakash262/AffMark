import { mainActions } from '../actions';

const { fetchOneSubcategoryContent } = mainActions;

const SET_CONTENT = 'oneSubCategory/SET_CONTENT';
const SET_LOADING_DATA  = 'oneSubCategory/SET_LOADING_DATA ';
const SET_LOGGED_IN  = 'homePage/SET_LOGGED_IN ';

const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setContent = content => ({ type: SET_CONTENT, content });
const setLoadingData = bool => ({ type: SET_LOADING_DATA, bool });

const defaultState = {
  oneSubCategoryContent: [],
  loadingData: false,
};

const init = subCategoryId => async (dispatch, getState) => {
  dispatch(setLoadingData(true));

  const loggedIn = await localStorage.getItem('loggedIn');

  if (loggedIn) {
    dispatch(setLoggedIn(true));
  }
  
  try {
    const response2 = await fetchOneSubcategoryContent(subCategoryId);

    const { result } = response2;

    dispatch(setContent(result));
    dispatch(setLoadingData(false));
  } catch (err) {
    console.error(err);
    dispatch(setLoadingData(false));
  }
}

export const ACTIONS = {
  init,
};

function OneSubCategoryReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return Object.assign({}, state, {
        oneSubCategoryContent: action.content,
      });
    case SET_LOADING_DATA:
      return Object.assign({}, state, {
        loadingData: action.bool,
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    default:
      return state;
  }
}

export default OneSubCategoryReducer;