
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>      <div className="App min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                  Welcome to User Management
                </h1>
                <p className="text-center text-gray-600 text-responsive">
                  Manage your users efficiently and securely.
                </p>
              </div>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4">
          <div className="container mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} User Management. All rights reserved.
          </div>
        </footer>
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
