import {
  GET_TESTIMONIALS, SET_TESTIMONIALS, GET_PROFILE, SET_PROFILE, SET_DASHBOARD, GET_DASHBOARD
} from './constants';
import {
  SET_SETUP_DATA
} from '../Auth/constants';


export function getTestimonials() {
  return {
    type: GET_TESTIMONIALS
  };
}
export function testimonialsLoaded(testimonials) {
  return {
    type: SET_TESTIMONIALS,
    testimonials
  };
}
export function testimonialsLoadingError(error) {
  return {
    type: SET_TESTIMONIALS,
    error,
    testimonials: []
  };
}

export function getProfile() {
  return {
    type: GET_PROFILE
  };
}
export function profileLoaded(profile) {
  return {
    type: SET_PROFILE,
    profile
  };
}
export function profileLoadingError(error) {
  return {
    type: SET_PROFILE,
    error,
    profile: {}
  };
}


export function getDashboard() {
  return {
    type: GET_DASHBOARD
  };
}
export function dashboardLoaded(dashboard) {
  return {
    type: SET_DASHBOARD,
    dashboard
  };
}
export function dashboardLoadingError(error) {
  return {
    type: SET_DASHBOARD,
    error,
    dashboard: {}
  };
}


export function setSetupData(setupData) {
return {
  type: SET_SETUP_DATA,
  setupData
}};