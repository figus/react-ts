import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';
import IProduct from '../../interfaces/IProduct';
import ICard from '../../interfaces/ICard';

interface IResultsAreaProps
{
  results: ICard[];
}

const ResultsArea = (props: IResultsAreaProps) =>
{
  return (
    <Grid
      container={true}
      justify="center"
      alignItems="stretch"
      spacing={0}
    >
      {
        props.results.map((product: ICard) =>
        {
          return (
            <Grid
              item={true}
              key={product.barcode}
              style={{
                margin: spacing.unit,
              }}
            >
              <ResultCard product={product} />
            </Grid>
          );
        })
      }
    </Grid>
  );
};

export default ResultsArea;
