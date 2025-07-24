'use client';
import { useState } from 'react';
import NuevaInspeccionModal from '../components/nuevainspeccionmodal';
import { MdEdit, MdDelete } from "react-icons/md";

export default function InspeccionPage() {
  const [modalAbierto, setModalAbierto] = useState(false);

  const inspeccionesEjemplo = [
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inspecciones</h1>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-[#0b1f5b] text-white px-4 py-2 rounded hover:bg-[#132a85] transition"
        >
          + Nueva Inspección
        </button>
      </div>

      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-center">ID</th>
              <th className="px-4 py-2 text-center">Patente-Código-Faena</th>
              <th className="px-4 py-2 text-center">Tipo de Inspección</th>
              <th className="px-4 py-2 text-center">Fecha</th>
              <th className="px-4 py-2 text-center">Inspector</th>
              <th className="px-4 py-2 text-center">Área</th>
              <th className="px-4 py-2 text-center">Estado</th>
              <th className="px-4 py-2 text-center">Imagen Adjunta</th>
              <th className="px-4 py-2 text-center">Descripción</th>
              <th className="px-4 py-2 text-center">Revisión</th>
              <th className="px-4 py-2 text-center">Centro de Trabajo</th>
              <th className="px-4 py-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {inspeccionesEjemplo.map((insp) => (
              <tr key={insp.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{insp.id}</td>
                <td className="px-4 py-2">{insp.codigo}</td>
                <td className="px-4 py-2">{insp.tipo}</td>
                <td className="px-4 py-2">{insp.fecha}</td>
                <td className="px-4 py-2">{insp.inspector}</td>
                <td className="px-4 py-2">{insp.area}</td>
                <td className="px-4 py-2">{insp.estado}</td>
                <td className="px-4 py-2">{insp.imagen}</td>
                <td className="px-4 py-2">{insp.descripcion}</td>
                <td className="px-4 py-2">{insp.revision}</td>
                <td className="px-4 py-2">{insp.centroTrabajo}</td>
                 {/* Botones de acción */}
                <td className="px-4 py-2">
                  <div className="flex justify-center items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" title="Editar">
                      <MdEdit className="w-5 h-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-800" title="Eliminar">
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NuevaInspeccionModal isOpen={modalAbierto} onClose={() => setModalAbierto(false)} />
    </div>
  );
}
