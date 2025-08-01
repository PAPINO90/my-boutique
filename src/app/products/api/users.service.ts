// Simple gestion des utilisateurs en mémoire + fichier users.json
import * as fs from "fs";
import * as path from "path";

const USERS_FILE = path.resolve(__filename, "..", "users.json");

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

function readUsers(): User[] {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function registerUser(name: string, email: string, password: string): boolean {
  const users = readUsers();
  if (users.find(u => u.email === email)) return false;
  const newUser: User = {
    id: Date.now(),
    name,
    email,
    password,
  };
  users.push(newUser);
  writeUsers(users);
  return true;
}

export function loginUser(email: string, password: string): User | null {
  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
}
