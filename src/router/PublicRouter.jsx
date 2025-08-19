// src/routes/PublicRoutes.jsx
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import PublicLayout from '../components/layout/AppLayout'
import Home from '../pages/public/Home'
import About from '../pages/public/About'
import Contact from '../pages/public/Contact'
import Pricing from '../pages/public/Pricing'
import NotFound from '../pages/NotFound'
import KidsAcademyPage from '../pages/public/KidsAcademyPage'
import FamilyAcademyPage from '../pages/public/FamilyAcademyPage'
import ResourcesPage from '../pages/public/ResourcesPage'
import ResourceDetailPage from '../pages/public/ResourceDetailPage'


function PublicRoutes() {
    return (
        <Routes>
            <Route element={<PublicLayout />}>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="*" element={<NotFound />} />
                <Route path="kids-academy" element={<KidsAcademyPage />} />
                <Route path="family-academy" element={<FamilyAcademyPage />} />
                <Route path="resources" element={<ResourcesPage />} />
                <Route path="resources/:id" element={<ResourceDetailPage />} />
            </Route>
        </Routes>
    )
}

export default PublicRoutes