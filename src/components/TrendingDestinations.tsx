import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';

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
    id: 'paris',
    title: 'Paris, France',
    cityOnly: 'Paris',
    country: 'France',
    avgPriceUSD: 169,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'barcelona',
    title: 'Barcelona, Spain',
    cityOnly: 'Barcelona',
    country: 'Spain',
    avgPriceUSD: 200,
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efedd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'madrid',
    title: 'Madrid, Spain',
    cityOnly: 'Madrid',
    country: 'Spain',
    avgPriceUSD: 122,
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'istanbul',
    title: 'Istanbul, Turkey',
    cityOnly: 'Istanbul',
    country: 'Turkey',
    avgPriceUSD: 69,
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80'
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

  const handleScrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = 300;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="trending-destinations-section"
      className="w-full bg-white py-8 border-b border-[#e7e7e7]"
      style={{
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div 
          id="trending-header" 
          className="flex flex-col mb-6"
          style={{ gap: '4px' }}
        >
          <h2 
            className="text-[24px] font-bold text-[#000000] tracking-tight"
            style={{ fontWeight: 700 }}
          >
            Trending hotel destinations
          </h2>
          <p 
            className="text-[16px] text-[#595959]"
            style={{ fontWeight: 400 }}
          >
            Explore destinations currently popular with other travelers
          </p>
        </div>

        {/* Grid / Carousel Area */}
        <div className="relative">
          
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-none scroll-smooth py-1"
            style={{ gap: '16px' }}
          >
            {TRENDING_DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                onClick={() => onSelectDestination(dest.cityOnly)}
                className="flex flex-col text-left cursor-pointer group transition-all"
                style={{ gap: '4px' }}
              >
                {/* Image wrapper */}
                <div 
                  className="overflow-hidden bg-slate-100 shrink-0"
                  style={{ 
                    aspectRatio: '16 / 10', 
                    borderRadius: '8px' 
                  }}
                >
                  <img
                    src={dest.image}
                    alt={dest.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <span 
                  className="text-[16px] text-[#000000]"
                  style={{ fontWeight: 700 }}
                >
                  {dest.title}
                </span>

                <div className="flex flex-wrap items-baseline gap-1">
                  <span 
                    className="text-[14px] text-[#595959]"
                    style={{ fontWeight: 400 }}
                  >
                    Avg. price per night for a 3-star hotel:
                  </span>
                  <span 
                    className="text-[14px] text-[#595959]"
                    style={{ fontWeight: 400 }}
                  >
                    {getConvertedPriceStr(dest.avgPriceUSD)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Next Arrow */}
          <button
            onClick={handleScrollRight}
            className="hidden lg:flex absolute -right-[20px] top-[calc(50%-20px)] w-[40px] h-[40px] rounded-full bg-white border border-[#E0E0E0] shadow-[0px_2px_8px_rgba(0,0,0,0.15)] items-center justify-center text-[#000000] hover:bg-slate-50 transition cursor-pointer z-10"
            title="Next destinations"
            aria-label="Next destinations"
          >
            <ChevronRight size={20} className="text-[#000000]" />
          </button>

        </div>

      </div>
    </section>
  );
}
