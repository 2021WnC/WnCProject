import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import UserInputScreen from "./screens/UserInputScreen/user_input_screen";
import TeacherScreen from "./screens/TeacherScreen/teacher_screen";
import BoardScreen from "./screens/BoardScreen/board_screen";
import AdminScreen from "./screens/AdminScreen/admin_screen";
import { authService } from "./Firebase";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [UserInfo, setUserInfo] = useState();
  useEffect(() => {
    if (authService.currentUser) {
      setIsLoggedIn(true);
      setUserInfo(authService.currentUser);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Header user={UserInfo} isMain={true} />
              <MainScreen />
            </Route>
            <Route exact path="/teachers">
              <Header user={UserInfo} />
              <TeacherScreen user={UserInfo} />
            </Route>
            <Route exact path="/admin">
              <Header user={UserInfo} />
              <AdminScreen user={UserInfo} />
            </Route>
            <Route path="/board/:id">
              <Header user={UserInfo} />
              <BoardScreen user={UserInfo} />
            </Route>
          </Switch>
        </Router>
      ) : (
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route exact path="/userinput">
              <UserInputScreen />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default AppRouter;
