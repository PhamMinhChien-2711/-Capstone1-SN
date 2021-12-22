import { Switch, Route, Redirect } from "react-router-dom";
import Header from "../Header";
import Main from "../Main";
import Login from "../../pages/login";
import Register from "../../pages/register";
import ScrollToTop from "../ScrollToTop";
import { useEffect } from "react";
import { seo } from "../../utils/seo";

const HelloWellcomeToSNPO = ({ user }) => {
  useEffect(() => {}, []);
  return (
    <>
      {user ? (
        <>
          <Header />
          <Main />
          <ScrollToTop />
        </>
      ) : (
        <>
          {seo("Welcome to ")}
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/register'>
              <Register />
            </Route>
          </Switch>
        </>
      )}
    </>
  );
};

export default HelloWellcomeToSNPO;
