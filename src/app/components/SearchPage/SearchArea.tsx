import * as React from 'react';

import './Search.css';

import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

interface ISearchAreaProps
{
  searchAction: any;
  searching: boolean;
  initialText?: string;
}

const SearchArea = (props: ISearchAreaProps) =>
{
  return (
    <form
      className="container"
      noValidate={true}
      autoComplete="off"
      onSubmit={props.searchAction}
    >
      <Grid
        container={true}
        spacing={8}
      >
        <Grid item={true}>
          <SearchIcon
            className="searchIcon"
          />
        </Grid>
        <Grid item={true} xs={true}>
          <TextField
            id="searchField"
            name="searchField"
            label="Search"
            type="search"
            placeholder="Enter a term or barcode to search"
            margin="normal"
            fullWidth={true}
            defaultValue={props.initialText || ''}
          />
          {props.searching && <LinearProgress className="linearProgress" />}
        </Grid>
        <Grid item={true}>
          <IconButton
            aria-label="Search"
            className="searchButton"
            type="submit"
            onClick={props.searchAction}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchArea;
