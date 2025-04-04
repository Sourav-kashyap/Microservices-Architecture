export interface IBook {
  bookId: string;
  title: string;
  isbn: string;
  price: number;
  publishDate: string;
  authorId: string;
  categoryId: string;
}

export interface IBookView {
  bookId: string;
  title: string;
  isbn: string;
  price: number;
  publishDate: string;
  author: {
    authorId: string;
    authorName: string;
  };
  category: {
    categoryId: string;
    categoryName: string;
  };
}
