import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import HomeScreen from "./components/HomeScreen";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const handleLogin = (email) => {
    localStorage.setItem("isLoggedIn", true);
    setEmail(email);
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <HomeScreen onLogout={handleLogout} email={email} /> : <LoginPage onLogin={handleLogin} />;
}
export default App;
