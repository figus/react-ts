import * as actions from './ActionTypes';

export const addSearchHistoryTerm = (term: string) => ({
  type: actions.ADD_SEARCH_HISTORY_TERM,
  payload: term,
});

export const addToMyList = (barcode: string) => ({
  type: actions.ADD_TO_MY_LIST,
  payload: barcode,
})