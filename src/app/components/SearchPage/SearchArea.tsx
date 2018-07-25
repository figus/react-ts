import * as React from 'react';

import './Search.css';

import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

interface ISearchAreaProps {
  searchAction: any,
  searching: boolean,
}

const SearchArea = (props: ISearchAreaProps) => {
  return (
    <form 
      className="container"
      noValidate
      autoComplete="off"
      onSubmit={props.searchAction}>
      <Grid 
        container
        spacing={8}>
        <Grid item>
          <SearchIcon 
            className="searchIcon" />
        </Grid>
        <Grid item xs>
          <TextField
            id="searchField"
            name="searchField"
            label="Search"
            type="search"
            placeholder="Enter a term or barcode to search"
            margin="normal"
            fullWidth
          />
        </Grid>
        <Grid item>
          <IconButton 
            aria-label="Search" 
            className="searchButton"
            type="submit"
            onClick={props.searchAction}>
            <ArrowForwardIcon />
          </IconButton>
          { props.searching && <CircularProgress size={46} className="searchLoading" />}
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchArea;