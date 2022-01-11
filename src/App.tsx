import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import BookType from "./types/bookType";
import { auth, db } from "./firebase.config";
import { MyBooks } from "./Components/MyBooks";
import { Login } from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { onAuthStateChanged, User } from "firebase/auth";
import { FriendsList } from "./Components/FriendsList";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);

  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    var unsubscribe = () => {};
    const loadBooks = async () => {
      if (user?.uid) {
        const q = query(
          collection(db, "books"),
          where("uid", "==", user?.uid),
          orderBy("dateRead")
        );

        onSnapshot(collection(db, "books"), async () => {
          const theBooks = await getDocs(q);
          const temp: BookType[] = theBooks.docs.map((doc) => {
            const book: BookType = {
              id: doc.id,
              img: doc.data().img,
              title: doc.data().title,
              author: doc.data().author,
              pageCount: doc.data().pageCount,
              genre: doc.data().genre,
              uid: doc.data().uid,
              dateRead: doc.data().dateRead,
            };
            return book;
          });
          setBooks(temp);
        });
      }

      if (user === null) {
        setBooks([]);
      }

      if (books.length === 0 && !user?.uid) {
        onSnapshot(collection(db, "books"), async () => {
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
              dateRead: doc.data().dateRead,
            };
            return book;
          });
          setBooks(temp);
        });
      }

      if (user === null) {
        setBooks([]);
      }
    };
    loadBooks();
    unsubscribe();
  }, [user, books.length]);

  return (
    <>
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />

          <Route
            path="/books"
            element={<MyBooks books={books} user={user} />}
          />

          <Route path="/friends" element={<FriendsList user={user} />} />

          <Route path="/" element={<Home user={user} books={books} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
