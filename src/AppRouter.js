import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import UserInputScreen from "./screens/UserInputScreen/user_input_screen";

function AppRouter() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/userinput">
            <UserInputScreen />
          </Route>
          <Route exact path="/main">
            <MainScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
