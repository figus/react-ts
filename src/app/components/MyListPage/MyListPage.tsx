import * as React from 'react';
import IReduxState from '../../interfaces/IReduxState';
import { connect } from 'react-redux';
import ISearchResult from '../../interfaces/ISearchResult';
import MyListArea from './MyListArea';

interface IMyListPage
{
  myList: string[];
}
interface IState
{
  products: ISearchResult[];
}
class MyListPage extends React.Component<IMyListPage, IState> {
  constructor(props, context)
  {
    super(props, context);

    this.state = {
      products: [],
    };
  }

  public render()
  {
    return (
      <div>
        <MyListArea barcodeList={this.props.myList} />
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxState) =>
{
  return {
    myList: state.myList,
  };
};

export default connect(mapStateToProps)(MyListPage);
