import React from 'react';
import logo from './logo.svg';
import './App.css';
import Text from '@shared/Text';
import Button from './components/shared/Button';
import Alert from './components/shared/Alert';
import { useAlertContext } from './contexts/AlertContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@pages/Home';
import TestPage from '@pages/Test';
import CardPage from './pages/Card';
import ScrollToTop from './components/shared/ScrollToTop';
import SigninPage from './pages/Signin';
import SignupPage from './pages/Signup';
import Navbar from './components/shared/Navbar';

function App() {
   const { open } = useAlertContext();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/signin' Component={SigninPage} />
        <Route path='/signup' Component={SignupPage} />
        <Route path='/card/:id' Component={CardPage} />
        <Route path='/test' Component={TestPage} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
