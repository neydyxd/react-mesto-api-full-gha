import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
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
    onRegister(email, password);
    console.log(email, " ", password);
  }

  if (isLoggedIn) {
    return navigate("/", { replace: true });
  }

  return (
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form" onSubmit={handleSubmit}>
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
          Зарегистрироваться
        </button>
      </form>
      <div className="register__signin">
        <p className="register__login-tag">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__login-link">
          {" "}
          Войти
        </Link>
      </div>
    </div>
  );
}
export default Register;
