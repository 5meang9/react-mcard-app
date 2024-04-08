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

function App() {
   const { open } = useAlertContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/test' Component={TestPage} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
