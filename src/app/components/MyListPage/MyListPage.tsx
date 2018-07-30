import * as React from 'react';
import IReduxState from '../../interfaces/IReduxState';
import { connect } from 'react-redux';
import IProduct from './../../interfaces/IProduct';
import * as ProductFn from './../../Api/Products';
import MyListArea from './MyListArea';

interface IMyListPage {
  myList: string[],
}
interface IState {
  products: IProduct[],
}
class MyListPage extends React.Component<IMyListPage, IState> {
  constructor(props, context) {
    super(props, context);

    this.state = {
      products: [],
    }
  }

  getAllProducts = (list: string[]) => {
    list.forEach((item: string) => {
      ProductFn.barcodeSearch(item).then((res: IProduct) => {
        this.setState((prevState: IState) => ({
          products: prevState.products.concat(res)
        }));
      });
    });
  };

  componentDidMount() {
    this.getAllProducts(this.props.myList);
  }

  render() {
    return(
      <div>
        {this.props.myList}
        <MyListArea products={this.state.products} />
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState) => {
  return {
    myList: state.myList,
  };
};

export default connect(mapStateToProps)(MyListPage);