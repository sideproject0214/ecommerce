import { ADD_ALERTSIDE, REMOVE_ALERTSIDE } from "../constant/alertConstant";

const initialState = [
  // {
  //   id: Math.random(),
  //   type: "SUCCESS",
  //   message: "성공",
  // },
];

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERTSIDE:
      return [...state, { ...action.payload }];
    case REMOVE_ALERTSIDE:
      return state.filter((e) => e.id !== action.id);

    default:
      return state;
  }
};

export default alertReducer;
