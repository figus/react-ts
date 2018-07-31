import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
  },
});

interface IProps
{
  children: JSX.Element[];
}

const res = (props: IProps) =>
{
  return (
    <MuiThemeProvider theme={theme}>
      {props.children}
    </MuiThemeProvider>
  );
};

export default res;
