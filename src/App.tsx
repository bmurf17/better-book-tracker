import { useState, useEffect } from "react";
import { MyBooks } from "./Components/MyBooks";
import { Login } from "./Components/Login";
import { Home } from "./Components/Home";
import { NavBar } from "./Components/NavBar";
import { FriendsList } from "./Components/FriendsList";
import { FriendBookList } from "./Components/FriendBookList";
import BookType, { SiteUser } from "./types/bookType";
import { auth } from "./firebase.config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import "./App.css";
import loadBooks from "./functions/loadBooksDB";
import loadUser from "./functions/LoadUser";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [theUser, setTheUser] = useState<SiteUser>();
  const [loading, setLoading] = useState<boolean>(false);

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
    const unsubscribeBooks = loadBooks(user?.uid || "", setBooks);
    const unsubscribeUser = loadUser(user?.uid || "", setTheUser);

    return () => {
      unsubscribeBooks();
      unsubscribeUser();
    };
  }, [user]);

  return (
    <>
      {/* Use site user not firebase user in everything (already done friends) */}
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/books"
            element={
              <MyBooks
                books={books}
                user={user}
                setLoading={setLoading}
                loading={loading}
              />
            }
          />
          <Route path="/friends" element={<FriendsList theUser={theUser} />} />
          {/* All refactors here are same as normal books, but could proabably find way to reduce code by resuing book displays code*/}
          <Route path="/friends/:id" element={<FriendBookList />} />

          <Route path="/" element={<Home user={user} books={books} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
