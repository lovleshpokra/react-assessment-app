import {
  GET_PACKAGEDETAILS, SET_PACKAGEDETAILS, APPLY_PROMOCODE, ADD_DISCOUNT, REMOVE_PROMOCODE
} from './constants';

// The initial state of the App
const initialState = {
  packageDetail: {},
  planId: '',
  promoDetails: {},
  discount: {}
};

function packageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGEDETAILS:
      return {
        ...state, packageDetail: {}, planId: action.planId, discount: {}
      };
    case SET_PACKAGEDETAILS:
      return { ...state, packageDetail: action.packageDetail, discount: {} };
    case APPLY_PROMOCODE:
      return { ...state, promoDetails: action.promoDetails, discount: {} };
    case ADD_DISCOUNT:
      return { ...state, discount: { amt: action.discount, error: action.error } };
    case REMOVE_PROMOCODE:
      return { ...state, discount: {} };
    default:
      return state;
  }
}

export default packageReducer;
