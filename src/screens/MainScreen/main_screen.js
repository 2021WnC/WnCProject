import React from "react";
import { authService } from "../../Firebase";

function MainScreen() {
  return (
    <div>
      <button onClick={() => console.log(authService.currentUser)}>
        Current auth check
      </button>
    </div>
  );
}

export default MainScreen;
