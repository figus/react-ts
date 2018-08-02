import * as React from 'react';

import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { ListItem, ListItemIcon, ListItemText, Divider, ListSubheader } from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faSearch, faList, faCode, faBars } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 300,
  },
};

interface IUpperBarState
{
  openDrawer: boolean;
  title: string;
}

class UpperBar extends React.Component<any, IUpperBarState> {
  constructor(props, context)
  {
    super(props, context);

    this.state = {
      openDrawer: false,
      title: '',
    };

    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  public render()
  {
    return (
      <div>
        <Appbar
          position="static"
          color="primary"
        >
          <Toolbar>
            <IconButton
              onClick={this.toggleDrawer(true)}
              style={styles.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={faBars} />

            </IconButton>
            <Typography
              style={styles.flex}
              variant="title"
              color="inherit"
            >
              {this.state.title}
            </Typography>
          </Toolbar>
        </Appbar>
        <Drawer
          open={this.state.openDrawer}
          onClose={this.toggleDrawer(false)}
        >
          <List
            component="nav"
            style={styles.list}
            subheader={
              <ListSubheader
                component="div"
              >
                Price Checker
              </ListSubheader>
            }
          >
            <ListItem
              button={true}
              onClick={this.toggleDrawer(false)}
              component={
                (props) => <Link {...props} to="/search" />
              }
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faSearch} />
              </ListItemIcon>
              <ListItemText
                primary="Search"
              />
            </ListItem>
            <ListItem
              button={true}
              onClick={this.toggleDrawer(false)}
              component={
                (props) => <Link {...props} to="/scan" />
              }
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faBarcode} />
              </ListItemIcon>
              <ListItemText
                primary="Scan Barcode"
              />
            </ListItem>
            <ListItem
              button={true}
              onClick={this.toggleDrawer(false)}
              component={
                (props) => <Link {...props} to="/" />
              }
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faList} />
              </ListItemIcon>
              <ListItemText
                primary="My list"
              />
            </ListItem>
            <Divider />
            <ListItem
              button={true}
              onClick={this.toggleDrawer(false)}
              component={
                (props) => <Link {...props} to="/about" />
              }
            >
              <ListItemIcon>
                <FontAwesomeIcon icon={faCode} />
              </ListItemIcon>
              <ListItemText
                primary="About"
              />
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  }

  private toggleDrawer = (open: boolean) => () =>
  {
    this.setState({
      openDrawer: open,
    });
  }
}

export default UpperBar;
