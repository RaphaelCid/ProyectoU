"use client";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NuevaInspeccionModal = ({ isOpen, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 200); // delay para animación
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto transform transition-transform duration-200 ${
          isOpen ? "scale-100" : "scale-95"
        }`}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Nueva Inspección</h2>

        {/* Formulario */}
        <form className="space-y-3">
          <input type="text" placeholder="Patente - Código - Faena" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Tipo de inspección" className="w-full border p-2 rounded" />
          <input type="date" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Inspector" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Área" className="w-full border p-2 rounded" />
          <select className="w-full border p-2 rounded">
            <option>Pendiente</option>
            <option>Completado</option>
            <option>Observado</option>
          </select>
          <input type="text" placeholder="Nombre de imagen (img1.png)" className="w-full border p-2 rounded" />
          <div>
            <label htmlFor="file_input" className="block mb-1 text-sm font-medium text-gray-900">
                Adjuntar Imagen
            </label>
            <input
                id="file_input"
                type="file"
                className="block w-full border p-2 rounded text-gray-900 bg-white file:mr-4 file:py-2 file:px-4
                        file:rounded file:border-0 file:text-sm file:font-semibold
                        file:bg-[#0b1f5b] file:text-white hover:file:bg-blue-800"
            />
            </div>
          <textarea placeholder="Descripción" className="w-full border p-2 rounded" rows={3}></textarea>
          <input type="text" placeholder="Revisión" className="w-full border p-2 rounded" />
          <input type="text" placeholder="Centro de Trabajo" className="w-full border p-2 rounded" />

          <div className="text-right">
            <button
              type="submit"
              className="bg-[#0b1f5b] text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NuevaInspeccionModal;
