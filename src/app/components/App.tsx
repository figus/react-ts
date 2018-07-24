import * as React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Theme from '../config/theme';

import UpperBar from "./Upperbar";
import SearchPage from './SearchPage/SearchPage';

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return(
      <CssBaseline>
        <Theme>
          <UpperBar />
          <SearchPage />
        </Theme>
      </CssBaseline>
    );
  }
}

export default App;