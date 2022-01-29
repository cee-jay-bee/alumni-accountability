const eventAttendanceReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EVENT_ATTENDANCE':
        return action.payload;
      case 'UNSET_EVENT_ATTENDANCE':
        return [];
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default eventAttendanceReducer;
  