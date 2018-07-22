import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';

const ResultsArea = () => {
  return (
    <Grid
      container
      justify="center"
      spacing={0}>
      {
        [0,1,2,3,4].map(i => {
          return (
            <Grid
              item
              key={i}
              style={{
                margin: spacing.unit,
              }}>
              <ResultCard />
            </Grid>
          );
        })
      }
    </Grid>
  );
}

export default ResultsArea;