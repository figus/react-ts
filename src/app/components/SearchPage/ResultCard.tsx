import * as React from 'react';

import './Search.css';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';

import { connect } from 'react-redux';
import * as actions from './../../actions/SearchActions';
import IReduxState from '../../interfaces/IReduxState';
import ICard from '../../interfaces/ICard';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IStateProps
{
  myList: string[];
  searchResults: ICard[];
}
interface IOwnProps
{
  product: ICard;
}
interface IDispatchProps
{
  addToMyList: (barcode: string) => void;
}
interface IResultCard extends IStateProps, IOwnProps, IDispatchProps { }

const ResultCard = (props: IResultCard) =>
{

  const addHandler = (barcode: string) =>
  {
    if (props.myList.filter((code) => barcode === code).length === 0)
    {
      props.addToMyList(barcode);
    }
  };

  if (props.product === undefined)
  {
    return (
      <Card className="card">
        <CardHeader
          title={
            <Typography
              className="title"
            >
              Loading...
            </Typography>
          }
        />
        <CardContent className="contentLoading">
          <CircularProgress size={50} />
        </CardContent>
        <CardActions />
      </Card>
    );
  }

  return (
    <Card className="card">
      <CardHeader
        title={
          <Typography
            className="title"
          >
            {props.product.name}
          </Typography>
        }
      />
      <CardMedia
        className="media"
        image={props.product.imageUrl}
      />
      <CardContent>
        <Typography
          component="p"
        >
          Content: {props.product.size}
        </Typography>
        {
          props.product.prices.map((item) =>
          {
            return (
              // tslint:disable-next-line:jsx-key
              <Typography
                key={item.id}
                component="p"
              >
                {
                  item.store && item.store.toUpperCase()
                } price: {
                  item.price && item.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
                } {
                  `(${item.cupString})`
                }
              </Typography>
            );
          })
        }
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          className="addButton"
          onClick={addHandler.bind(this, props.product.barcode)}
        >
          Add to my list
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (store: IReduxState) =>
{
  return {
    myList: store.myList,
    searchResults: store.searchResults,
  };
};

const mapDispatchToProps = (dispatch: any) =>
{
  return {
    addToMyList: (barcode: string) => dispatch(actions.addToMyList(barcode)),
  };
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(ResultCard);
