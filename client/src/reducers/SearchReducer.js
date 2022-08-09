import { mainActions } from '../actions';

const { searchQuery } = mainActions;

const SET_SEARCH_FLAG = 'SearchReducer/SET_SEARCH_FLAG';

const setSearchFlag = bool => ({ type: SET_SEARCH_FLAG, bool });

const defaultState = {
  searchFlag: false,
};

const init = () => async dispatch => {
  dispatch(setSearchFlag(true));

  const query = localStorage.getItem('query');
    console.log({query})

  try {
    const res = await searchQuery(query);
    console.log({res})
    dispatch(setSearchFlag(false));
  } catch (err) {
    console.log(err);
  }
}

const startSearch = (e) => async (dispatch, getState) => {

}

export const ACTIONS = {
  init,
  startSearch,
};

function SearchReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SEARCH_FLAG:
      return Object.assign({}, state, {
        searchFlag: action.bool
      });
    default:
      return state;
  }
}

export default SearchReducer;