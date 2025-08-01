
"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Appel API à créer côté backend
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.success) {
      setMessage("Connexion réussie !");
      setEmail(""); setPassword("");
      // Redirection ou stockage du token à ajouter ici
    } else {
      setMessage("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Connexion</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded p-2" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="border rounded p-2" required />
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-bold">Se connecter</button>
      </form>
      <div className="mt-4 text-center">
        <a href="/auth/register" className="text-indigo-600 hover:underline font-bold">Créer un compte</a>
      </div>
      {message && <div className={`mt-4 text-center ${message.includes('réussie') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
    </div>
  );
}
