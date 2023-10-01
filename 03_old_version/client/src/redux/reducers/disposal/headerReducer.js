const initialState = {
  locationChange: false,
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE":
      return {
        locationChange: true,
      };

    default:
      return state;
  }
};

export default headerReducer;
