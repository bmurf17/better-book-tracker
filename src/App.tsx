import { useState, useEffect } from "react";
import "./App.css";
import BookType, { SiteUser } from "./types/bookType";
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
import { FriendBookList } from "./Components/FirendBookList";

function App() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [theUser, setTheUser] = useState<SiteUser>();

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  useEffect(() => {
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
              rating: doc.data().rating,
            };
            return book;
          });
          setBooks(temp);
        });
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
              rating: doc.data().rating,
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

    const loadUser = async () => {
      if (user) {
        const usersCollectionRef = collection(db, "users");

        const q = query(usersCollectionRef, where("uid", "==", user?.uid));

        const querySnapshot = await getDocs(q);

        querySnapshot.docs.map((doc) => {
          const siteUser: SiteUser = {
            id: doc.data().id,
            friends: doc.data().friends,
            name: doc.data().name,
            profileImg: doc.data().profileImg,
            uid: doc.data().uid,
          };
          return setTheUser(siteUser);
        });
      }
    };

    loadUser();
    loadBooks();
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

          <Route path="/friends" element={<FriendsList theUser={theUser} />} />

          <Route path="/friends/:id" element={<FriendBookList />} />

          <Route path="/" element={<Home user={user} books={books} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
