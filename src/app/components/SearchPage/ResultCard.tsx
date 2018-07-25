import * as React from 'react';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';

interface IResultCard {
  product: IProduct,
}

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
  }
}

const ResultCard = (props: IResultCard) => {
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
          color="primary">
          Action 1
        </Button>
        <Button 
          size="small"
          color="primary">
          Action 2
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResultCard;