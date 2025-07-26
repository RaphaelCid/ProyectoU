"use client";
import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: InspeccionData) => void;
  defaultData?: InspeccionData | null;
}

export type InspeccionData = {
  id?: number;
  codigo: string;
  tipo: string;
  fecha: string;
  inspector: string;
  area: string;
  estado: string;
  imagen: string;
  descripcion: string;
  revision: string;
  centroTrabajo: string;
};

const defaultForm: InspeccionData = {
  codigo: "",
  tipo: "",
  fecha: "",
  inspector: "",
  area: "",
  estado: "Pendiente",
  imagen: "",
  descripcion: "",
  revision: "",
  centroTrabajo: ""
};

const NuevaInspeccionModal = ({ isOpen, onClose, onSave, defaultData }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState<InspeccionData>(defaultForm);

  useEffect(() => {
    if (isOpen) {
      setFormData(defaultData || defaultForm);
      setVisible(true);
    } else {
      const timeout = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, defaultData]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codigo || !formData.tipo || !formData.fecha) {
      alert("Por favor completa al menos Código, Tipo y Fecha.");
      return;
    }
    onSave(formData);
    onClose();
  };

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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FiX size={24} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          {defaultData ? "Editar Inspección" : "Nueva Inspección"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Patente - Código - Faena"
            value={formData.codigo}
            onChange={(e) => setFormData({ ...formData, codigo: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Tipo de inspección"
            value={formData.tipo}
            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Inspector"
            value={formData.inspector}
            onChange={(e) => setFormData({ ...formData, inspector: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Área"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <select
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
            className="w-full border p-2 rounded"
          >
            <option>Pendiente</option>
            <option>Completado</option>
            <option>Observado</option>
            <option>Finalizada</option>
          </select>
          <input
            type="text"
            placeholder="Nombre de imagen (img1.png)"
            value={formData.imagen}
            onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            className="w-full border p-2 rounded"
            rows={3}
          ></textarea>
          <input
            type="text"
            placeholder="Revisión"
            value={formData.revision}
            onChange={(e) => setFormData({ ...formData, revision: e.target.value })}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Centro de Trabajo"
            value={formData.centroTrabajo}
            onChange={(e) => setFormData({ ...formData, centroTrabajo: e.target.value })}
            className="w-full border p-2 rounded"
          />

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
