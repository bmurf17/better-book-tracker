import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import BookType from "./types/bookType";
import { db } from "./firebase.config";
import { MyBooks } from "./Components/MyBooks";
import { Login } from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { User } from "firebase/auth";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);

  const [user, setUser] = useState<User | null>(null);

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

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
        </Routes>

        <Routes>
          <Route path="/books" element={<MyBooks books={books} />} />
        </Routes>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
