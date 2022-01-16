import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import FullName from './newComponents/FullName';
import Wheels from './newComponents/Wheels';
import Type from './newComponents/Type';
import Model from './newComponents/Model';
import Date from './newComponents/Date';
import './App.css';

function App() {
  return <BrowserRouter>
    <Routes>

      <Route path='/' element={<FullName />} />

      <Route path='/wheels' element={<Wheels />} />

      <Route path='/type' element={<Type />} />

      <Route path='/model' element={<Model />} />

      <Route path='/date' element={<Date />} />


    </Routes>
    

  </BrowserRouter>;
}

export default App;
