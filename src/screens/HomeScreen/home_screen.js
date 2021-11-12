import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useHistory } from "react-router";
import { authService } from "../../Firebase";

function HomeScreen() {
  const history = useHistory();
  const [User, setUser] = useState(authService.currentUser);
  const [IsLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (User) {
      history.push("/userinput", { user: User.toJSON() });
    }
  }, [User, history]);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const loginWithEmailAndPassword = () => {
    signInWithEmailAndPassword(authService, Email, Password)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const registerWithEmailAndPassword = () => {
    createUserWithEmailAndPassword(authService, Email, Password)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const GoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider)
      .then((result) => {
        const user = result.user;
        setUser(user);
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
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  const EmailChange = (e) => setEmail(e.target.value);
  const PasswordChange = (e) => setPassword(e.target.value);
  return (
    <div className="home-screen">
      homescreen
      <div className="home-screen-container">
        <div className="home-screen-input-container">
          <input placeholder="email" value={Email} onChange={EmailChange} />
          <input
            placeholder="password"
            value={Password}
            onChange={PasswordChange}
          />
        </div>
        <div className="home-screen-social-container">
          <button onClick={GithubLogin}>깃허브 로그인</button>
          <button onClick={GoogleLogin}>구글로그인</button>
        </div>
        {IsLogin ? (
          <button onClick={loginWithEmailAndPassword}>로그인하기</button>
        ) : (
          <button onClick={registerWithEmailAndPassword}>회원가입하기</button>
        )}
        <div onClick={() => setIsLogin(!IsLogin)}>
          {IsLogin ? (
            <span>회원가입하시려면 여기를 클릭해주세요</span>
          ) : (
            <span>계정이 있으면 여기를 클릭해주세요</span>
          )}
        </div>

        <button onClick={() => console.log(authService.currentUser)}>
          Current auth check
        </button>
        <button onClick={() => history.push("/main")}>
          메인홈페이지로 이동
        </button>
        <button onClick={() => signOut(authService)}>로그아웃</button>
      </div>
    </div>
  );
}

export default HomeScreen;
