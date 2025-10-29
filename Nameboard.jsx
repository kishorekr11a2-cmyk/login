import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "./Nameboard.css";

function Nameboard() {
  const user = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="nameboard-container">
      <div className="card">
        <h1>Welcome {user?.username || "Guest"} 🎉</h1>
        <p>You are now on the dashboard.</p>
        <button className="btn-logout" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Nameboard;
