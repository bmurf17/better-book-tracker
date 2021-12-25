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
    const loadBooks = async () => {
      const data = collection(db, "books");

      if (user?.uid) {
        const q = query(data, where("uid", "==", user?.uid));
        const bookArray: BookType[] = [];
        var index = 0;

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const book: BookType = {
            id: doc.id,
            img: doc.data().img,
            title: doc.data().title,
            author: doc.data().author,
            pageCount: doc.data().pageCount,
            genre: doc.data().genre,
            uid: doc.data().uid,
          };
          bookArray[index] = book;
          index++;
        });

        console.log(bookArray);
        setBooks(bookArray);
      }

      if (!(books.length > 0)) {
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
      }
    };

    loadBooks();
  }, [user?.uid, books.length]);

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
