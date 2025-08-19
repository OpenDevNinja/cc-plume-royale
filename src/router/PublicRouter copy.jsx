// src/router/PublicRouter.jsx
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import Home from '../pages/Home'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Pricing from '../pages/Pricing'
import NotFound from '../pages/NotFound'
import PublicLayout from '../components/layout/AppLayout'

function PublicRouter() {
    return (
        <Routes>
            {/* Utilisez le Layout comme élément parent */}
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="pricing" element={<Pricing />} />
            </Route>
            {/* Route 404 en dehors du layout si nécessaire */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default PublicRouter