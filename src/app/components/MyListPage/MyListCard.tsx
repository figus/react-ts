import * as React from 'react';

import './MyList.css';

import { Card, CardContent, CardMedia, CardActions, Typography, CardHeader, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ICard from '../../interfaces/ICard';

interface IMyListCard
{
  product: ICard;
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
        image={props.product && props.product.imageUrl}
      />
      <CardContent>
        <Typography component="p">
          Content: {
            props.product && props.product.size
          }
        </Typography>
        {
          props.product.prices.map((item) =>
          {
            return (
              <Typography component="p" key={item.id}>
                {item.store} price: {
                  props.product && item.price.toLocaleString('en-AU', { style: 'currency', currency: 'AUD' })
                } {
                  props.product && `(${props.product && item.cupString})`
                }
              </Typography>
            );
          })
        }
      </CardContent>
      <CardActions />
    </Card>
  );
};

export default MyListCard;
