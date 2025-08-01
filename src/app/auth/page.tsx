import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-xl shadow text-center">
      <h1 className="text-2xl font-bold mb-4 text-indigo-700">Espace utilisateur</h1>
      <div className="flex flex-col gap-4">
        <Link href="/auth/login" className="bg-indigo-600 text-white py-2 rounded font-bold">Connexion</Link>
        <Link href="/auth/register" className="bg-gray-200 text-indigo-700 py-2 rounded font-bold">Créer un compte</Link>
      </div>
    </div>
  );
}
