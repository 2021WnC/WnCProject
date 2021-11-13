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
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

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
      <div className="login">
        <h2>Log-In</h2>
        <div className="login-sns">
          <li>
            <a>
              <BsGithub onClick={GithubLogin} size="36"></BsGithub>
            </a>
          </li>
          <li>
            <a>
              <FcGoogle onClick={GoogleLogin} size="36"></FcGoogle>
            </a>
          </li>
        </div>
        <div className="login-email">
          <h4>E-mail</h4>
          <input placeholder="email" value={Email} onChange={EmailChange} />
        </div>
        <div className="login-pwd">
          <h4>Password</h4>
          <input
            placeholder="password"
            value={Password}
            onChange={PasswordChange}
            type="password"
          />
        </div>

        {IsLogin ? (
          <div className="submit" onClick={loginWithEmailAndPassword}>
            <button>로그인</button>
          </div>
        ) : (
          <div className="submit" onClick={registerWithEmailAndPassword}>
            <button>회원가입</button>
          </div>
        )}
        <div className="change" onClick={() => setIsLogin(!IsLogin)}>
          {IsLogin ? (
            <span>회원가입하시려면 여기를 클릭해주세요</span>
          ) : (
            <span>계정이 있으면 여기를 클릭해주세요</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
