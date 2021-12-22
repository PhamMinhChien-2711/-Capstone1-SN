import { CartProvider } from "./context/Cart";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import { ToastContainer } from "react-toastify";
import HelloWellcomeToSNPO from "./components/HelloWellcomeToSNPO";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <CartProvider>
        <HelloWellcomeToSNPO user={user} />
        <ToastContainer position='bottom-left' />
      </CartProvider>
      <Switch>
        <Route path='/login'>{user && <Redirect to='/' />}</Route>
        <Route path='/register'>
          {!user ? <Redirect to='/register' /> : <Redirect to='/' />}
        </Route>
        <Route path='/messenger'>{!user ? <Redirect to='/' /> : <Messenger />}</Route>

        {/* chien update */}
      </Switch>
    </Router>
  );
}

export default App;
