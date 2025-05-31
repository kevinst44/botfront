import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Home from './pages/Home.jsx';
import Chat from './components/Chat.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="chat" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
