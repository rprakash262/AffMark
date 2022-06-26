import { mainActions } from '../actions';

const { fetchHomePageContent } = mainActions;

const SET_HOME_PAGE_CONTENT = 'homePage/SET_HOME_PAGE_CONTENT';
const SET_LOADING_HOME_PAGE  = 'homePage/SET_LOADING_HOME_PAGE ';
const SET_FEATURED_ITEMS  = 'homePage/SET_FEATURED_ITEMS ';
const SET_LOGGED_IN  = 'homePage/SET_LOGGED_IN ';

const setLoggedIn = bool => ({ type: SET_LOGGED_IN, bool });
const setHomePageContent = content => ({ type: SET_HOME_PAGE_CONTENT, content });
const setLoadingHomePage = bool => ({ type: SET_LOADING_HOME_PAGE, bool });
const setFeaturedItems = items => ({ type: SET_FEATURED_ITEMS, items });

const defaultState = {
  loggedIn: false,
  homePageContent: {},
  featuredItems: [],
  loadingHomePage: false,
};

const init = () => async dispatch => {
  dispatch(setLoadingHomePage(true));

  const loggedIn = await localStorage.getItem('loggedIn');

  if (loggedIn) {
    dispatch(setLoggedIn(true));
  }

  try {
    const response = await fetchHomePageContent();

    const { result } = response;
    const { items, featuredItems } = result;

    dispatch(setFeaturedItems(featuredItems));
    dispatch(setHomePageContent(items));
    dispatch(setLoadingHomePage(false));
  } catch (err) {
    console.error(err);
    dispatch(setLoadingHomePage(false));
  }
}

export const ACTIONS = {
  init,
};

function HomePageReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_HOME_PAGE_CONTENT:
      return Object.assign({}, state, {
        homePageContent: action.content,
      });
    case SET_LOADING_HOME_PAGE:
      return Object.assign({}, state, {
        loadingHomePage: action.bool,
      });
    case SET_FEATURED_ITEMS:
      return Object.assign({}, state, {
        featuredItems: action.items,
      });
    case SET_LOGGED_IN:
      return Object.assign({}, state, {
        loggedIn: action.bool,
      });
    default:
      return state;
  }
}

export default HomePageReducer;