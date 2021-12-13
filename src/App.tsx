import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import BookType from "./types/bookType";
import { db } from "./firebase.config";
import { Home } from "./Components/Home";
import { Login } from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const data = collection(db, "books");

      onSnapshot(data, async () => {
        const theBooks = await getDocs(collection(db, "books"));
        const temp: BookType[] = theBooks.docs.map((doc) => {
          const book: BookType = {
            id: doc.id,
            img: doc.data().img,
            title: doc.data().title,
            author: doc.data().author,
            pageCount: doc.data().pageCount,
            genre: doc.data().genre,
            uid: doc.data().uid,
          };
          return book;
        });
        setBooks(temp);
      });
    };

    loadBooks();
  }, []);

  // const booksRef = collection(db, "books");

  // useEffect(() => {
  //   const getBooks = async () => {
  //     console.log("Here");
  //     const data = await getDocs(collection(db, "books"));

  //     const temp: BookType[] = data.docs.map((doc) => {
  //       const book: BookType = {
  //         id: doc.id,
  //         img: doc.data().img,
  //         title: doc.data().title,
  //         author: doc.data().author,
  //         pageCount: doc.data().pageCount,
  //         genre: doc.data().genre,
  //         uid: doc.data().uid,
  //       };
  //       return book;
  //     });
  //     setBooks(temp);
  //   };

  //   getBooks();
  // }, [booksRef]);

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
