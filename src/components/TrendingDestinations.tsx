import React, { useRef } from 'react';

interface Destination {
  id: string;
  title: string;
  cityOnly: string;
  country: string;
  avgPriceUSD: number;
  image: string;
}

const TRENDING_DESTINATIONS: Destination[] = [
  {
    id: 'sydney',
    title: 'Sydney, Australia',
    cityOnly: 'Sydney',
    country: 'Australia',
    avgPriceUSD: 240,
    image: '/assets/images/park_hyatt_sydney_1781023936388.png'
  },
  {
    id: 'barcelona',
    title: 'Barcelona, Spain',
    cityOnly: 'Barcelona',
    country: 'Spain',
    avgPriceUSD: 200,
    image: '/assets/images/w_barcelona_1781023902244.png'
  },
  {
    id: 'melbourne',
    title: 'Melbourne, Australia',
    cityOnly: 'Melbourne',
    country: 'Australia',
    avgPriceUSD: 180,
    image: '/assets/images/melbourne_hotel_1781024644113.png'
  },
  {
    id: 'madrid',
    title: 'Madrid, Spain',
    cityOnly: 'Madrid',
    country: 'Spain',
    avgPriceUSD: 122,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80'
  }
];

interface TrendingDestinationsProps {
  currency: 'USD' | 'CHF' | 'EUR';
  onSelectDestination: (cityName: string) => void;
}

export default function TrendingDestinations({
  currency,
  onSelectDestination
}: TrendingDestinationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getConvertedPriceStr = (usdPrice: number) => {
    switch (currency) {
      case 'CHF':
        return `CHF ${(usdPrice * 0.91).toFixed(0)}`;
      case 'EUR':
        return `€ ${(usdPrice * 0.92).toFixed(0)}`;
      case 'USD':
      default:
        return `US$${usdPrice.toFixed(0)}`;
    }
  };

  return (
    <section
      id="trending-destinations-section"
      className="w-full bg-[#fbfbfb] py-12 border-b border-[#e7e7e7]"
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          id="trending-header" 
          className="flex flex-col mb-6 gap-1"
        >
          <h2 
            className="text-[24px] font-bold text-[#1a1a1a] tracking-tight"
          >
            Trending boutique destinations
          </h2>
          <p 
            className="text-[14px] text-booking-muted"
          >
            Explore carefully curated cities across Spain and Australia popular with travelers this season
          </p>
        </div>

        {/* Grid / Carousel Area */}
        <div className="relative">
          
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto scrollbar-none scroll-smooth py-1"
          >
            {TRENDING_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.cityOnly)}
                className="flex flex-col text-left cursor-pointer group bg-white border border-[#e7e7e7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 p-3"
                style={{ gap: '8px' }}
              >
                {/* Image wrapper */}
                <div 
                  className="overflow-hidden bg-slate-100 shrink-0 relative"
                  style={{ 
                    aspectRatio: '16 / 10', 
                    borderRadius: '8px' 
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-booking-navy/80 backdrop-blur-xs text-[10px] text-white font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {dest.country}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-0.5 px-1 py-1">
                  <span 
                    className="text-base font-bold text-booking-navy group-hover:text-booking-blue transition-colors duration-200"
                  >
                    {dest.title}
                  </span>

                  <div className="flex items-baseline gap-1 mt-1 justify-between border-t border-gray-50 pt-1">
                    <span 
                      className="text-[11px] text-booking-muted uppercase tracking-wider font-semibold"
                    >
                      Boutique rate
                    </span>
                    <span 
                      className="text-[13px] text-booking-blue font-extrabold"
                    >
                      {getConvertedPriceStr(dest.avgPriceUSD)}/nt
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
