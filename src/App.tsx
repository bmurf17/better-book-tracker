import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { sampleListOfBooks } from "./types/bookType";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home books={sampleListOfBooks} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
