const alumReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALUM':
      return action.payload;
    case 'UNSET_ALUM':
      return [];
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default alumReducer;
