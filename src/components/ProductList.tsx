"use client";
import { useEffect, useState } from "react";
import { useStore } from "../app/_store";
import ProductCard from "./ProductCard";

// Type Product compatible avec le store
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function ProductList() {
  const [clientProducts, setClientProducts] = useState<Product[]>([]);
  const { addToCart } = useStore();

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setClientProducts(data);
        else setClientProducts([]);
      })
      .catch(() => setClientProducts([]));
  }, []);

  const displayProducts = clientProducts ?? [];

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Nos produits</h1>
      {displayProducts.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">Aucun produit disponible pour le moment.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      )}
    </main>
  );
}
