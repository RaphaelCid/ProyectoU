"use client";
import ChartSection from './presentation/components/chart';
import CardsSection from './presentation/components/card'
import StatsSection from './presentation/components/stat'

export default function Home() {
  return (
    <div>
      <div>
        <h1 className="text-center mb-5">¡Bienvenido, {}!</h1>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Analytics
          </h1>
          <p className="text-gray-600">
            Vista integral de métricas y tendencias de tu negocio
          </p>
        </div>
        <CardsSection />
        <ChartSection />
        <StatsSection />
      </div>
    </div>
      </div>
    </div>
  )
}
