const overallReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_OVERALL_DATA':
      return action.payload;
    case 'UNSET_OVERALL_DATA':
      return [];
    default:
      return state;
  }
};

export default overallReducer;