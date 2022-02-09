import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase.config";
import BookType from "../types/bookType";

export default function loadBooks(
  uid: string,
  setBooks: React.Dispatch<React.SetStateAction<BookType[]>>
) {
  //go through all the books that match the current users UID
  const unsub = onSnapshot(collection(db, "books"), async () => {
    const q = query(
      collection(db, "books"),
      where("uid", "==", uid),
      orderBy("dateRead")
    );
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
    return temp;
  });

  return unsub;
}
