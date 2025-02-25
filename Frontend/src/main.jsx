import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Friends from './pages/Friends.jsx';
import Messages from './pages/Messages.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import PasswordReset from './pages/PasswordReset.jsx';
import LoginLayout from './layouts/LoginLayout.jsx';
import ForgotPasswordLayout from './layouts/ForgotPasswordLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="friends" element={<ProtectedRoute><Friends/></ProtectedRoute>}/>
          <Route path="messages" element={<ProtectedRoute><Messages/></ProtectedRoute>}/>
          <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

          <Route path="login" element={<LoginLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="create-account" element={<CreateAccount/>}/>

            <Route path="forgot-password" element={<ForgotPasswordLayout/>}>
              <Route index element={<ForgotPassword/>}/>
              <Route path="password-reset/:passwordReset" element={<PasswordReset/>}/>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
