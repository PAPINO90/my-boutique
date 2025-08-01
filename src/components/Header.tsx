"use client";
import Link from "next/link";
import { useStore } from "../app/_store";

export default function Header() {
  const { cart } = useStore();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link href="/" className="text-2xl font-bold tracking-tight">my-boutique</Link>
        <div className="flex gap-4 items-center">
          <Link href="/products" className="hover:underline">Produits</Link>
          <Link href="/cart" className="relative hover:underline flex items-center">
            Panier
            <span className="ml-1 bg-pink-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-bounce">
              {totalCount}
            </span>
          </Link>
          <Link href="/order" className="hover:underline">Commander</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
          <Link href="/auth/login" className="hover:underline bg-white text-indigo-600 px-3 py-1 rounded font-bold shadow">Connexion</Link>
        </div>
      </nav>
    </header>
  );
}
