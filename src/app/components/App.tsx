import * as React from "react";

import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../config/theme';

import UpperBar from "./Upperbar";
import SearchArea from './SearchArea';
import ResultsArea from "./ResultsArea";
import IState from '../interfaces/IState';
import { addSearchHistoryTerm } from '../actions/SearchActions';

class App extends React.Component {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      searchTerm: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event: React.SyntheticEvent) {
    event.preventDefault();
    let term: string = (document.querySelector('#searchField') as HTMLInputElement).value;
    
    let queryUrl =  'https://thingproxy.freeboard.io/fetch/https://www.woolworths.com.au/apis/ui/Search/products';
    let queryMethod = 'POST';
    let query = {
      "SearchTerm": term,
      "PageSize": 24, 
      "PageNumber": 1,
      "SortType": "TraderRelevance",
      "IsSpecial": false,
      "Location":"/shop/search/products?searchTerm=" + term
    };

    fetch(queryUrl, {
      method: queryMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(query),
    }).then(resp => console.log(resp.json()));
    
  }

  render() {
    return (
      <CssBaseline>
        <Theme>
          <UpperBar />
          <SearchArea searchAction={this.handleSearch} />
          <ResultsArea />
        </Theme>
      </CssBaseline>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    searchHistoryTerms: state.searchHistoryTerms
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);