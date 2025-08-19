// src/components/shop/ProductGrid.jsx
import ProductCard from './ProductCard'
import EmptyState from '../common/EmptyState'

function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <EmptyState
                title="Aucun produit trouvé"
                description="Essayez de modifier vos critères de recherche"
                icon="shopping-bag"
            />
        )
    }

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid