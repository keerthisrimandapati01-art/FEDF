import { useState } from "react";
import "./App.css";

function App() {
  const [books, setBooks] = useState(
    JSON.parse(localStorage.getItem("books") || "[]")
  );

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [message, setMessage] = useState("");

  const addBook = (e) => {
    e.preventDefault();

    if (isbn.length < 10) {
      setMessage("❌ ISBN must be at least 10 characters");
      return;
    }

    const newBook = { title, author, isbn };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);

    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setMessage("✅ Book Added Successfully!");

    setTitle("");
    setAuthor("");
    setIsbn("");
  };

  return (
    <div className="container">
      <h1>📚 Library Management System</h1>

      {/* FORM */}
      <h2>Add Book</h2>

      <form onSubmit={addBook}>
        <input
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <input
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />

        <button type="submit">Add Book</button>
      </form>

      <p className="message">{message}</p>

      {/* BOOK LIST */}
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul>
          {books.map((book, index) => (
            <li key={index}>
              <strong>{book.title}</strong> by {book.author} <br />
              ISBN: {book.isbn}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;