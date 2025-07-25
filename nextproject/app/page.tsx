"use client";
import Dashboard from "../app/presentation/components/dashboard";

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-center mb-5">¡Bienvenido, {}!</h1>
        <Dashboard />
      </div>
    </div>
  )
}
