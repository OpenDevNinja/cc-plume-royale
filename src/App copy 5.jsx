// src/App.jsx
import {  Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { UiProvider } from './contexts/UiContext'
import { CartProvider } from './contexts/CartContext'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from './components/common/Toast'
import Loader from './components/common/Loader'
import AppRoutes from './router/AppRouter'
import PublicRoutes from './router/PublicRouter'
import AuthRoutes from './router/AuthRouter'
import ParentRoutes from './router/ParentRouter'
import ChildRoutes from './router/ChildRouter'
import AdminRoutes from './router/AdminRouter'

function App() {
  return (
    <Router>
      <AuthProvider>
        <UiProvider>
          <CartProvider>
            <Routes>
              <Route path="/*" element={<PublicRoutes />} />
              <Route path="/auth/*" element={<AuthRoutes />} />
              <Route path="/parent/*" element={<ParentRoutes />} />
              <Route path="/child/*" element={<ChildRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
            <ToastContainer />
          </CartProvider>
        </UiProvider>
      </AuthProvider>
    </Router>
  )
}

export default App