import * as actions from './ActionTypes';

export const addSearchHistoryTerm = (term: string) => ({
  type: actions.ADD_SEARCH_HISTORY_TERM,
  payload: term,
});
