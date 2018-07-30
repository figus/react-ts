import * as React from 'react';

import { connect } from 'react-redux';

import SearchArea from './SearchArea';
import ResultsArea from './ResultsArea';
import IReduxState from '../../interfaces/IReduxState';
import { addSearchHistoryTerm } from '../../actions/SearchActions';
import IProduct from '../../interfaces/IProduct';
import { productSearch } from './../../Api/Products';

class SearchPage extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      searchTerm: '',
      searchResults: [],
      searching: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event: React.SyntheticEvent) {
    event.preventDefault();
    this.setState({
      searching: true
    });

    let term: string = (document.querySelector(
      '#searchField'
    ) as HTMLInputElement).value;

    productSearch(term)
      .then((products: IProduct[]) => {
        this.setState({
          searchTerm: term,
          searchResults: products,
          searching: false
        });
      })
      .catch(err => {
        this.setState({
          searching: false
        });
      });
  }

  render() {
    return (
      <div>
        <SearchArea
          searchAction={this.handleSearch}
          searching={this.state.searching}
        />
        <ResultsArea results={this.state.searchResults} />
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
  return {
    searchHistoryTerms: state.searchHistoryTerms
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
