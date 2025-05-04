"use client";

import { createUser } from "@/app/actions/userActions";
import { useState } from "react";

export default function UserForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(email, name);
      alert("Utilisateur créé avec succès!");
    } catch (error) {
      alert("Erreur lors de la création de l'utilisateur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />
      </div>
      <div>
        <label>Nom:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Créer l'utilisateur
      </button>
    </form>
  );
}
