import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Componente Card independiente
const Card = ({ 
  title,
  description, 
  image, 
  className = ""
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${className}`}>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

// Componente Cards Section
const CardsSection = () => {
  const cards = [
    {
      id: 1,
      title: "Ventas Mensuales",
      description: "Resumen de ventas del mes actual con tendencias positivas",
      image: "https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Ventas"
    },
    {
      id: 2,
      title: "Usuarios Activos",
      description: "Estadísticas de usuarios activos en la plataforma",
      image: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Usuarios"
    },
    {
      id: 3,
      title: "Productos",
      description: "Catálogo de productos más vendidos este mes",
      image: "https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Productos"
    },
    {
      id: 4,
      title: "Reportes",
      description: "Análisis detallado de métricas y rendimiento",
      image: "https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Reportes"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Métricas Principales</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

// Componente Chart Section
const ChartSection = () => {
  const data = [
    { name: 'Ene', ventas: 4000, usuarios: 2400 },
    { name: 'Feb', ventas: 3000, usuarios: 1398 },
    { name: 'Mar', ventas: 2000, usuarios: 9800 },
    { name: 'Abr', ventas: 2780, usuarios: 3908 },
    { name: 'May', ventas: 1890, usuarios: 4800 },
    { name: 'Jun', ventas: 2390, usuarios: 3800 },
    { name: 'Jul', ventas: 3490, usuarios: 4300 },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Tendencias Anuales</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="usuarios" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Ventas</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Usuarios</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal que une todo
const AnalyticsPanel = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics
          </h1>
          <p className="text-gray-600">
            Vista general de métricas y tendencias de tu negocio
          </p>
        </div>

        {/* Cards Section */}
        <CardsSection />

        {/* Chart Section */}
        <ChartSection />

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Información Adicional</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">12.5k</div>
              <div className="text-gray-600">Total Ventas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">3.2k</div>
              <div className="text-gray-600">Usuarios Nuevos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">89%</div>
              <div className="text-gray-600">Satisfacción</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;