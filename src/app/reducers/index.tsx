import * as actions from '../actions/ActionTypes';
import IState from '../interfaces/IReduxState';

interface IAction {
  type: string,
  payload: string
}

const initialState: IState = {
  searchHistoryTerms: [],
  myList: [],
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
    case actions.ADD_TO_MY_LIST:
      return {
        ...state,
        myList: [
          ...state.myList,
          action.payload
        ],
      };
    default:
      return state;    
  }
};

export default rootReducer;