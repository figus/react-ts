import * as actions from '../actions/ActionTypes';
import IState from '../interfaces/IReduxState';

interface IAction {
  type: string,
  payload: string
}

const initialState: IState = {
  searchHistoryTerms: []
};

const rootReducer = (state = initialState, action: IAction) => {
  switch(action.type) {
    case actions.ADD_SEARCH_HISTORY_TERM:
      return {
        ...state,
        searchHistoryTerms: [
          ...state.searchHistoryTerms, 
          action.payload
        ],
      };
    default:
      return state;    
  }
};

export default rootReducer;