import * as React from 'react';
import { Grid } from '@material-ui/core';
import IProduct from '../../interfaces/IProduct';
import * as ProductFn from './../../Api/Products';
import ProductCard from './ProductCard';
import Async from 'react-promise';
import ICard from '../../interfaces/ICard';

interface IMyListAreaProps
{
  // products: IProduct[];
  barcodeList: string[];
}

const productCard = (product: ICard) =>
{
  return (
    <ProductCard product={product} />
  );
};

const MyListArea = (props: IMyListAreaProps) =>
{

  return (
    <Grid
      container={true}
      justify="center"
      alignItems="stretch"
      spacing={0}
    >
      {
        ProductFn.barcodeListSearch(props.barcodeList).map((pp: Promise<ICard>) =>
        {
          return (
            // tslint:disable-next-line:jsx-key
            <Grid
              item={true}
              xs={6}
              sm={4}
              style={{
                maxWidth: 225,
              }}
            >
              <Async
                promise={pp}
                then={productCard}
                pending={productCard.bind(this, undefined)}
              />
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default MyListArea;
