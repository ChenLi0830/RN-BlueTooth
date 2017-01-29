// Action creator

export const changeTab = (tab) => {
  return (dispatch) => {
    dispatch({
      type: "CHANGE_TAB",
      payload: tab,
    });
  }
};

// reducer
const tab = {
  tab: 0, // or 1
};

const reducer = (state = tab, action) => {
  switch (action.type) {
    case "CHANGE_TAB":
      return {...state, tab: action.payload};
    default:
      return state;
  }
};

export default reducer;