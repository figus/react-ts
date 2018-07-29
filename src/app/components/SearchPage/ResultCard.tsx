import * as React from 'react';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';

import { connect } from 'react-redux';
import * as actions from './../../actions/SearchActions';
import IReduxState from '../../interfaces/IReduxState';

const styles = {
  card: {
    width: 200,
    height: '100%'
  },
  media: {
    height: 200,
  },
  title: {
    fontSize: '0.875rem',
    fontWeight: 500,
    minHeight: 40,
    maxHeight: 40,
    overflow: 'hidden',
  }, 
  addButton: {
    marginLeft: 'auto',
  }
}

interface IStateProps {
  myList: string[],
}
interface IOwnProps {
  product: IProduct,
}
interface IDispatchProps {
  addToMyList: (barcode: string) => void,
}
interface IResultCard extends IStateProps, IOwnProps, IDispatchProps {}

const ResultCard = (props: IResultCard) => {
  
  const addHandler = (barcode: string) => {
    console.log(barcode);
    console.log(props.myList.filter((code) => barcode == code));
    if(props.myList.filter((code) => barcode == code).length === 0)
    {
      props.addToMyList(barcode);
    }
  };

  return (
    <Card style={styles.card}>
      <CardHeader 
        title={
          <Typography
            style={styles.title}>
            {props.product.name}
          </Typography>
        } />
      <CardMedia
        style={styles.media}
        image={props.product.image} />
      <CardContent>
        <Typography component="p">
          Price: {props.product.price.toLocaleString('en-AU', {style: 'currency', currency: 'AUD'})} <br />
          Content: {props.product.packageSize} {props.product.hasCupString && `(${props.product.cupString})`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small"
          color="primary"
          style={styles.addButton}
          onClick={addHandler.bind(this, props.product.barcode)}>
          Add to my list
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (store: IReduxState) => {
  return {
    myList: store.myList,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
      addToMyList: (barcode: string) => dispatch(actions.addToMyList(barcode)),
  };
};

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(ResultCard);
