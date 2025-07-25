import React from 'react';

// Definimos los props del componente Card
type CardProps = {
  title: string;
  description?: string;
  image?: string;
  className?: string;
  value?: string | number;
  trend?: number;
};

// Componente reutilizable tipo tarjeta
const Card = ({
  title,
  description,
  image,
  className = "",
  value,
  trend
}: CardProps) => {
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
        {trend !== undefined && (
          <div className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );
};

// Componente principal del panel (AnalyticsPanel)
const AnalyticsPanel = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card title="Ventas" value="$10,000" trend={15} />
      <Card title="Usuarios" value="1200" trend={-5} />
      <Card title="Conversiones" value="3.2%" trend={2.1} />
    </div>
  );
};

export default AnalyticsPanel;
