import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Users from './user/pages/Users';
//import Authentication from "./reviews/pages/Authentication";
import Auth from "./user/pages/Auth";
import NewReview from "./reviews/pages/NewReview";
import UserReviews from "./reviews/pages/UserReviews";
import UpdateReview from "./reviews/pages/UpdateReview";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";

function App () {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime()+1000*60*60);
    localStorage.setItem(
      'userJData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userJData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userJData'));
    if(
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
      ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;

  if(token) {
    routes= (
      <Switch>
      <Route path="/" exact>
          <Users />
      </Route>
      <Route path="/:userId/reviews" exact>
          <UserReviews />
      </Route>
      <Route path="/reviews/new" exact>
          <NewReview />
        </Route>
      <Route path="/reviews/:reviewId">
        <UpdateReview />
      </Route>

      <Redirect to="/" />
    </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
            <Users />
        </Route>
        <Route path="/:userId/reviews" exact>
            <UserReviews />
        </Route>
        <Route path="/auth">
            <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
  <AuthContext.Provider value={{
    isLoggedIn: !!token,
    token: token,
    userId: userId,
    login: login, 
    logout: logout
  }}>
  <Router>
    <MainNavigation />
    <main>
        {routes}
    </main>
  </Router>
  </AuthContext.Provider>
  );
};  //Redirect 6 lines above redirects to base if dud/invalid url is entered

export default App;


