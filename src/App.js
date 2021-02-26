import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'
import PrivateRoute from './pages/PrivateRoute'

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import AuthWrapper from './pages/AuthWrapper';

function App() {

  return (
    <AuthWrapper>
      <Router>
        <Switch>
          <PrivateRoute path="/" exact={true}>
              <Home />
          </PrivateRoute>
          <Route path="/login" component={Login} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </AuthWrapper>
  );
}

export default App;
