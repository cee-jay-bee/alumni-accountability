const cohortReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_COHORT':
        return action.payload;
      case 'UNSET_COHORT':
        return [];
      default:
        return state;
    }
  };
  

  export default cohortReducer;