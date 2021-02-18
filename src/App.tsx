import React, { FC, useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux'
import SignIn from "./components/Auth/SignIn";
import { AuthRoute, PrivateRoute } from "./components/Route";
import Dashboard from "./components/Dashboard/Dashboard";
import { AppBar, Box, Button, CircularProgress, CssBaseline, makeStyles, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import { RootState } from "./redux/reducers";
import { appInit, signOut } from "./redux/actions";
import { pink } from "./theme";
import SignUp from "./components/Auth/SignUp";
import { bindActionCreators, Dispatch } from "redux";

const mapStateToProps = ({ system }: RootState) => system

const mapDispatchToProps = (dispatch: Dispatch) => ({
  appInit: bindActionCreators(appInit, dispatch),
  signOut: bindActionCreators(signOut, dispatch)
})

type Props = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const useStyles = makeStyles({
  logo: {
    flexGrow: 1,
    textTransform: 'uppercase'
  }
})

const App: FC<Props> = ({ appInit, isInit, signOut, user }) => {
  useEffect(() => { appInit() }, [])

  const { logo } = useStyles()

  return <ThemeProvider theme={pink}>
    <CssBaseline />
    <AppBar variant='elevation' color='secondary'>
      <Toolbar>
        <Typography variant="h4" component='h1' className={logo}>Kanban</Typography>
        {user && <Button onClick={signOut} color='primary' variant='contained'>Выход</Button>}
      </Toolbar>
    </AppBar>
    <Box mt={12}>
      {isInit ?
        <BrowserRouter>
          <Switch>
            <AuthRoute path="/signin">
              <SignIn />
            </AuthRoute>
            <AuthRoute path="/signup">
              <SignUp />
            </AuthRoute>
            <PrivateRoute path='/'>
              <Dashboard />
            </PrivateRoute>
            <Route>
              <Redirect to='/' />
            </Route>
          </Switch>
        </BrowserRouter>
        : <Box width='100%' display='flex' justifyContent='center'>
          <CircularProgress />
        </Box>}
    </Box>
  </ThemeProvider>
}


export default connect(mapStateToProps, mapDispatchToProps)(App)