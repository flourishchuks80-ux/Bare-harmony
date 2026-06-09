import React, { useRef, useState } from 'react';
import { ChevronRight, X, Sparkles } from 'lucide-react';
import { Hotel } from '../types';

interface LastMinuteDealsProps {
  hotels: Hotel[];
  onBook: (hotel: Hotel) => void;
  currency: 'USD' | 'CHF' | 'EUR';
  onDismiss: () => void;
  onSeeAllClick: () => void;
}

export default function LastMinuteDeals({
  hotels,
  onBook,
  currency,
  onDismiss,
  onSeeAllClick
}: LastMinuteDealsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  // Filtrate exactly the 4 deals hotels featured in the design
  const featuredDealIds = ['sorell-boutique', 'st-josef', 'schweizerhof', 'aparthotel-familie'];
  const dealHotels = featuredDealIds
    .map(id => hotels.find(h => h.id === id))
    .filter((h): h is Hotel => h !== undefined);

  // Convert and format price based on selected currency
  const getConvertedPriceStr = (usdPrice: number) => {
    switch (currency) {
      case 'CHF':
        return `CHF ${(usdPrice * 0.91).toFixed(2)}`;
      case 'EUR':
        return `€ ${(usdPrice * 0.92).toFixed(2)}`;
      case 'USD':
      default:
        return `US$${usdPrice.toFixed(2)}`;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = 300; // width of a card plus gap
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="last-minute-deals-section" 
      className="w-full relative bg-white py-10 border-b border-[#e7e7e7]"
      style={{ fontFamily: 'BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div id="deals-header" className="flex items-center justify-between mb-6">
          <h2 className="text-[24px] font-bold text-[#1a1a1a] tracking-tight">
            Last minute hotels near you this weekend
          </h2>
          <button
            onClick={onSeeAllClick}
            className="border border-[#006ce4] hover:bg-[#006ce4]/5 text-[#006ce4] font-medium text-[14px] px-4 py-2 transition duration-200 select-none cursor-pointer"
            style={{ borderRadius: '4px' }}
          >
            See all
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Dismiss Overlay Control (Centered on the top boundary of the carousel) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss();
            }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-[40px] h-[40px] rounded-full bg-[rgba(0,0,0,0.6)] hover:bg-[#1a1a1a] text-white flex items-center justify-center cursor-pointer transition shadow-[0_4px_10px_rgba(0,0,0,0.15)] z-20"
            title="Dismiss section"
            aria-label="Dismiss section"
          >
            <X size={18} />
          </button>

          {/* Hotel Grid Carousel */}
          <div
            ref={containerRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scrollbar-thin scroll-smooth py-2"
          >
            {dealHotels.map((hotel) => {
              const isExpanded = !!expandedCards[hotel.id];
              return (
                <div
                  key={hotel.id}
                  onClick={() => onBook(hotel)}
                  className="bg-white border border-[#e7e7e7] hover:border-[#006ce4]/30 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group rounded-lg overflow-hidden h-full min-h-[440px]"
                >
                  {/* Card Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {hotel.rating >= 9.3 && (
                      <span className="absolute top-2 left-2 bg-emerald-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm uppercase tracking-wider">
                        <Sparkles size={10} className="text-yellow-300" />
                        <span>Featured Deal</span>
                      </span>
                    )}
                  </div>

                  {/* Card Content Wrapper */}
                  <div className="p-4 flex flex-col flex-1 justify-between gap-2.5 text-left">
                    <div className="space-y-2">
                      
                      {/* Title & Location details */}
                      <div>
                        <h3 className="text-[18px] font-bold text-[#1a1a1a] leading-tight group-hover:text-[#006ce4] transition-all">
                          {hotel.name}
                        </h3>
                        <p className="text-[14px] text-[#595959] mt-0.5 font-normal">
                          {hotel.city}
                        </p>
                      </div>

                      {/* Rating block */}
                      <div className="flex items-center gap-2">
                        <span 
                          className="bg-[#003580] text-white text-[12px] font-bold py-1 px-2 shrink-0 flex items-center justify-center select-none"
                          style={{ borderRadius: '4px 4px 4px 0px' }}
                        >
                          {hotel.rating.toFixed(1)}
                        </span>
                        <div className="flex items-baseline gap-1.5 min-w-0">
                          <span className="text-[12px] font-bold text-[#1a1a1a] truncate">
                            {hotel.ratingLabel}
                          </span>
                          <span className="text-[12px] text-[#595959] shrink-0 font-normal">
                            • {hotel.reviewsCount.toLocaleString()} reviews
                          </span>
                        </div>
                      </div>

                      {/* Description with Expand Link */}
                      <p className="text-[14px] text-[#1a1a1a] leading-relaxed font-normal">
                        <span>
                          {isExpanded ? hotel.longDescription : hotel.description}
                        </span>
                        <span
                          onClick={(e) => toggleExpand(hotel.id, e)}
                          className="text-[#006ce4] hover:text-[#0052ad] font-medium text-[14px] mt-1 pl-1 hover:underline inline transition cursor-pointer"
                        >
                          {isExpanded ? 'Show less' : 'Show more'}
                        </span>
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-1 mt-auto pt-2 border-t border-[#e7e7e7]">
                      <span className="text-[14px] text-[#595959] font-normal">From</span>
                      <strong className="text-[18px] font-bold text-[#1a1a1a]">
                        {getConvertedPriceStr(hotel.basePrice)}
                      </strong>
                      <span className="text-[14px] text-[#595959] font-normal">per night</span>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows: Next Button absolutely positioned on the right */}
          <button
            onClick={handleScrollRight}
            className="hidden lg:flex absolute -right-[20px] top-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full bg-white border border-[#e7e7e7] shadow-[0_4px_10px_rgba(0,0,0,0.1)] items-center justify-center text-[#1a1a1a] hover:bg-slate-50 transition cursor-pointer z-10"
            title="Next hotels"
            aria-label="Next hotels"
          >
            <ChevronRight size={20} className="text-[#1a1a1a]" />
          </button>
        </div>

      </div>
    </section>
  );
}
