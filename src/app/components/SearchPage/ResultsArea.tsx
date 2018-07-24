import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';
import IProduct from '../../interfaces/IProduct';

interface IResultsAreaProps {
  results: any[]
}

const ResultsArea = (props: IResultsAreaProps) => {
  return (
    <Grid
      container
      justify="center"
      alignItems="stretch"
      spacing={0}>
      {
        props.results.map((product: IProduct) => {
          return (
            <Grid
              item
              key={product.barcode}
              style={{
                margin: spacing.unit,
              }}>
              <ResultCard product={product} />
            </Grid>
          );
        })
      }
    </Grid>
  );
}

export default ResultsArea;