import * as React from "react";

import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../../config/theme';

import UpperBar from "./../Upperbar";
import SearchArea from './SearchArea';
import ResultsArea from "./ResultsArea";
import IReduxState from '../../interfaces/IReduxState';
import { addSearchHistoryTerm } from '../../actions/SearchActions';
import IProduct from "../../interfaces/IProduct";

class SearchPage extends React.Component<any, any> {
  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      searchTerm: '',
      searchResults: []
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
    }).then(resp => resp.json())
    .then(resp => {
      let products: IProduct[] = [];
      resp.Products.map(prods => {
        prods.Products.map(pro => {
          products.push({
            barcode: pro.Barcode,
            hasCupString: pro.HasCupString,
            cupString: pro.CupString,
            image: pro.MediumImageFile,
            name: pro.Name,
            price: pro.Price,
            packageSize: pro.PackageSize,
            origin: 'woolworths'
          })
        });
      });

      console.log(products);

      this.setState({
        searchTerm: term,
        searchResults: products,
      });
    })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <SearchArea 
          searchAction={this.handleSearch}
          searching={true} />
        <ResultsArea results={this.state.searchResults} />
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
  return {
    searchHistoryTerms: state.searchHistoryTerms
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addSearchHistoryTerm: (term: string) => dispatch(addSearchHistoryTerm(term))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);