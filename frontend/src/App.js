import React from "react";
import Index from "./pages/Index";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Ai from "./pages/Ai";
import Profile from "./pages/Profile";
import History from "./pages/History";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext.js";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />} />
          <Route path='contact' element={<Contact />} />
          <Route path='login' element={<Login />} />
          <Route path='upload' element={<Upload />} />
          <Route path='ai' element={<Ai />} />
          <Route path='profile' element={<Profile />} />
          <Route path='history' element={<History />} />
          <Route path='forgot-password' element={<ForgotPassword />} />
          <Route path='reset-password' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
