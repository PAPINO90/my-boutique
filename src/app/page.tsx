"use client";
import Link from "next/link";

export default function Home() {
  return (
	<main className="flex flex-col items-center justify-center min-h-screen p-0">
	  <section className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-16 px-4 text-center">
		<h1 className="text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
		  Bienvenue sur my-boutique
		</h1>
		<p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto drop-shadow">
		  Découvrez notre sélection de produits tendance et profitez d&#39;une
		  expérience d&#39;achat simple, rapide et agréable sur tous vos appareils.
		</p>
		<Link
		  href="/products"
		  className="btn btn-primary text-lg px-8 py-3 shadow-lg"
		>
		  Voir tous les produits
		</Link>
	  </section>
	</main>
  );
}
