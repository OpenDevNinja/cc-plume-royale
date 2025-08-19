import React, { useState } from 'react'
import Input from '@/components/common/Input'
import Select from '@/components/common/Select'

const ProductFilter = ({
    categories = [],
    levels = [],
    onFilterChange
}) => {
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        search: '',
        priceRange: [0, 100]
    })

    const handleChange = (name, value) => {
        const newFilters = { ...filters, [name]: value }
        setFilters(newFilters)
        onFilterChange(newFilters)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                    <Select
                        options={[{ value: '', label: 'Toutes' }, ...categories]}
                        value={filters.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                    <Select
                        options={[{ value: '', label: 'Tous' }, ...levels]}
                        value={filters.level}
                        onChange={(e) => handleChange('level', e.target.value)}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
                    <Input
                        type="text"
                        placeholder="Rechercher des produits..."
                        value={filters.search}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix: {filters.priceRange[0]}€ - {filters.priceRange[1]}€
                </label>
                <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    )
}

export default ProductFilter