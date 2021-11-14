import React from "react";
import Header from "./Components/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen/home_screen";
import MainScreen from "./screens/MainScreen/main_screen";
import UserInputScreen from "./screens/UserInputScreen/user_input_screen";
import TeacherScreen from "./screens/TeacherScreen/teacher_screen";
import BoardScreen from "./screens/BoardScreen/board_screen";
import AdminScreen from "./screens/AdminScreen/admin_screen";

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
            <Header isMain={true} />
            <MainScreen />
          </Route>
          <Route exact path="/teachers">
            <Header />
            <TeacherScreen />
          </Route>
          <Route exact path="/admin">
            <Header />
            <AdminScreen />
          </Route>
          <Route path="/board/:id">
            <Header />
            <BoardScreen />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default AppRouter;
