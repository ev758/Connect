import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import App from './App.jsx';
import Login from './components/Login.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="create-account" element={<CreateAccount/>}/>
          <Route path="forgot-password" element={<ForgotPassword/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
