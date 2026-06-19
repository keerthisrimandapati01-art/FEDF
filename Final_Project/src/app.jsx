import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleToggle = () => {
    setIsActive(!isActive)
  }

  return (
    <div className="app-container">
      <header>
        <h1>Welcome to App</h1>
        <p>Your amazing React application</p>
      </header>

      <main>
        <section className="counter-section">
          <h2>Counter</h2>
          <p>Current count: {count}</p>
          <button onClick={handleIncrement}>Increment</button>
          <button onClick={() => setCount(0)}>Reset</button>
        </section>

        <section className="toggle-section">
          <h2>Toggle Feature</h2>
          <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
          <button onClick={handleToggle}>
            {isActive ? 'Deactivate' : 'Activate'}
          </button>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}
