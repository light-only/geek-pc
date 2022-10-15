import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './pages/Login'
import LayoutComponent from "./pages/Layout";
import AuthRoute from "./components/common/AuthRoute";

function App() {
  return (
          <div className="App">
              {/*<Link to='/login'>登录</Link>*/}
              {/*<Link to='/home'>首页</Link>*/}
              <BrowserRouter>
                  <Switch>
                      <Route path='/login' component={Login}></Route>
                      {/*<Route path="/login" render={(props)=>{*/}
                      {/*    //相比较上面的方式，这种可以添加逻辑判断，是否携带token*/}
                      {/*    return <Login {...props} />*/}
                      {/*}} />*/}
                      <AuthRoute path='/home' component={LayoutComponent}></AuthRoute>
                  </Switch>
              </BrowserRouter>

          </div>

  );
}

export default App;
