import * as React from 'react';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';

interface IResultCard {
  product: any,
}

const styles = {
  card: {
    width: 200,
  },
  media: {
    height: 200,
  },
  title: {
    fontSize: "1rem",
    fontWeight: 500
  }
}

const ResultCard = (props: IResultCard) => {
  return (
    <Card style={styles.card}>
      <CardHeader 
        title={props.product.SmallFormatDescription}
        style={styles.title} />
      <CardMedia
        style={styles.media}
        image={props.product.MediumImageFile} />
      <CardContent>
        <Typography component="p">
          Price: {props.product.Price} <br />
          Content: {props.product.PackageSize} {props.product.HasCupPrice && `(${props.product.CupString})`}
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