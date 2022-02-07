const oneCohortReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ONE_COHORT':
      return action.payload;
    case 'UNSET_ONE_COHORT':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default oneCohortReducer;
