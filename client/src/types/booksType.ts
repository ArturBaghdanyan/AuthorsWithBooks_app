export interface Author {
  id: number;
  name: string;
  age: number;
  books: Book[];
}

export interface Book {
  id: number;
  bookName: string;
  year: number;
  description: string;
  countPages: number;
  authorId: number;
}
