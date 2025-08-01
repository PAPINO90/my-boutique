"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string; // base64 ou nom de fichier
};

type Order = {
  id: number;
  items: { productId: number; quantity: number }[];
  status: "pending" | "done";
  address?: string;
  phone?: string;
};

export default function AdminPage() {
  const [tab, setTab] = useState<'products' | 'orders'>('products');

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">Espace Administrateur</h1>
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg shadow overflow-hidden border border-gray-200 bg-white">
          <button
            className={`px-8 py-3 text-lg font-semibold transition-colors duration-200 focus:outline-none ${tab === 'products' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setTab('products')}
          >
            Produits
          </button>
          <button
            className={`px-8 py-3 text-lg font-semibold transition-colors duration-200 focus:outline-none border-l border-gray-200 ${tab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            onClick={() => setTab('orders')}
          >
            Commandes
          </button>
        </div>
      </div>
      {tab === 'products' ? <AdminProducts /> : <AdminOrders />}
    </main>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState<File | null>(null);


  // Recharge les produits depuis l'API à chaque affichage de l'onglet
  useEffect(() => {
    const updateProducts = () => {
      fetch("http://localhost:3001/products")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setProducts(data);
          else setProducts([]);
        })
        .catch(() => setProducts([]));
    };
    updateProducts();
    window.addEventListener("focus", updateProducts);
    return () => window.removeEventListener("focus", updateProducts);
  }, []);



  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || (!image && !file)) return;
    // Suppression de la restriction : tous les produits peuvent être ajoutés
    let imageData = image;
    if (file) {
      imageData = await toBase64(file);
    }
    // Appel API pour ajouter le produit
    const newProduct = { name, price: parseFloat(price), image: imageData };
    const res = await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      const created = await res.json();
      setProducts([...products, created]);
    }
    setName("");
    setPrice("");
    setImage("");
    setFile(null);
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:3001/products/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setProducts(products.filter((p) => p.id !== id));
        }
      });
  };

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  return (
    <section>
      <h2 className="text-2xl font-extrabold mb-8 text-indigo-700">Ajouter un produit</h2>
      <form className="max-w-lg w-full bg-white rounded-xl shadow-md p-8 mb-10 flex flex-col gap-6" onSubmit={handleAdd}>
        <input type="text" placeholder="Nom du produit" className="input input-bordered w-full text-lg" value={name} onChange={e => setName(e.target.value)} required />
        <input type="number" placeholder="Prix (CFA)" className="input input-bordered w-full text-lg" value={price} onChange={e => setPrice(e.target.value)} required min="0" step="0.01" />
        <input type="text" placeholder="Nom du fichier image (optionnel)" className="input input-bordered w-full text-lg" value={image} onChange={e => setImage(e.target.value)} />
        <input type="file" accept="image/*" className="input input-bordered w-full text-lg" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition">Ajouter</button>
      </form>
      <h3 className="text-xl font-bold mb-4 text-indigo-700">Produits existants</h3>
      <ul className="space-y-4">
        {products.map((p) => (
          <li key={p.id} className="flex items-center gap-6 border p-4 rounded-lg bg-white shadow-sm">
            {p.image.startsWith("data:") ? (
              <Image src={p.image} alt={p.name} width={48} height={48} className="w-12 h-12 object-cover rounded" unoptimized />
            ) : (
              <Image src={"/images/" + p.image} alt={p.name} width={48} height={48} className="w-12 h-12 object-cover rounded" unoptimized />
            )}
            <span className="flex-1">{p.name} - {p.price} CFA</span>
            <button
              className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 focus:bg-red-700 transition-colors duration-200 text-base"
              onClick={() => handleDelete(p.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Recharge les commandes à chaque affichage de l'onglet
  useEffect(() => {
    const updateOrders = () => {
      fetch("http://localhost:3001/orders")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setOrders(data);
          else setOrders([]);
        })
        .catch(() => setOrders([]));
    };
    const updateProducts = () => {
      fetch("http://localhost:3001/products")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setProducts(data);
          else setProducts([]);
        })
        .catch(() => setProducts([]));
    };
    updateOrders();
    updateProducts();
    window.addEventListener("focus", updateOrders);
    window.addEventListener("focus", updateProducts);
    return () => {
      window.removeEventListener("focus", updateOrders);
      window.removeEventListener("focus", updateProducts);
    };
  }, []);

  const markDone = (id: number) => {
    fetch(`http://localhost:3001/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "done" }),
    })
      .then(res => {
        if (res.ok) {
          setOrders(orders => orders.map(o => o.id === id ? { ...o, status: "done" } : o));
        }
      });
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Commandes reçues</h2>
      <ul className="space-y-2">
        {orders.length === 0 && (
          <li className="text-center py-8 text-lg text-gray-400 font-medium">Aucune commande reçue.</li>
        )}
        {orders.map((o) => (
          <li key={o.id} className="border p-2 rounded flex flex-col md:flex-row md:items-center gap-2 md:gap-4 bg-white">
            <div className="flex-1">
              <div className="font-semibold">{o.status === "done" ? "Traitée" : "En attente"}</div>
              {o.items && o.items.length > 0 && (
                <>
                  <ul className="ml-4 my-2 list-disc text-sm text-gray-800">
                    {o.items.map((item, idx) => {
                      const prod = products.find(p => p.id == item.productId || p.id === item.productId);
                      return (
                        <li key={idx}>
                          {prod ? (
                            <>
                              <span className="font-medium">{prod.name}</span> x {item.quantity} — <span className="text-indigo-700 font-semibold">{prod.price} CFA</span>
                            </>
                          ) : (
                            <span className="text-red-500">Produit inconnu</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <div className="ml-4 text-base font-bold text-indigo-800">
                    Total : {o.items.reduce((sum, item) => {
                      const prod = products.find(p => p.id == item.productId || p.id === item.productId);
                      return sum + (prod ? prod.price * item.quantity : 0);
                    }, 0).toLocaleString('fr-FR')} CFA
                  </div>
                </>
              )}
              {o.address && (
                <div className="text-sm text-gray-700">Adresse de livraison : <span className="font-medium">{o.address}</span></div>
              )}
              {o.phone && (
                <div className="text-sm text-gray-700">Téléphone client : <span className="font-medium">{o.phone}</span></div>
              )}
            </div>
            {o.status === "pending" && (
              <button
                className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow hover:bg-green-600 focus:bg-green-700 transition-colors duration-200 text-base self-start md:self-auto"
                onClick={() => markDone(o.id)}
              >
                Marquer comme traitée
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
