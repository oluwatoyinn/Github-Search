import logo from './logo.svg';
import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
import Error from './pages/Error'

import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="*" component={Error} />
      </Switch>
     
    </Router>
  );
}

export default App;
