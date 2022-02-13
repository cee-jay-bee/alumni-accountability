const searchReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SKILL_SEARCH':
        return action.payload;
      case 'UNSET_SKILL_SEARCH':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default searchReducer;