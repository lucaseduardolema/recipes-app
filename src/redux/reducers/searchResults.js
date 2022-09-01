import { SEARCH_RESULTS } from '../actions';

const INITIAL_STATE = {
  results: [],
};

const searchResults = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SEARCH_RESULTS:
    return {
      results: payload,
    };
  default:
    return state;
  }
};

export default searchResults;
