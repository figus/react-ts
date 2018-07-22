import * as React from 'react';

import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const UpperBar = () => {
  return (
    <Appbar position="static" color="primary">
      <Toolbar>
        <IconButton style={styles.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography style={styles.flex} variant="title" color="inherit">
          Price Check
        </Typography>
      </Toolbar>
    </Appbar>
  );
};

export default UpperBar;