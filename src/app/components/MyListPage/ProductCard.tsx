import * as React from 'react';
import MyListCard from './MyListCard';
import IProduct from '../../interfaces/IProduct';
import { Grid } from '@material-ui/core';

interface IProps {
  product: IProduct;
}

const ProductCard = (props: IProps) =>
{
  return (
    <Grid
      item={true}
      key={props.product && props.product.barcode}
      style={{
        margin: 8,
      }}
    >
      <MyListCard product={props.product} />
    </Grid>
  );
};

export default ProductCard;
