
import { useState } from 'react'
import Quiz from './components/Quiz'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Result from './components/Result';
import QuizSettings from './components/QuizSetup';
import "react-toastify";
import Signup from './pages/Signup';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
// import EmailVerificationPage from "./pages/EmailVerificationPage";
// import DashboardPage from "./pages/DashboardPage";
// import ForgotPasswordPage from "./pages/ForgotPasswordPage";
// import ResetPasswordPage from "./pages/ResetPasswordPage";




import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import { Home } from 'lucide-react';
import Homepage from './components/Homepage'


function App() {
  const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
  
    if (!isAuthenticated) {
      return <Navigate to='/login' replace />;
    }
  
    if (!user.isVerified) {
      return <Navigate to='/verify-email' replace />;
    }
  
    return children;
  };
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();
  
    if (isAuthenticated && user.isVerified) {
      return <Navigate to='/' replace />;
    }
  
    return children;
  };
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div>
      <Routes>
        {/* <Route path='/'element={<ProtectedRoute><DashboardPage /></ProtectedRoute>}/> */}
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup'element={<Signup />}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/quizsetup'element={<QuizSettings/>}/>
        <Route path='/quiz'element={<Quiz/>}/>
        <Route path='/result'element={<Result/>}/>



        {/* <Route path='/verify-email' element={<EmailVerificationPage />} />
        <Route path='/forgot-password'element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>}/>

        <Route path='/reset-password/:token'element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>}/>  */}
        {/* catch all routes */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
     
    </div>

  )
}

export default App



