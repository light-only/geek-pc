import {Route,Switch,Router} from 'react-router-dom'
import LayoutComponent from "./pages/Layout";
import Login from './pages/Login'
import {Component} from "react";
import AuthRouter from "components/common/AuthRouter";
import history from "utils/history";

class App extends Component {
  render(){
      return (
          //history这个东西要和Router搭配使用，并且传入history，但是不能加上withRouter
          <Router history={history}>
            <div className="App">
                    <Switch>
                        <Route path='/login' component={ Login }></Route>
                        <AuthRouter path='/home' component={ LayoutComponent }></AuthRouter>
                    </Switch>
            </div>
          </Router>
      )
  }
}

export default App;
