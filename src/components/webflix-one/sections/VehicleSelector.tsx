import React, { useState } from 'react';
import { Car, Truck, Bike, Zap } from 'lucide-react';

export interface Vehicle {
  id: string;
  name: string;
  image: string;
  icon: string;
  description: string;
  features: string[];
}

export interface VehicleSelectorProps {
  title?: string;
  subtitle?: string;
  vehicles: Vehicle[];
  onVehicleSelect?: (vehicleId: string) => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  'Car': Car,
  'Truck': Truck,
  'Bike': Bike,
  'Zap': Zap
};

export const VehicleSelector: React.FC<VehicleSelectorProps> = ({
  title = "Wählen Sie Ihren Fahrzeugtyp",
  subtitle = "Perfekte Pflege für jedes Fahrzeug",
  vehicles,
  onVehicleSelect
}) => {
  const [selectedVehicle, setSelectedVehicle] = useState<string>('');

  const handleVehicleSelect = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    onVehicleSelect?.(vehicleId);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800/20 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-gray-300 font-montserrat">
              {subtitle}
            </p>
          )}
        </div>

        {/* Vehicle Grid */}
        <div className="w-full overflow-hidden">
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {vehicles.map((vehicle) => {
              const isSelected = selectedVehicle === vehicle.id;
              const IconComponent = iconMap[vehicle.icon] || Car;

              return (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle.id)}
                  className={`relative flex-shrink-0 w-48 h-64 md:w-56 md:h-72 cursor-pointer group transition-all duration-500 hover:scale-105 ${
                    isSelected ? 'scale-105 z-10' : ''
                  }`}
                  style={{
                    transform: `skewX(-8deg) ${isSelected ? 'scale(1.05)' : ''}`,
                    transformOrigin: 'center'
                  }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center rounded-2xl overflow-hidden shadow-xl"
                    style={{ backgroundImage: `url(${vehicle.image})` }}
                  >
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 transition-all duration-500 ${
                      isSelected
                        ? 'bg-gradient-to-t from-gray-900/90 via-gray-800/60 to-transparent'
                        : 'bg-gradient-to-t from-gray-900/80 via-gray-800/40 to-gray-600/20 group-hover:from-gray-900/90'
                    }`}></div>
                  </div>

                  {/* Content */}
                  <div
                    className="relative h-full flex flex-col justify-between p-6 text-white z-10"
                    style={{ transform: 'skewX(8deg)' }}
                  >
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg'
                          : 'bg-white/20 backdrop-blur-sm group-hover:bg-white/30'
                      }`}>
                        <IconComponent className={`w-6 h-6 relative z-10 ${
                          isSelected ? 'text-gray-700' : 'text-white'
                        }`} />
                      </div>
                    </div>

                    {/* Vehicle Name */}
                    <div className="text-center">
                      <h3 className={`font-poppins font-bold text-lg mb-2 transition-all duration-300 ${
                        isSelected
                          ? 'text-white drop-shadow-lg text-xl'
                          : 'text-white/90 group-hover:text-white'
                      }`}>
                        {vehicle.name}
                      </h3>
                      <p className={`font-montserrat text-sm transition-all duration-300 ${
                        isSelected
                          ? 'text-white/90 drop-shadow-md'
                          : 'text-white/70 group-hover:text-white/80'
                      }`}>
                        {vehicle.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      {vehicle.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center justify-center text-xs text-white/60 group-hover:text-white/70 transition-colors duration-300 font-poppins">
                          <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-400 shadow-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-gray-700 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
