import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/book/:id" element={<BookDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
