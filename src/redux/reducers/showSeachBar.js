import { SHOW_SEARCH_BAR } from '../actions';

const INITIAL_STATE = {
  show: false,
};

const showSearchBar = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case SHOW_SEARCH_BAR:
    return {
      show: !state.show,
    };
  default:
    return state;
  }
};

export default showSearchBar;
