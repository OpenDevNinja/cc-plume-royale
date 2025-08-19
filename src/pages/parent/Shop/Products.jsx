// src/pages/parent/Shop/Products.jsx
import { useState } from 'react'
import ProductGrid from '@/components/shop/ProductGrid'
import ProductFilter from '@/components/shop/ProductFilter'
import ParentLayout from '@/components/layout/ParentLayout'
import { useProducts } from '@/hooks/useProducts'

function ShopProducts() {
    const [filters, setFilters] = useState({
        category: 'all',
        priceRange: [0, 100],
        searchQuery: ''
    })
    const { products, isLoading } = useProducts(filters)

    return (
        <ParentLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4">
                        <ProductFilter
                            filters={filters}
                            onFilterChange={setFilters}
                        />
                    </div>
                    <div className="md:w-3/4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Boutique</h1>
                        <ProductGrid
                            products={products}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </ParentLayout>
    )
}

export default ShopProducts