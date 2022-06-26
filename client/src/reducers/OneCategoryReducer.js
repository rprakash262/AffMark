import { mainActions } from '../actions';

const { fetchOneCategoryContent } = mainActions;

const SET_CONTENT = 'oneCategory/SET_CONTENT';
const SET_LOADING_DATA  = 'oneCategory/SET_LOADING_DATA ';
const SET_LOGGED_IN  = 'oneCategory/SET_LOGGED_IN ';

const setContent = content => ({ type: SET_CONTENT, content });
const setLoadingData = bool => ({ type: SET_LOADING_DATA, bool });
const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });

const defaultState = {
  loggedIn: false,
  oneCategoryContent: {},
  loadingData: false,
};

const init = categoryId => async (dispatch, getState) => {
  dispatch(setLoadingData(true));

  const loggedIn = await localStorage.getItem('loggedIn');

  if (loggedIn) {
    dispatch(setLoggedIn(true));
  }

  try {
    const response2 = await fetchOneCategoryContent(categoryId);

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

function OneCategoryReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CONTENT:
      return Object.assign({}, state, {
        oneCategoryContent: action.content,
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

export default OneCategoryReducer;