const tagReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_TAG':
      return action.payload;
    case 'UNSET_TAG':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default tagReducer;
