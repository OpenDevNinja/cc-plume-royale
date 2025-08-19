import { useState, useEffect } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/api/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addProduct = async (productData) => {
    try {
      const newProduct = await createProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      throw err;
    }
  };

  const editProduct = async (id, productData) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  };

  const removeProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    isLoading,
    error,
    addProduct,
    editProduct,
    removeProduct,
    refresh: fetchProducts,
  };
}
