// src/App.jsx
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './contexts/AuthContext'
import { UiProvider } from './contexts/UiContext'
import { CartProvider } from './contexts/CartContext'
import { ToastContainer } from './components/common/Toast'
import Loader from './components/common/Loader'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UiProvider>
          <CartProvider>
            <AppRouter />
            <ToastContainer />
            <Loader />
          </CartProvider>
        </UiProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App