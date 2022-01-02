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
        console.log("We have a user");
        const q = query(
          collection(db, "books"),
          where("uid", "==", user?.uid),
          orderBy("dateRead")
        );

        unsubscribe = onSnapshot(collection(db, "books"), async () => {
          console.log("made it this far");
          const theBooks = await getDocs(q);
          console.log(theBooks);
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
      }

      if (user === null) {
        setBooks([]);
      }

      if (books.length === 0 && !user?.uid) {
        const unsubscribe = onSnapshot(collection(db, "books"), async () => {
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

        unsubscribe();
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
        </Routes>

        <Routes>
          <Route
            path="/books"
            element={<MyBooks books={books} user={user} />}
          />
        </Routes>

        <Routes>
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
