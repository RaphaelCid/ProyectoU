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
}
export default CardsSection;