import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import BookType, { sampleListOfBooks } from "./types/bookType";
import { db } from "./firebase.config";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);
  const bookCollectionRef = collection(db, "books");

  useEffect(() => {
    const getBooks = async () => {
      const data = await getDocs(bookCollectionRef);
      const temp: BookType[] = data.docs.map((doc) => {
        const book: BookType = {
          img: doc.data().img,
          title: doc.data().title,
          author: doc.data().author,
          pageCount: doc.data().pageCount,
          genre: doc.data().genre,
        };
        return book;
      });
      setBooks(temp);
    };

    getBooks();
  }, [setBooks]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home books={books} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
