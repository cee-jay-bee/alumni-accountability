const alumNoteReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ALUMNOTE':
      return action.payload;
    case 'UNSET_ALUMNOTE':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default alumNoteReducer;
