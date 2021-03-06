import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../config/theme';

import UpperBar from './Upperbar';
import ScanPage from './ScanPage/ScanPage';
import SearchPage from './SearchPage/SearchPage';
import MyListPage from './MyListPage/MyListPage';
import AboutPage from './AboutPage/AboutPage';
import NoMatch from './NoMatch/NoMatch';

class App extends React.Component
{
  constructor(props, context)
  {
    super(props, context);
  }

  public render()
  {
    return (
      <CssBaseline>
        <Theme>
          <UpperBar />
          <Switch>
            <Route exact={true} path="/" component={MyListPage} />
            <Route path="/search/:term" component={SearchPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/scan" component={ScanPage} />
            <Route path="/about" component={AboutPage} />
            <Route component={NoMatch} />
          </Switch>
        </Theme>
      </CssBaseline>
    );
  }
}

export default App;
