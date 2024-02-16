import React from "react";
import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PasswordResetLandingPage from "./components/PasswordReset/PasswordResetLandingPage";
import SignUp from "./components/authorize/SignUp";
import IdentityVerifyPage from "./components/PasswordReset/IdentityVerifyPage";
import NewPasswordPage from "./components/PasswordReset/NewPasswordPage";
import SignInPage from "./components/authorize/SignIn";
import VerifyPage from "./components/Verify/VerifyPage";
import NotFoundPage from "./components/didNotFindPage/NotFound";
import Footer from "./components/footer/footer";
import TermsOfService from "./components/termsOfService/termsOfService";

function App() {
  const [articles, setArticles] = useState();

  const getArticles = async () => {
    try {
      const response = await api.get("/api/v1/articles");
      console.log(response);
      setArticles(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/password" element={<PasswordResetLandingPage />} />
        <Route path="/IdentityVerify" element={<IdentityVerifyPage />} />
        <Route path="/article" element={<h1>Article</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newPassword" element={<NewPasswordPage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/VerifyPage" element={<VerifyPage />} />
        <Route path="/error" element={<NotFoundPage />} />
        <Route path ="/termsOfService" element={<TermsOfService />} />
      </Routes>
    </div>
  );
}

export default App;
