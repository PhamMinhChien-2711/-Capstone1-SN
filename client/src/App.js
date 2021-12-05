import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Home from './pages/HomePage';
import HoiDap from './pages/HoiDap';
import CuuTro from './pages/CuuTro';
import Shop from './pages/Shop';
import HomePostDetail from './pages/HomePostDetail';
import User from './pages/User';
import CuuTroPostDetail from './pages/CuuTroPostDetail';
import HoiDapPostDetail from './pages/HoiDapPostDetail';
import Cart from './pages/GioHang';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/login">{!user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        {/* chien update */}
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/hoidap'>
          <HoiDap />
        </Route>
        <Route exact path='/cuutro'>
          <CuuTro />
        </Route>

        <Route exact path='/shop'>
          <Shop />
        </Route>
        <Route exact path='/shop/cart'>
          <Cart />
        </Route>
        <Route path='/home/:id'>
          <HomePostDetail />
        </Route>
        <Route path='/cuutro/:id'>
          <CuuTroPostDetail />
        </Route>
        <Route path='/hoidap/:id'>
          <HoiDapPostDetail />
        </Route>
        <Route path='/user'>
          <User />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
