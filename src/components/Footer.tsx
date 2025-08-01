export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-gray-500 text-center py-4 mt-8 border-t">
      <span>&copy; {new Date().getFullYear()} my-boutique. Tous droits réservés.</span>
    </footer>
  );
}
