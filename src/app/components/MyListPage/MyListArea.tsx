import * as React from 'react';
import MyListCard from './MyListCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';
import IProduct from '../../interfaces/IProduct';

interface IStateProps
{
}
interface IOwnProps
{
  products: IProduct[];
}
interface IMyListAreaProps extends IStateProps, IOwnProps { }

const MyListArea = (props: IMyListAreaProps) =>
{
  return (
    <Grid container justify="center" alignItems="stretch" spacing={0}>
      {props.products.map((product: IProduct) =>
      {
        return (
          <Grid
            item
            key={product.barcode}
            style={{
              margin: spacing.unit
            }}
          >
            <MyListCard product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MyListArea;
