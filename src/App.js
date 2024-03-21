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

let logoutTimer;

function App () {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate22 = expirationDate || new Date(new Date().getTime()+1000*60*60);
    setTokenExpirationDate(tokenExpirationDate22);
    localStorage.setItem(
      'userJData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate22.toISOString()
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userJData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime );
    }else{
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

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


