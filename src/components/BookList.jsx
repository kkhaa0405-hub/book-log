import { memo } from "react";
import BookCard from "./BookCard.jsx";

function BookList({ books }) {
  return (
    <div className="grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default memo(BookList);
