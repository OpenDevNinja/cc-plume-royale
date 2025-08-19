// src/routes/ParentRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import { ROUTES } from '../config/routes'
import ParentLayout from '../components/layout/ParentLayout'
import ParentDashboard from '../pages/parent/Dashboard'
import AddChild from '../pages/parent/AddChild'
import ChildProgress from '../pages/parent/Children/ChildProgress'
import ParentProfile from '../pages/parent/Profile'
import ParentSettings from '../pages/parent/Settings'
import ShopProducts from '../pages/parent/Shop/Products'
import Cart from '../pages/parent/Shop/Cart'
import Checkout from '../pages/parent/Shop/Checkout'
import Orders from '../pages/parent/Shop/Orders'
import SubscriptionCurrent from '../pages/parent/Subscriptions/CurrentPlan'
import SubscriptionChange from '../pages/parent/Subscriptions/ChangePlan'
import Invoices from '../pages/parent/Billing/Invoices'
import PaymentMethods from '../pages/parent/Billing/PaymentMethods'
import { useAuth } from '../hooks/useAuth'
import NotFound from '../pages/NotFound'

function ParentRoutes() {
    const { user } = useAuth()

    if (!user || user.role !== 'parent') {
        return <Navigate to={ROUTES.LOGIN} replace />
    }

    return (
        <Routes>
            <Route element={<ParentLayout />}>
                <Route index element={<ParentDashboard />} />
                <Route path='dashboard' element={<ParentDashboard />} />
                <Route path="add-child" element={<AddChild />} />
                <Route path="children/:id/progress" element={<ChildProgress />} />
                <Route path="profile" element={<ParentProfile />} />
                <Route path="settings" element={<ParentSettings />} />
                <Route path="shop">
                    <Route index element={<ShopProducts />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="orders" element={<Orders />} />
                </Route>
                <Route path="subscription">
                    <Route index element={<SubscriptionCurrent />} />
                    <Route path="change" element={<SubscriptionChange />} />
                </Route>
                <Route path="billing">
                    <Route path="invoices" element={<Invoices />} />
                    <Route path="payment-methods" element={<PaymentMethods />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default ParentRoutes