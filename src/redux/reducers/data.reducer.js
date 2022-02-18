const dataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    case 'UNSET_DATA':
      return [];
    default:
      return state;
  }
};

export default dataReducer;