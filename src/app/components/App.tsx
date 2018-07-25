import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../config/theme';

import UpperBar from "./Upperbar";
import SearchPage from './SearchPage/SearchPage';
import MyListPage from './MyListPage/MyListPage';
import AboutPage from './AboutPage/AboutPage';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <CssBaseline>
        <Theme>
          <UpperBar />
          <Switch>
            <Route exact path="/" component={MyListPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
          </Switch>
        </Theme>
      </CssBaseline>
    );
  }
}

export default App;