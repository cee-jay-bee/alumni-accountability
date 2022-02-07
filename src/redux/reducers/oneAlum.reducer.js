const oneAlumReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_ONE_ALUM':
        return action.payload;
      case 'UNSET_ONE_ALUM':
        return {};
      default:
        return state;
    }
  };
  
  export default oneAlumReducer;
  

