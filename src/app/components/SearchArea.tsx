import * as React from 'react';

import TextField from '@material-ui/core/TextField';
import spacing from '@material-ui/core/styles/spacing';
import { Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';

const styles = {
  container: {
    display: 'flex',
    paddingLeft: spacing.unit * 2,
    paddingRight: spacing.unit * 2,
  },
  searchIcon: {
    marginTop: 37,
  },
  searchButton: {
    marginTop: 23,
  }
}

interface ISearchAreaProps {
  searchAction: any
}

const SearchArea = (props: ISearchAreaProps) => {
  return (
    <form 
      style={styles.container}
      noValidate
      autoComplete="off"
      onSubmit={props.searchAction}>
      <Grid 
        container
        spacing={8}>
        <Grid item>
          <SearchIcon style={styles.searchIcon} />
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
            style={styles.searchButton}
            type="submit"
            onClick={props.searchAction}>
            <ArrowForwardIcon />
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default SearchArea;