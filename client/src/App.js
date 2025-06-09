import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AuthSuccess from './components/AuthSuccess';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen flex flex-col">
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
              <Route path="/auth/success" element={<AuthSuccess />} />
              <Route 
                path="/admin/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute allowedRoles={['user', 'admin']}>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route 
                path="/admin/users" 
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <div>User Management Page</div>
                  </PrivateRoute>
                }
              />
              <Route 
                path="/admin/roles" 
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <div>Role Management Page</div>
                  </PrivateRoute>
                }
              />
              <Route 
                path="/admin/settings" 
                element={
                  <PrivateRoute allowedRoles={['admin']}>
                    <div>System Settings Page</div>
                  </PrivateRoute>
                }
              />
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
