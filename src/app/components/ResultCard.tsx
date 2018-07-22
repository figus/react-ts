import * as React from 'react';

import { Card, CardContent, CardMedia, CardActions, Button, Typography, CardHeader } from '@material-ui/core';

const styles = {
  card: {
  },
  media: {
    height: 200,
  }
}

const ResultCard = () => {
  return (
    <Card style={styles.card}>
      <CardHeader
        title="Titulo" />
      <CardMedia
        style={styles.media}
        image="http://placebear.com/300/200" />
      <CardContent>
        <Typography component="p">
          Contenido de la tarjeta
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