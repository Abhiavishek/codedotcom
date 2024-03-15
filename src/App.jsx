import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavComp from './components/NavComp';
import Home from './components/Home';
import Editor from './components/Editor';
import Courses from './components/Course';
import LiveCourse from './components/LiveCourse';
import { LanguageProvider } from './components/LanguageContext';
import Login from './components/Login';
const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <NavComp />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor' element={<Editor />} />
          <Route path='/courses' element={<Courses />} />
          <Route path='/livecourse' element={<LiveCourse />} />
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;
