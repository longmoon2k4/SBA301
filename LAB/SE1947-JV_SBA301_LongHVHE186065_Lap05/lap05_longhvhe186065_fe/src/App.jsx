import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ListOfOrchids from './components/ListOfOrchids';
import EditOrchid from './components/EditOrchid';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<ListOfOrchids />} />
        <Route path="/edit/:id" element={<EditOrchid />} />
      </Routes>
    </>
  );
}

export default App;
