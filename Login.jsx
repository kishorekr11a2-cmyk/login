import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector(state => state.auth.users || []);
  const currentUser = useSelector(state => state.auth.currentUser);

  
  useEffect(() => {
    setUsername("");
    setPassword("");
    setError("");
  }, [currentUser]); 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter username and password.");
      return;
    }

    const existingUser = users.find(u => u.username === username);

    if (!existingUser) {
      dispatch(login({ username, password }));
      setError("");
      navigate("/nameboard");
    } else {
      if (existingUser.password !== password) {
        setError("Incorrect password!");
        return;
      } else {
        dispatch(login({ username, password }));
        setError("");
        navigate("/nameboard");
      }
    }
  };

  return (
    <div className="container login-bg">
      <p className="top-text">Please login to continue</p>
      <form onSubmit={handleSubmit} className="card">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="input"/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input"/>
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
}

export default Login;
