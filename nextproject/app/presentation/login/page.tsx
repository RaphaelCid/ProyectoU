"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // usar login del contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar cookie simulada
    document.cookie = "auth_token=demo123; path=/";

    login(); // ⬅️ actualiza el estado del contexto

    router.push("/"); // Redirigir al home
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Iniciar sesión</h2>

        <label className="block mb-2 text-sm">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-sm">Contraseña</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#0b1f5b] hover:bg-[#08153f] text-white p-2 rounded"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
