export default interface BookType {
  id: string;
  img: string;
  title: string;
  author: string;
  pageCount: number;
  genre: string;
  uid: string;
  dateRead: any;
  rating: number;
}

export interface SiteUser {
  uid: string;
  name: string;
  profileImg: string;
  friends: any[];
  dateCreated?: Date;
}
