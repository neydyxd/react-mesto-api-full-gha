import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }
  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  if (isLoggedIn) {
    return navigate("/", { replace: true });
  }
  return (
    <div className="register">
      <p className="register__title">Вход</p>
      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <input
          className="register__input"
          value={email}
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          onChange={handleEmailChange}
        />
        <input
          className="register__input"
          value={password}
          placeholder="Password"
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <button type="submit" className="register__submit">
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;
