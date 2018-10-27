import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';
import ICard from '../../interfaces/ICard';

interface IResultsAreaProps
{
  results: ICard[];
}

const ResultsArea = (props: IResultsAreaProps) =>
{
  if (props.results === undefined)
  {
    return (
      <p>First</p>
    );
  }
  else if (props.results.length > 0)
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
                key={Math.random() * 1000}
                style={{
                  margin: spacing.unit,
                }}
              >
                <ResultCard key={product && product.barcode} product={product} />
              </Grid>
            );
          })
        }
      </Grid>
    );
  }
  else
  {
    return (
      <p>No match</p>
    );
  }
};

export default ResultsArea;
