
import React from "react";
import { useState } from "react";
import Image from "next/image";

// Définition locale du type Product pour inclure image
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Props = {
  product: Product;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {

  const [showModal, setShowModal] = useState(false);
  let imageContent;
  const handleImageClick = () => {
    if (product.image) setShowModal(true);
  };

if (product.image && product.image.startsWith("data:")) {
  imageContent = (
    <Image
      src={product.image}
      alt={product.name}
      width={128}
      height={128}
      className="h-32 w-32 object-cover rounded-lg mb-2 cursor-pointer"
      unoptimized
      onClick={handleImageClick}
    />
  );
} else if (product.image) {
  imageContent = (
    <Image
      src={"/images/" + product.image}
      alt={product.name}
      width={128}
      height={128}
      className="h-32 w-32 object-cover rounded-lg mb-2 cursor-pointer"
      unoptimized
      onClick={handleImageClick}
    />
  );
} else {
  imageContent = (
    <div className="h-32 w-32 bg-blue-100 rounded-lg mb-2 flex items-center justify-center">
      <span className="text-4xl text-indigo-400">🛒</span>
    </div>
  );
}

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:scale-105 transition-transform">
        {imageContent}
        <h2 className="font-semibold text-lg mb-1">{product.name}</h2>
        <p className="mb-2 text-indigo-600 font-bold">{product.price} CFA</p>
        <button
          className="btn w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:scale-105 hover:bg-green-500 hover:text-white focus:bg-green-600 focus:text-white active:bg-green-700 active:text-white transition-all flex items-center justify-center"
          onClick={() => onAdd(product)}
        >
          <span>Ajouter au panier</span>
        </button>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-4 max-w-2xl mx-auto" onClick={e => e.stopPropagation()}>
            <Image
              src={product.image.startsWith("data:") ? product.image : "/images/" + product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-auto object-contain rounded-lg"
              unoptimized
            />
            <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => setShowModal(false)}>Fermer</button>
          </div>
        </div>
      )}
    </>
  );
}
