import * as React from 'react';

import './MyList.css';

import { Card, CardContent, CardMedia, CardActions, Typography, CardHeader, Grid } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IMyListCard
{
  product: IProduct;
}
const MyListCard = (props: IMyListCard) =>
{
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
            {props.product && props.product.name}
          </Typography>
        }
      />
      <CardMedia
        className="media"
        image={props.product && props.product.image}
      />
      <CardContent>
        <Typography component="p">
          Price: {
            props.product && props.product.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
          } <br />
          Content: {
            props.product && props.product.packageSize
          } {
            props.product && props.product.hasCupString && `(${props.product && props.product.cupString})`
          }
        </Typography>
      </CardContent>
      <CardActions />
    </Card>
  );
};

export default MyListCard;
