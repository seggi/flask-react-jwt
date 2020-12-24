
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import PrivateRoute from './auth/privateroute';
import Home from './components/home';
import Login from './components/login';
import Mainpage from './components/mainpage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/"  component={ Home }/>
            <Route path="/login" component={ Login } />
            <PrivateRoute exact path="/main-page" component={ Mainpage } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
