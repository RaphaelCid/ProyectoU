import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Componente Card independiente
const Card = ({ 
  title,
  description, 
  image, 
  className = "",
  value,
  trend
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 ${className}`}>
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        {value && (
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {value}
          </div>
        )}
        {description && (
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        )}
        {trend && (
          <div className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
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
      description: "Resumen de ventas del mes actual",
      value: "$24,500",
      trend: 12.5,
      image: "https://via.placeholder.com/400x200/3B82F6/FFFFFF?text=Ventas"
    },
    {
      id: 2,
      title: "Usuarios Activos",
      description: "Usuarios activos en la plataforma",
      value: "3,247",
      trend: 8.2,
      image: "https://via.placeholder.com/400x200/10B981/FFFFFF?text=Usuarios"
    },
    {
      id: 3,
      title: "Productos",
      description: "Productos más vendidos",
      value: "156",
      trend: -2.1,
      image: "https://via.placeholder.com/400x200/F59E0B/FFFFFF?text=Productos"
    },
    {
      id: 4,
      title: "Conversión",
      description: "Tasa de conversión promedio",
      value: "4.2%",
      trend: 15.3,
      image: "https://via.placeholder.com/400x200/EF4444/FFFFFF?text=Conversión"
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
            value={card.value}
            trend={card.trend}
          />
        ))}
      </div>
    </div>
  );
};

// Componente Chart Section mejorado
const ChartSection = () => {
  const [activeChart, setActiveChart] = useState('line');
  
  const lineData = [
    { name: 'Ene', ventas: 4000, usuarios: 2400, conversiones: 240 },
    { name: 'Feb', ventas: 3000, usuarios: 1398, conversiones: 221 },
    { name: 'Mar', ventas: 2000, usuarios: 9800, conversiones: 229 },
    { name: 'Abr', ventas: 2780, usuarios: 3908, conversiones: 200 },
    { name: 'May', ventas: 1890, usuarios: 4800, conversiones: 218 },
    { name: 'Jun', ventas: 2390, usuarios: 3800, conversiones: 250 },
    { name: 'Jul', ventas: 3490, usuarios: 4300, conversiones: 310 },
  ];

  const barData = [
    { name: 'Móvil', ventas: 4000, porcentaje: 45 },
    { name: 'Desktop', ventas: 3000, porcentaje: 35 },
    { name: 'Tablet', ventas: 2000, porcentaje: 20 },
  ];

  const pieData = [
    { name: 'Directa', value: 400, color: '#3B82F6' },
    { name: 'Redes Sociales', value: 300, color: '#10B981' },
    { name: 'Email', value: 200, color: '#F59E0B' },
    { name: 'Orgánico', value: 100, color: '#EF4444' },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-gray-900 font-medium">{`${label}`}</p>
          {payload.map((pld, index) => (
            <p key={index} style={{ color: pld.color }} className="text-sm">
              {`${pld.dataKey}: ${pld.value.toLocaleString()}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch(activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="ventas" 
                stroke="#3B82F6" 
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="usuarios" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="conversiones" 
                stroke="#F59E0B" 
                strokeWidth={3}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="ventas" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const getLegendData = () => {
    switch(activeChart) {
      case 'line':
        return [
          { color: '#3B82F6', label: 'Ventas' },
          { color: '#10B981', label: 'Usuarios' },
          { color: '#F59E0B', label: 'Conversiones' }
        ];
      case 'bar':
        return [{ color: '#3B82F6', label: 'Ventas por Dispositivo' }];
      case 'pie':
        return pieData.map(item => ({ color: item.color, label: item.name }));
      default:
        return [];
    }
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Análisis de Tendencias</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveChart('line')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === 'line' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Líneas
          </button>
          <button
            onClick={() => setActiveChart('bar')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === 'bar' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Barras
          </button>
          <button
            onClick={() => setActiveChart('pie')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeChart === 'pie' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Circular
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="h-80">
          {renderChart()}
        </div>
        <div className="flex justify-center mt-4 space-x-6">
          {getLegendData().map((item, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-2" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Componente Stats mejorado
const StatsSection = () => {
  const stats = [
    { label: 'Total Ventas', value: '12.5k', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { label: 'Usuarios Nuevos', value: '3.2k', color: 'text-green-600', bgColor: 'bg-green-50' },
    { label: 'Satisfacción', value: '89%', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { label: 'Tasa de Retorno', value: '76%', color: 'text-purple-600', bgColor: 'bg-purple-50' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen Ejecutivo</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className={`text-center p-4 rounded-lg ${stat.bgColor}`}>
            <div className={`text-3xl font-bold mb-2 ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-gray-600 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal mejorado
const AnalyticsPanel = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Analytics
          </h1>
          <p className="text-gray-600">
            Vista integral de métricas y tendencias de tu negocio
          </p>
        </div>

        {/* Cards Section */}
        <CardsSection />

        {/* Chart Section */}
        <ChartSection />

        {/* Stats Section */}
        <StatsSection />
      </div>
    </div>
  );
};

export default AnalyticsPanel;