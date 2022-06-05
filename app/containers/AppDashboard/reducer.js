import {
  GET_TESTIMONIALS, SET_TESTIMONIALS, GET_PROFILE, SET_PROFILE, SET_DASHBOARD, GET_DASHBOARD
} from './constants';
import {
  SET_SETUP_DATA
} from '../Auth/constants';

// The initial state of the App
const initialState = {
  testimonials: [],
  profile: {},
  dashboard: {},
  setupData: {}
};

function appDashboardReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TESTIMONIALS:
      if (!state.testimonials.length) {
        return { ...state, testimonials: [] };
      }

      return state;

    case SET_TESTIMONIALS:
      return { ...state, testimonials: action.testimonials };
    case GET_PROFILE:
      if (!state.profile.profile) {
        return { ...state, profile: {} };
      }

      return state;

    case SET_PROFILE:
      return { ...state, profile: action.profile };
    case GET_DASHBOARD:
      if (!state.dashboard.RecentExam) {
        return { ...state, dashboard: {} };
      }

      return state;

    case SET_DASHBOARD:
      return { ...state, dashboard: action.dashboard };

      
    case       SET_SETUP_DATA:
      return { ...state, setupData: action.setupData };


    default:
      return state;
  }
}

export default appDashboardReducer;
