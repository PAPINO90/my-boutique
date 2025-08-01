"use client";
import React, { useState } from "react";
import { useStore } from "../_store";

export default function OrderPage() {
  const { cart, clearCart } = useStore();
  const [success, setSuccess] = useState(false);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length > 0) {
      const newOrder = {
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
        address,
        phone
      };
      fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      })
        .then(res => {
          if (res.ok) {
            setSuccess(true);
            clearCart();
            setAddress("");
            setPhone("");
          }
        });
    }
  };

  return (
    <main className="p-4 min-h-[60vh] flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">Passer la commande</h1>
        {success ? (
          <div className="text-green-600 font-semibold text-center text-lg">Commande validée ! Merci pour votre achat.</div>
        ) : cart.length === 0 ? (
          <div className="text-gray-400 text-center text-lg">Aucun produit dans le panier.</div>
        ) : (
          <form onSubmit={handleOrder} className="max-w-lg mx-auto space-y-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-700">Total à payer :</span>
              <span className="text-2xl font-extrabold text-indigo-700">{total.toLocaleString("fr-FR")} FCFA</span>
            </div>
            <input
              type="text"
              placeholder="Adresse de livraison"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg bg-gray-50 placeholder-gray-400"
              value={address}
              onChange={e => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg bg-gray-50 placeholder-gray-400"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
            >
              Valider la commande
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
