import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AddLink from './pages/AddLink';
import Redirect from './pages/Redirect';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/addlink' element={<AddLink />} />
        <Route path='/:urlId' element={<Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
