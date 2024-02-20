import "./App.css";
import { Routes, Route } from "react-router-dom";
import PasswordResetLandingPage from "./components/PasswordReset/PasswordResetLandingPage";
import SignUp from "./components/authorize/SignUp";
import IdentityVerifyPage from "./components/PasswordReset/IdentityVerifyPage";
import NewPasswordPage from "./components/PasswordReset/NewPasswordPage";
import SignInPage from "./components/authorize/SignIn";
import VerifyPage from "./components/Verify/VerifyPage";
import NotFoundPage from "./components/didNotFindPage/NotFound";
import TermsOfService from "./components/termsOfService/termsOfService";

function App() {

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
