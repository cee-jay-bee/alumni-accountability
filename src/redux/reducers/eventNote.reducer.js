const eventNoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENTNOTE':
      return action.payload;
    case 'UNSET_EVENTNOTE':
      return [];
    default:
      return state;
  }
};

export default eventNoteReducer;