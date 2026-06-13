import { useState } from "react";

function BookDeletion() {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Java Programming",
      category: "Programming",
    },
    {
      id: 2,
      title: "Python Fundamentals",
      category: "Programming",
    },
    {
      id: 3,
      title: "React Development",
      category: "Web Development",
    },
    {
      id: 4,
      title: "Data Structures",
      category: "Computer Science",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const deleteBook = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    setBooks(
      books.filter((book) => book.id !== id)
    );

    setLoading(false);
  };

  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="library-page">
      <div className="card large-card">
        <h2>📚 Book Deletion System</h2>

        <h4>Total Books: {books.length}</h4>

        <input
          type="text"
          placeholder="Search Book..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {loading && (
          <h3 className="loading">
            ⏳ Deleting Book...
          </h3>
        )}

        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id}>
              <div>
                <strong>{book.title}</strong>
                <p>{book.category}</p>
              </div>

              <button
                className="danger-btn"
                onClick={() =>
                  deleteBook(book.id)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {filteredBooks.length === 0 && (
          <h3>No Books Found</h3>
        )}
      </div>
    </div>
  );
}

export default BookDeletion;