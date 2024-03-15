import React from 'react';
import { BrowserRouter, Routes, Route   } from 'react-router-dom';
import './App.css';
import Login from './Components/Login';
import Home from './Components/Home';

const App = ()=>(
  <div>
    <BrowserRouter>
    <Routes>
      <Route   path="/login" element={<Login/>}/>
      <Route exact path="/" element={<Home/>}/>
      {/* <Redirect to="/" /> */}
    </Routes>
    </BrowserRouter>
  </div>
  
)

export default App;
