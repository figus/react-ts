import * as React from 'react';

import { connect } from 'react-redux';

import SearchArea from './SearchArea';
import ResultsArea from './ResultsArea';
import IReduxState from '../../interfaces/IReduxState';
import { addSearchHistoryTerm } from '../../actions/SearchActions';
import { busqueda } from './../../Api/Products';
import ICard from '../../interfaces/ICard';

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
      const resultados: ICard[] = await busqueda(term);

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
  };
};

const mapDispatchToProps = (dispatch: any) =>
{
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
