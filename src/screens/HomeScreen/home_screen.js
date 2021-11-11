import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useHistory, useLocation } from "react-router";
import { authService } from "../../Firebase";

function HomeScreen() {
  const history = useHistory();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const SignUpWithEmailAndPassword = () => {
    createUserWithEmailAndPassword(authService, Email, Password).then((e) => {
      console.log("CreateUserFinished");
      console.log(e);
    });
  };
  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Google Finished");
        console.log(user);
        console.log(token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const GithubLogin = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Github Finished");
        console.log(user);
        console.log(token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const EmailChange = (e) => setEmail(e.target.value);
  const PasswordChange = (e) => setPassword(e.target.value);
  return (
    <div>
      homescreen
      <div>
        <input placeholder="email" value={Email} onChange={EmailChange} />
        <input
          placeholder="password"
          value={Password}
          onChange={PasswordChange}
        />
        <button onClick={SignUpWithEmailAndPassword}>회원가입하기</button>
        <button onClick={GithubLogin}>깃허브 로그인</button>
        <button onClick={GoogleLogin}>구글로그인</button>
        <button onClick={() => console.log(authService.currentUser)}>
          Current auth check
        </button>
        <button onClick={() => history.push("/main")}>
          메인홈페이지로 이동
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;
