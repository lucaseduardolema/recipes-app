const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case 'USER':
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default user;
