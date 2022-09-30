import {BrowserRouter as Router,Route,Link,Routes} from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login'

function App() {
  return (
      <Router>
          <div className="App">
              {/*<Link to='/login'>登录</Link>*/}
              {/*<Link to='/home'>首页</Link>*/}
              <Routes>
                  <Route path='/login' element={<Login/>}></Route>
                  <Route path='/home' element={<Home/>}></Route>
              </Routes>
          </div>
      </Router>

  );
}

export default App;
