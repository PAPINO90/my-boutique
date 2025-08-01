"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Appel API à créer côté backend
    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name })
    });
    if (res.ok) {
      setMessage("Compte créé avec succès ! Connectez-vous.");
      setEmail(""); setPassword(""); setName("");
    } else {
      setMessage("Erreur lors de la création du compte.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700 text-center">Créer un compte</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} className="border rounded p-2" required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded p-2" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="border rounded p-2" required />
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-bold">Créer le compte</button>
      </form>
      {message && <div className="mt-4 text-center text-green-600">{message}</div>}
    </div>
  );
}
