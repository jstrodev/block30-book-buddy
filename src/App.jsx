// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Books from './components/Books';
import SingleBook from './components/SingleBook';
import Account from './components/Account';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Library App</h1>
              <Navigation token={token} setToken={setToken} />
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Navigate to="/books" replace />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<SingleBook token={token} />} />
              <Route path="/login" element={<Login setToken={setToken} />} />
              <Route path="/register" element={<Register setToken={setToken} />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute token={token} />}>
                <Route path="/account" element={<Account token={token} />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;