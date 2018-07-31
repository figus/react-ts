import * as React from 'react';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  card: {
    width: 200,
    height: 374,
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
  },
  contentLoading: {
    marginTop: '40%',
    marginLeft: '25%',
  },
};
interface IMyListCard
{
  product: IProduct;
}
const MyListCard = (props: IMyListCard) =>
{
  if (props.product === undefined)
  {
    return (
      <Card style={styles.card}>
        <CardHeader
          title={
            <Typography
              style={styles.title}
            >
              Loading...
            </Typography>
          }
        />
        <CardContent style={styles.contentLoading}>
          <CircularProgress size={50} />
        </CardContent>
        <CardActions />
      </Card>
    );
  }

  return (
    <Card style={styles.card}>
      <CardHeader
        title={
          <Typography
            style={styles.title}
          >
            {props.product && props.product.name}
          </Typography>
        }
      />
      <CardMedia
        style={styles.media}
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
