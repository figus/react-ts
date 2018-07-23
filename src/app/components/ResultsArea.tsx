import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';

interface IResultsAreaProps {
  results: any[]
}

const ResultsArea = (props: IResultsAreaProps) => {
  return (
    <Grid
      container
      justify="center"
      spacing={0}>
      {
        props.results.map(product => {
          return (
            <Grid
              item
              key={product.Barcode}
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