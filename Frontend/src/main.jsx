import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import LoginLayout from './layouts/LoginLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path="login" element={<LoginLayout/>}>
            <Route index element={<Login/>}/>
            <Route path="create-account" element={<CreateAccount/>}/>
            <Route path="forgot-password" element={<ForgotPassword/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
