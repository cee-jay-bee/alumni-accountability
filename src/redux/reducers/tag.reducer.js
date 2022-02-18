const tagReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TAG':
      return action.payload;
    case 'ADD_TAG':
      return [...state,action.payload];
    case 'UNSET_TAG':
      return [];
    default:
      return state;
  }
};

export default tagReducer;