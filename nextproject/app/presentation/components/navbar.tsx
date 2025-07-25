"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FiChevronDown, FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext"; // ajusta la ruta si es necesario

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = (menu: string) => {
    setOpenMenu(prev => (prev === menu ? null : menu));
    setUserMenuOpen(false);
  };

  const toggleUserMenu = () => {
    setOpenMenu(null);
    setUserMenuOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    router.push("/presentation/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isAuthenticated) return null;

  return (
    <nav className="w-full bg-[#0b1f5b] text-white px-10 py-4 shadow-md">
      <div className="flex items-center justify-between">
        {/* Logo / Nombre Empresa */}
        <div className="text-xl font-bold">Tu Empresa</div>

        {/* Menú principal */}
        <div className="flex space-x-8 items-center">
          {/* Dashboard */}
          <div className="relative">
            <button onClick={() => toggleMenu("dashboard")} className="flex items-center space-x-1 hover:underline">
              <span>Dashboard</span>
              <FiChevronDown />
            </button>
            {openMenu === "dashboard" && (
              <div className="absolute top-10 left-0 bg-white text-black rounded shadow-lg py-2 w-48 z-50">
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100">Página de inicio</Link>
                <Link href="/desempeno" className="block px-4 py-2 hover:bg-gray-100">Desempeño</Link>
              </div>
            )}
          </div>

          {/* Gestión */}
          <div className="relative">
            <button onClick={() => toggleMenu("gestion")} className="flex items-center space-x-1 hover:underline">
              <span>Gestión</span>
              <FiChevronDown />
            </button>
            {openMenu === "gestion" && (
              <div className="absolute top-10 left-0 bg-white text-black rounded shadow-lg py-2 w-56 z-50">
                <Link href="/inspeccion" className="block px-4 py-2 hover:bg-gray-100">Inspección</Link>
                <Link href="/observacion" className="block px-4 py-2 hover:bg-gray-100">Observación</Link>
                <Link href="/capacitacion" className="block px-4 py-2 hover:bg-gray-100">Capacitación</Link>
                <Link href="/epp" className="block px-4 py-2 hover:bg-gray-100">Entrega EPP</Link>
                <Link href="/incidentes" className="block px-4 py-2 hover:bg-gray-100">Incidentes</Link>
              </div>
            )}
          </div>

          {/* Ajustes */}
          <div className="relative">
            <button onClick={() => toggleMenu("ajustes")} className="flex items-center space-x-1 hover:underline">
              <span>Ajustes</span>
              <FiChevronDown />
            </button>
            {openMenu === "ajustes" && (
              <div className="absolute top-10 left-0 bg-white text-black rounded shadow-lg py-2 w-64 z-50">
                <Link href="/rendimiento" className="block px-4 py-2 hover:bg-gray-100">Revisión de rendimientos</Link>
                <Link href="/observaciones" className="block px-4 py-2 hover:bg-gray-100">Revisión de observaciones</Link>
                <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-100">Configuración de perfil</Link>
                <Link href="/usuarios/nuevo" className="block px-4 py-2 hover:bg-gray-100">Agregar usuario</Link>
              </div>
            )}
          </div>
        </div>

        {/* Icono de Usuario */}
        <div className="relative ml-4" ref={userMenuRef}>
          <button
            onClick={toggleUserMenu}
            className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center hover:bg-[#221706]"
          >
            <FiUser className="text-white h-6 w-6" />
          </button>

          {userMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
              <Link href="/perfil" className="block px-4 py-3 hover:bg-gray-100">Mi perfil</Link>
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-100"
              >
                <FiLogOut className="mr-2" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
