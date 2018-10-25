import * as React from 'react';
import ResultCard from './ResultCard';
import { Grid } from '@material-ui/core';
import spacing from '@material-ui/core/styles/spacing';
import ISearchResult from '../../interfaces/ISearchResult';
import ICard from '../../interfaces/ICard';
import Async from 'react-promise';

interface IResultsAreaProps
{
  results: ICard[];
}

const resultCard = (product: ICard) =>
{
  return (
    <ResultCard key={product && product.barcode} product={product} />
  );
};

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
            // tslint:disable-next-line:jsx-key
            <Grid
              item={true}
              key={Math.random() * 1000}
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
