import React from "react";
import { useLocation, useHistory } from "react-router";

function MainScreen() {
  const location = useLocation();
  const history = useHistory();
  return (
    <div>
      <button onClick={() => console.log(location.state.userInfo)}>
        Current auth check
      </button>
      <button
        onClick={() =>
          history.push("/teachers", {
            userInfo: location.state.userInfo,
          })
        }
      >
        go to teachers
      </button>
    </div>
  );
}

export default MainScreen;
