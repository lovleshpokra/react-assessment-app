import { GET_PUBLICATION, SET_PUBLICATION } from './constants';

export function getPublication() {
  return {
    type: GET_PUBLICATION
  };
}
export function publicationLoaded(publication) {
  return {
    type: SET_PUBLICATION,
    publication
  };
}
export function publicationLoadingError(error) {
  return {
    type: SET_PUBLICATION,
    error,
    publication: []
  };
}
