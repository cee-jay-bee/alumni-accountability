const skillReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_SKILL':
      return action.payload;
    case 'UNSET_SKILL':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default skillReducer;
