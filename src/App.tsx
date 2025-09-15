import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import CriteriaManagement from './pages/admin/CriteriaManagement';
import AHPPairwise from './pages/admin/AHPPairwise';

// Operator pages  
import OperatorDashboard from './pages/operator/OperatorDashboard';

// Guru pages
import GuruDashboard from './pages/guru/GuruDashboard';

function App() {
  const { checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const getDefaultRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'operator':
        return '/operator';
      case 'guru':
        return '/guru';
      default:
        return '/login';
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/criteria" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <CriteriaManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/ahp/pairwise" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AHPPairwise />
              </ProtectedRoute>
            } />

            {/* Operator Routes */}
            <Route path="/operator" element={
              <ProtectedRoute allowedRoles={['operator']}>
                <OperatorDashboard />
              </ProtectedRoute>
            } />

            {/* Guru Routes */}
            <Route path="/guru" element={
              <ProtectedRoute allowedRoles={['guru']}>
                <GuruDashboard />
              </ProtectedRoute>
            } />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
          
          {/* 404 */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen bg-red-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">403</h1>
                <p className="text-red-800">Akses ditolak. Anda tidak memiliki izin untuk halaman ini.</p>
              </div>
            </div>
          } />
          
          <Route path="*" element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600">404</h1>
                <p className="text-gray-800">Halaman tidak ditemukan.</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;