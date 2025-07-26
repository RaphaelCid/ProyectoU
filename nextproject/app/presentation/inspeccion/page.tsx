'use client';
import { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { FiX } from 'react-icons/fi';

interface Inspeccion {
  id: number;
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
}

const inspeccionesEjemplo: Inspeccion[] = [
  {
    id: 1,
    codigo: "AB123-CD456-Faena Norte",
    tipo: "General",
    fecha: "2025-07-22",
    inspector: "Juan Pérez",
    area: "Zona Norte",
    estado: "Pendiente",
    imagen: "imagen1.png",
    descripcion: "Se encontró un desperfecto menor en la maquinaria.",
    revision: "Requiere seguimiento",
    centroTrabajo: "Planta A",
  },
  {
    id: 2,
    codigo: "XZ890-YT321-Faena Sur",
    tipo: "EPP",
    fecha: "2025-07-20",
    inspector: "Ana Díaz",
    area: "Bodega",
    estado: "Finalizada",
    imagen: "imagen2.png",
    descripcion: "Inspección completa sin observaciones.",
    revision: "Aprobada",
    centroTrabajo: "Planta B",
  },
];

export default function InspeccionPage() {
  const [inspecciones, setInspecciones] = useState<Inspeccion[]>([]);
  const [formData, setFormData] = useState<Partial<Inspeccion>>({});
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('inspecciones');
    const parsed = data ? JSON.parse(data) : [];
  
    if (parsed.length === 0) {
      setInspecciones(inspeccionesEjemplo);
      localStorage.setItem('inspecciones', JSON.stringify(inspeccionesEjemplo));
    } else {
      setInspecciones(parsed);
    }
  }, []);
  

  useEffect(() => {
    localStorage.setItem('inspecciones', JSON.stringify(inspecciones));
  }, [inspecciones]);

  const handleGuardar = () => {
    if (
      !formData.codigo ||
      !formData.tipo ||
      !formData.fecha ||
      !formData.inspector
    )
      return;

    if (editandoId !== null) {
      setInspecciones((prev) =>
        prev.map((i) =>
          i.id === editandoId ? { ...(formData as Inspeccion), id: editandoId } : i
        )
      );
    } else {
      setInspecciones((prev) => [
        ...prev,
        { ...(formData as Inspeccion), id: Date.now() },
      ]);
    }

    setFormData({});
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  const handleEditar = (inspeccion: Inspeccion) => {
    setFormData(inspeccion);
    setEditandoId(inspeccion.id);
    setMostrarFormulario(true);
  };

  const handleEliminar = (id: number) => {
    setInspecciones((prev) => prev.filter((i) => i.id !== id));
  };

  const handleCancelar = () => {
    setFormData({});
    setEditandoId(null);
    setMostrarFormulario(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inspecciones</h1>
        <button
          onClick={() => {
            setFormData({});
            setEditandoId(null);
            setMostrarFormulario(true);
          }}
          className="bg-[#0b1f5b] text-white px-4 py-2 rounded hover:bg-[#132a85] transition"
        >
          + Nueva Inspección
        </button>
      </div>

      {mostrarFormulario && (
        <div className="mb-6 border rounded-lg p-4 shadow relative bg-white">
          <button
            onClick={handleCancelar}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            <FiX size={20} />
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" value={formData.codigo || ''} onChange={(e) => setFormData({ ...formData, codigo: e.target.value })} placeholder="Patente - Código - Faena" className="border p-2 rounded" />
            <input type="text" value={formData.tipo || ''} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} placeholder="Tipo de inspección" className="border p-2 rounded" />
            <input type="date" value={formData.fecha || ''} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} className="border p-2 rounded" />
            <input type="text" value={formData.inspector || ''} onChange={(e) => setFormData({ ...formData, inspector: e.target.value })} placeholder="Inspector" className="border p-2 rounded" />
            <input type="text" value={formData.area || ''} onChange={(e) => setFormData({ ...formData, area: e.target.value })} placeholder="Área" className="border p-2 rounded" />
            <input type="text" value={formData.estado || ''} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} placeholder="Estado" className="border p-2 rounded" />
            <input type="text" value={formData.imagen || ''} onChange={(e) => setFormData({ ...formData, imagen: e.target.value })} placeholder="Nombre imagen (img1.png)" className="border p-2 rounded" />
            <input type="text" value={formData.revision || ''} onChange={(e) => setFormData({ ...formData, revision: e.target.value })} placeholder="Revisión" className="border p-2 rounded" />
            <input type="text" value={formData.centroTrabajo || ''} onChange={(e) => setFormData({ ...formData, centroTrabajo: e.target.value })} placeholder="Centro de Trabajo" className="border p-2 rounded" />
            <textarea value={formData.descripcion || ''} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })} placeholder="Descripción" rows={3} className="border p-2 rounded col-span-full"></textarea>
          </div>
          <div className="text-right mt-4">
            <button
              onClick={handleGuardar}
              className="bg-[#0b1f5b] text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              {["ID", "Código", "Tipo", "Fecha", "Inspector", "Área", "Estado", "Imagen", "Descripción", "Revisión", "Centro Trabajo", "Acciones"].map((h) => (
                <th key={h} className="px-4 py-2 text-left font-semibold text-gray-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {inspecciones.map((i) => (
              <tr key={i.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{i.id}</td>
                <td className="px-4 py-2">{i.codigo}</td>
                <td className="px-4 py-2">{i.tipo}</td>
                <td className="px-4 py-2">{i.fecha}</td>
                <td className="px-4 py-2">{i.inspector}</td>
                <td className="px-4 py-2">{i.area}</td>
                <td className="px-4 py-2">{i.estado}</td>
                <td className="px-4 py-2">{i.imagen}</td>
                <td className="px-4 py-2">{i.descripcion}</td>
                <td className="px-4 py-2">{i.revision}</td>
                <td className="px-4 py-2">{i.centroTrabajo}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditar(i)} className="text-blue-600 hover:text-blue-800"><MdEdit /></button>
                    <button onClick={() => handleEliminar(i.id)} className="text-red-600 hover:text-red-800"><MdDelete /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
