import * as React from 'react';
import { Grid } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';
import * as ProductFn from './../../Api/Products';
import ProductCard from './ProductCard';
import Async from 'react-promise';

interface IMyListAreaProps
{
  // products: IProduct[];
  barcodeList: string[];
}

const productCard = (product: IProduct) =>
{
  return (
    <ProductCard product={product} />
  );
};

const MyListArea = (props: IMyListAreaProps) =>
{

  return (
    <Grid container={true} justify="center" alignItems="stretch" spacing={0}>
      {
        ProductFn.barcodeListSearchAsync(props.barcodeList).map((pp: Promise<IProduct>) =>
        {
          return (
            // tslint:disable-next-line:jsx-key
            <Async
              promise={pp}
              then={productCard}
              pending={productCard.bind(this, undefined)}
            />
          );
        })
      }
    </Grid>
  );
};

export default MyListArea;
