import * as React from 'react';

import { connect } from 'react-redux';

import SearchArea from './SearchArea';
import ResultsArea from './ResultsArea';
import IReduxState from '../../interfaces/IReduxState';
import { addSearchHistoryTerm } from '../../actions/SearchActions';
import IProduct from '../../interfaces/IProduct';
import { productSearch, searchWooliesBarcodeAsync } from './../../Api/Products';

class SearchPage extends React.Component<any, any> {
  constructor(props: any, context: any)
  {
    super(props, context);

    this.state = {
      searchTerm: '',
      searchResults: [],
      searching: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  public componentDidMount()
  {
    const term: string = this.props.match.params.term || '';
    if (term)
    {
      this.performSearch(term);
    }
  }

  public render()
  {
    return (
      <div>
        <SearchArea
          searchAction={this.handleSearch}
          searching={this.state.searching}
          initialText={this.props.match.params.term || ''}
        />
        <ResultsArea results={this.state.searchResults} />
      </div>
    );
  }

  private handleSearch(event: React.SyntheticEvent)
  {
    event.preventDefault();

    const term: string = (document.querySelector('#searchField') as HTMLInputElement).value;
    this.props.history.push('/search/' + term);

    this.performSearch(term);
  }

  private performSearch(term: string)
  {
    this.setState({
      searching: true,
    });

    searchWooliesBarcodeAsync(term)
      .then((products: IProduct[]) =>
      {
        this.setState({
          searchTerm: term,
          searchResults: products,
          searching: false,
        });
      })
      .catch(() =>
      {
        this.setState({
          searching: false,
        });
      });
  }
}

const mapStateToProps = (state: IReduxState) =>
{
  return {
    searchHistoryTerms: state.searchHistoryTerms,
  };
};

const mapDispatchToProps = (dispatch: any) =>
{
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
