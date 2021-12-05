import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { CartProvider } from './context/Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

import Header from './components/Header';
import Main from './components/Main';


function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <CartProvider >
        <div className="App">
            <Header />
            <Main />
        </div>
        </CartProvider>
      <Switch>
        <Route path="/login">{!user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>

        {/* chien update */}
       
       
      </Switch>
      
    </Router>
  );
}

export default App;
