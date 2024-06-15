import "./App.css";
import LoginPage from "./pages/login";
import Profile from "./pages/profile";
import SignUp from "./pages/signUp";
import SearchPage from "./pages/search";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { useContext } from "react";
import SupportPage from "./pages/support";
import NotePage from "./pages/notePage";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated || localStorage.getItem("access_token") ? (
            <></>
          ) : (
            <LoginPage redirect="/" />
          )
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profile" element={<Profile />} />
       <Route path="/support" element={<SupportPage />} /> 
      <Route path="*" element={<NotePage/>} />
    </Routes>
  );
}

export default App;
