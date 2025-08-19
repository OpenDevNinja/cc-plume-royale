import { useState, useEffect } from "react";
import { getProducts } from "@/api/shop";

export function useProducts(initialFilters = {}) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        applyFilters(data, filters);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters(products, filters);
  }, [filters, products]);

  const applyFilters = (productsToFilter, filters) => {
    let result = [...productsToFilter];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map(Number);
      result = result.filter((p) => {
        if (max) return p.price >= min && p.price <= max;
        return p.price >= min;
      });
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "newest":
          result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "popular":
          result.sort((a, b) => b.sales - a.sales);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  };

  const refetch = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      applyFilters(data, filters);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    products: filteredProducts,
    loading,
    error,
    filters,
    setFilters,
    refetch,
  };
}
