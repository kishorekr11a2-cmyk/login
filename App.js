/*import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home.jssk';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact.jss';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
*//*
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Services from './pages/Services';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/projects"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Projects />
            </motion.div>
          }
        />
        <Route
          path="/contact"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Contact />
            </motion.div>
          }
        />
        <Route
          path="/services"
          element={
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Services />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <AnimatedRoutes />

      <footer className="footer">
        <p>© 2025 Kishore | All Rights Reserved</p>
      </footer>
    </Router>
  );
}

export default App;
*/
// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./components/authSlice";   // ✅ from components folder
import Login from "./components/Login";
import Nameboard from "./components/Nameboard";

// Redux store create pannrom
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Protected route component (login check)
function ProtectedRoute({ children }) {
  const currentUser = useSelector((state) => state.auth.currentUser);
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  return (
    <Routes>
      {/* Default path → redirect to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected nameboard page */}
      <Route
        path="/nameboard"
        element={
          <ProtectedRoute>
            <Nameboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
