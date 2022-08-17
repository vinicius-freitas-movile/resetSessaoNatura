import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './Dashboard';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard/>}  path="dashboard" />
      </Routes>
    </BrowserRouter>
  );
}