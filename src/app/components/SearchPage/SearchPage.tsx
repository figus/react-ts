import * as React from 'react';

import { connect } from 'react-redux';

import SearchArea from './SearchArea';
import ResultsArea from './ResultsArea';
import IReduxState from '../../interfaces/IReduxState';
import { addSearchHistoryTerm } from '../../actions/SearchActions';
import IProduct from '../../interfaces/IProduct';
import { productSearchAsync, searchWoolworthsAsync, swt, gcp } from './../../Api/Products';

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
      this.performSearchAsync(term);
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

  private async handleSearch(event: React.SyntheticEvent)
  {
    event.preventDefault();

    const term: string = (document.querySelector('#searchField') as HTMLInputElement).value;
    this.props.history.push('/search/' + term);

    this.performSearchAsync(term);
  }

  private async performSearchAsync(term: string)
  {
    this.setState({
      searching: true,
    });

    try
    {
      const isBarcode = term.match(/^\d+$/g) ? true : false;
      const resultados = await swt(term, isBarcode);

      this.setState({
        searchTerm: term,
        searchResults: resultados,
        searching: false,
      });

    } catch (err)
    {
      this.setState({
        searching: false,
      });
    }
  }
}

const mapStateToProps = (state: IReduxState) =>
{
  return {
    searchHistoryTerms: state.searchHistoryTerms,
    searchResults: state.searchResults,
  };
};

const mapDispatchToProps = (dispatch: any) =>
{
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
