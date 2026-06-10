function Home({ books }) {
  return (
    <div className="container">
      <h1>📚 Library Management System</h1>
      <h3>Welcome to Library Portal</h3>

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

export default Home;