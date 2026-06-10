import { useState } from "react";

function AddBook({ addBook }) {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isbn.length < 10) {
      setMessage("❌ ISBN must be at least 10 characters");
      return;
    }

    const newBook = {
      title: bookTitle,
      author,
      isbn,
    };

    addBook(newBook);

    setMessage("✅ Book Added Successfully!");

    setBookTitle("");
    setAuthor("");
    setIsbn("");
  };

  return (
    <div className="container">
      <h2>Add New Book</h2>

      <form onSubmit={handleSubmit}>
        <label>Book Title</label>
        <input
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />

        <label>Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <label>ISBN</label>
        <input
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <p className="message">{message}</p>
    </div>
  );
}

export default AddBook;