const snackReducer = (state = "", action) => {
    switch (action.type) {
      case 'EVENT_NOTE_SUCCESS_DELETE':
        return "note success delete";
      case 'EVENT_TAG_SUCCESS_UPDATE':
        return "Event tag succcesfully updated";
      case 'EVENT_NOTE_UNSUCCESSFULL_DELETE':
        return "note unsuccess delete";
      case 'CLEAR_SNACKBAR':
        return "";
      default:
        return state;
    }
  };
  
  export default snackReducer;