import React, { useState } from 'react';
import { Heart, Star, ChevronLeft, ChevronRight, Check, Sparkles, MapPin, BadgePercent } from 'lucide-react';
import { Hotel } from '../types';

interface HotelCardProps {
  key?: string;
  hotel: Hotel;
  currency: 'USD' | 'CHF' | 'EUR';
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBook: (hotel: Hotel) => void;
}

export default function HotelCard({
  hotel,
  currency,
  isFavorite,
  onToggleFavorite,
  onBook
}: HotelCardProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

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

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === hotel.images.length - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIdx((prev) => (prev === 0 ? hotel.images.length - 1 : prev - 1));
  };

  return (
    <div
      id={`hotel-card-${hotel.id}`}
      className="bg-white border border-[#e7e7e7] rounded-lg overflow-hidden flex flex-col md:flex-row shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-lg transition-all duration-300 group"
    >
      {/* Visual Image Section (Left / Top) with Carousel */}
      <div className="relative w-full md:w-[280px] lg:w-[320px] h-[210px] md:h-auto min-h-[220px] overflow-hidden shrink-0">
        <img
          src={hotel.images[activeImageIdx]}
          alt={hotel.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
        />

        {/* Shading Vignette Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

        {/* Star Badges and Deal Badges if highly rated */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {hotel.rating >= 9.3 && (
            <span className="bg-emerald-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <Sparkles size={11} className="animate-spin text-yellow-300" />
              <span>Boutique Best Seller</span>
            </span>
          )}
          {hotel.id === 'sorell-boutique' && (
            <span className="bg-indigo-600 text-white font-semibold text-[10px] px-2 py-0.5 rounded flex items-center gap-1 shadow-sm uppercase tracking-wider">
              <BadgePercent size={11} />
              <span>Great Value Deals</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Trigger */}
        <button
          onClick={() => onToggleFavorite(hotel.id)}
          className="absolute top-2.5 right-2.5 bg-white/90 hover:bg-white text-[#1a1a1a] hover:text-rose-600 p-2 rounded-full cursor-pointer shadow-md transform hover:scale-110 active:scale-95 transition z-10"
        >
          <Heart
            size={16}
            className={`${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-gray-500'} transition-colors duration-200`}
          />
        </button>

        {/* Carousel Navigation Chevrons inside */}
        {hotel.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1a1a1a] hover:bg-gray-50 transition cursor-pointer z-15"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-100 shadow-[0_4px_10px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#1a1a1a] hover:bg-gray-50 transition cursor-pointer z-15"
              aria-label="Next image"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </>
        )}

        {/* Carousel Pagination Dots Indicator */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1 z-10 bg-black/30 px-2 py-0.5 rounded-full">
          {hotel.images.map((_, idx) => (
            <span
              key={idx}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                idx === activeImageIdx ? 'bg-white w-3' : 'bg-white/55'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Hotel Description Details Area (Center & Right) */}
      <div className="flex-1 p-[16px] flex flex-col justify-between">
        <div className="flex flex-col gap-[6px]">
          {/* Header Row: Title and Rating Badge */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1 text-xs text-booking-muted mb-0.5">
                <MapPin size={12} className="text-booking-blue" />
                <span>{hotel.location}</span>
                <span className="text-gray-300">•</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] text-zinc-600 font-semibold uppercase">
                  {hotel.stars}-star hotel
                </span>
              </div>
              <h3 className="text-[18px] md:text-[20px] font-bold text-booking-text leading-tight group-hover:text-booking-blue transition">
                {hotel.name}
              </h3>
            </div>

            {/* Custom Rating box: exact matching radius "4px 4px 4px 0px" */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-sm text-booking-text">{hotel.ratingLabel}</p>
                <p className="text-xs text-booking-muted">{hotel.reviewsCount.toLocaleString()} reviews</p>
              </div>
              <div
                className="bg-[#003580] text-white font-extrabold text-[15px] w-[42px] h-[40px] flex items-center justify-center shadow-sm select-none shrink-0"
                style={{ borderRadius: '4px 4px 4px 0px' }}
              >
                {hotel.rating.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Stars indicators */}
          <div className="flex items-center gap-0.5">
            {Array.from({ length: hotel.stars }).map((_, i) => (
              <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Description Block */}
          <div className="text-[14px] text-[#595959] mt-2 font-normal leading-relaxed relative">
            <span className="transition duration-300">
              {isDescExpanded ? hotel.longDescription : hotel.description}
            </span>
            <button
              onClick={() => setIsDescExpanded(!isDescExpanded)}
              className="text-booking-blue font-semibold hover:underline block mt-1 hover:text-blue-700 text-xs transition cursor-pointer inline-flex items-center gap-1"
            >
              <span>{isDescExpanded ? 'Show less' : 'Show more'}</span>
            </button>
          </div>

          {/* Core Amenities highlighted below description */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-[#e7e7e7]">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="bg-[#f2f8ff] text-booking-blue font-medium text-[11px] px-2 py-1 rounded inline-flex items-center gap-1 border border-blue-50/50"
              >
                <Check size={11} className="text-emerald-500" strokeWidth={3} />
                <span>{amenity}</span>
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-[10px] text-booking-muted self-center ml-1">
                +{hotel.amenities.length - 4} more standard perks
              </span>
            )}
          </div>
        </div>

        {/* Pricing Actions Row */}
        <div className="flex items-end justify-between gap-4 mt-4 pt-3 border-t border-[#e7e7e7]">
          <div className="flex flex-col text-left">
            <div className="bg-emerald-50 text-emerald-700 font-semibold text-[10px] px-1.5 py-0.5 rounded w-fit mb-1 border border-emerald-100">
              Free Cancellation available
            </div>
            <p className="text-xs text-booking-muted leading-none">Price for 1 night</p>
            <p className="text-2xl font-black text-booking-text leading-tight mt-1">
              {getConvertedPriceStr(hotel.basePrice)}
            </p>
            <p className="text-[10px] text-booking-muted">Includes local Swiss VAT & levies</p>
          </div>

          <button
            onClick={() => onBook(hotel)}
            className="bg-booking-blue hover:bg-[#0052ad] text-white font-bold text-sm px-5 py-2.5 rounded transition duration-200 shadow-sm active:scale-95 cursor-pointer flex items-center gap-1.5 select-none hover:shadow-md"
            style={{ borderRadius: '4px' }}
          >
            <span>See availability</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
