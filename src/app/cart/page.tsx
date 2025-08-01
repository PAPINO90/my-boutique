"use client";
import React from "react";
import { useStore } from "../_store";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <main className="p-4 min-h-[60vh] flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 mt-6">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-tight">Mon panier</h1>
        {cart.length === 0 ? (
          <div className="text-gray-400 text-center text-lg">Votre panier est vide.</div>
        ) : (
          <>
            <ul className="mb-6 divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col sm:flex-row justify-between items-center py-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
                    <span className="font-medium text-lg text-gray-800 capitalize w-40 truncate">{item.name}</span>
                    <span className="text-gray-500">x {item.quantity}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <span className="text-indigo-600 font-semibold text-lg">{(item.price * item.quantity).toLocaleString("fr-FR")} FCFA</span>
                    <button
                      className="transition bg-pink-500 hover:bg-pink-600 text-white px-3 py-1 rounded-full shadow-sm text-sm font-bold focus:outline-none focus:ring-2 focus:ring-pink-300"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Retirer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center border-t pt-6 mt-6">
              <span className="text-xl font-bold text-gray-700">Total :</span>
              <span className="text-2xl font-extrabold text-indigo-700">{total.toLocaleString("fr-FR")} FCFA</span>
            </div>
            <button
              className="mt-8 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white py-3 rounded-lg font-bold text-lg shadow-md hover:from-indigo-600 hover:to-blue-600 transition"
              onClick={clearCart}
            >
              Vider le panier
            </button>
          </>
        )}
      </div>
    </main>
  );
}
