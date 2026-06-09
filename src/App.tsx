import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  SlidersHorizontal,
  ChevronDown,
  Star,
  Check,
  X,
  Compass,
  Sparkles,
  RefreshCw,
  Heart,
  Grid,
  Info,
  HelpCircle
} from 'lucide-react';

import Header from './components/Header';
import HotelCard from './components/HotelCard';
import BookingModal from './components/BookingModal';
import MyBookingsView from './components/MyBookingsView';
import CalendarPicker from './components/CalendarPicker';
import LastMinuteDeals from './components/LastMinuteDeals';
import TrendingDestinations from './components/TrendingDestinations';
import BookingFaq from './components/BookingFaq';
import { GuestsDropdown, DestinationDropdown } from './components/SearchDropdowns';

import { HOTELS, CITIES, ROOM_TYPES } from './data';
import { Hotel, Booking } from './types';
import { formatDate, differenceInDays } from './utils';

export default function App() {
  // Config & State
  const [currency, setCurrency] = useState<'USD' | 'CHF' | 'EUR'>('USD');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [showLastDeals, setShowLastDeals] = useState(true);

  // Search Variables
  const [destination, setDestination] = useState('Zürich');
  const [checkIn, setCheckIn] = useState('2026-06-06');
  const [checkOut, setCheckOut] = useState('2026-06-12');
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);

  // Search Trigger Filtering State
  const [activeSearchCity, setActiveSearchCity] = useState('Zürich');

  // Input Toggles
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showCalPicker, setShowCalPicker] = useState(false);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  // Side/Filter sheets toggles
  const [showStaysDrawer, setShowStaysDrawer] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Active Booking Target
  const [bookingTargetHotel, setBookingTargetHotel] = useState<Hotel | null>(null);

  // Active Filtering States
  const [sortBy, setSortBy] = useState<'recommended' | 'priceAsc' | 'priceDesc' | 'ratingDesc'>('recommended');
  const [filterStars, setFilterStars] = useState<number[]>([]);
  const [filterRatings, setFilterRatings] = useState<number[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Dynamic Gemini-powered Global Search states
  const [globalSearchMode, setGlobalSearchMode] = useState<boolean>(true);
  const [dynamicHotels, setDynamicHotels] = useState<Hotel[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  const hotelsSource = [...HOTELS, ...dynamicHotels];

  // Extract all available amenities across static and generated global data
  const allAmenities = Array.from(new Set(hotelsSource.flatMap((h) => h.amenities))).sort();

  const fetchGlobalHotels = async (cityName: string) => {
    if (!cityName || cityName.trim() === "") return;
    setIsGenerating(true);
    setGenerationError(null);
    try {
      const response = await fetch("/api/hotels/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityName })
      });
      if (!response.ok) {
        throw new Error("Failed to contact the international booking index.");
      }
      const data = await response.json();
      if (data && Array.isArray(data.hotels)) {
        setDynamicHotels(data.hotels);
      } else {
        setDynamicHotels([]);
      }
    } catch (err: any) {
      console.error("Global search index retrieval alert: ", err);
      // In case of error we fall back gracefully (the helper inside server preserves mock results)
      setGenerationError("A network limit delayed global sync. Used local curated listings.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Load from LocalStorage
  useEffect(() => {
    // Favorites
    const savedFavs = localStorage.getItem('bh_favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }

    // Bookings
    const savedBookings = localStorage.getItem('bh_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Pre-seed 1 upcoming booking in Zürich for high fidelity experience
      const seedBooking: Booking = {
        id: 'BH-ZUR74D',
        hotelId: 'sorell-boutique',
        hotelName: 'Sorell Boutique-Hotel St Peter Zürich',
        hotelImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        hotelCity: 'Zürich',
        checkIn: '22026-06-21',
        checkOut: '2026-06-25',
        adults: 2,
        children: 0,
        rooms: 1,
        roomType: 'Deluxe Executive Suite',
        totalPrice: 2388.96,
        guestName: 'Zürich Guest',
        guestEmail: 'flourishchuks80@gmail.com',
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };
      setBookings([seedBooking]);
      localStorage.setItem('bh_bookings', JSON.stringify([seedBooking]));
    }

    // Pre-seed global search for initial Zurich view
    fetchGlobalHotels('Zürich');
  }, []);

  // Write changes to LocalStorage
  const handleToggleFavorite = (hotelId: string) => {
    let nextFavs: string[] = [];
    if (favorites.includes(hotelId)) {
      nextFavs = favorites.filter((id) => id !== hotelId);
    } else {
      nextFavs = [...favorites, hotelId];
    }
    setFavorites(nextFavs);
    localStorage.setItem('bh_favorites', JSON.stringify(nextFavs));
  };

  const handleAddNewBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('bh_bookings', JSON.stringify(updated));
  };

  const handleCancelBooking = (bookingId: string) => {
    const remaining = bookings.filter((b) => b.id !== bookingId);
    setBookings(remaining);
    localStorage.setItem('bh_bookings', JSON.stringify(remaining));
  };

  // Reset all filters easily
  const handleResetFilters = () => {
    setFilterStars([]);
    setFilterRatings([]);
    setMaxPrice(1000);
    setSelectedAmenities([]);
    setSortBy('recommended');
    setShowFavoritesOnly(false);
  };

  const handleTriggerSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Flush the search filter
    setActiveSearchCity(destination);
    setShowCalPicker(false);
    setShowGuestDropdown(false);
    setShowDestDropdown(false);

    if (globalSearchMode) {
      fetchGlobalHotels(destination);
    } else {
      setDynamicHotels([]);
    }

    // Scroll to results cleanly
    const resultsEl = document.getElementById('discover-hotels-block');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectTrendingDestination = (cityName: string) => {
    setDestination(cityName);
    setActiveSearchCity(cityName);
    if (globalSearchMode) {
      fetchGlobalHotels(cityName);
    } else {
      setDynamicHotels([]);
    }
    const resultsEl = document.getElementById('discover-hotels-block');
    if (resultsEl) {
      resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter and Sort logic
  const filteredHotels = hotelsSource.filter((hotel) => {
    // 1. Destination filter (matches city)
    if (activeSearchCity) {
      const matchCity = hotel.city.toLowerCase() === activeSearchCity.toLowerCase();
      if (!matchCity) return false;
    }

    // 2. Favorites toggle
    if (showFavoritesOnly && !favorites.includes(hotel.id)) {
      return false;
    }

    // 3. Stars Filter
    if (filterStars.length > 0 && !filterStars.includes(hotel.stars)) {
      return false;
    }

    // 4. Guest rating filter (Wonderful 9.0+, Excellent 9.5+)
    if (filterRatings.length > 0) {
      const matchesRatingFilter = filterRatings.some((threshold) => hotel.rating >= threshold);
      if (!matchesRatingFilter) return false;
    }

    // 5. Price filter
    if (hotel.basePrice > maxPrice) {
      return false;
    }

    // 6. Amenities checklists
    if (selectedAmenities.length > 0) {
      const hasAllChecked = selectedAmenities.every((amenity) =>
        hotel.amenities.includes(amenity)
      );
      if (!hasAllChecked) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'priceAsc') return a.basePrice - b.basePrice;
    if (sortBy === 'priceDesc') return b.basePrice - a.basePrice;
    if (sortBy === 'ratingDesc') return b.rating - a.rating;
    
    // 'recommended' - default sorell boutique first
    if (a.id === 'sorell-boutique') return -1;
    if (b.id === 'sorell-boutique') return 1;
    return b.rating - a.rating;
  });

  return (
    <div id="booking-app-container" className="min-h-screen bg-[#fbfbfb] text-booking-text flex flex-col font-sans select-none antialiased">
      
      {/* Header controls */}
      <Header
        currentCurrency={currency}
        setCurrency={setCurrency}
        savedBookingsCount={bookings.length}
        onOpenBookings={() => setShowStaysDrawer(true)}
        onOpenFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
        favoritesCount={favorites.length}
      />

      {/* Hero Banner Section (Booking Overlay with dark_blue) */}
      <section
        id="hero-banner-section"
        className="relative bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center py-16 md:py-24 px-4 shadow-inner"
      >
        {/* Exact Dark Blue translucent overlay matching design token overlay_color: rgba(0, 53, 128, 0.7) */}
        <div className="absolute inset-0 bg-[#003580]/75 mix-blend-multiply pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-white flex flex-col gap-6">
          <div className="max-w-2xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4.5xl font-black tracking-tight leading-tight uppercase font-display"
            >
              Find the perfect hotel on Bare-harmony
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-sm md:text-lg text-blue-100 font-medium tracking-wide mt-2 leading-relaxed"
            >
              From budget hotels to luxury rooms and everything in between
            </motion.p>
          </div>

          {/* Search container - secondary rating booking-yellow `#ffb700` border casing, padding 4px */}
          <form
            onSubmit={handleTriggerSearch}
            className="w-full max-w-5xl bg-[#ffb700] rounded-lg p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.25)] flex flex-col lg:flex-row gap-1 relative text-[#1a1a1a]"
          >
            {/* Input 1: Destination Selector */}
            <div className="flex-1 bg-white hover:bg-slate-50 rounded-md py-2.5 px-4 flex items-center gap-3 relative cursor-pointer border border-transparent hover:border-gray-200 transition">
              <Search className="text-[#595959] shrink-0" size={20} />
              <div className="flex-1 text-left" onClick={() => {
                setShowDestDropdown(!showDestDropdown);
                setShowCalPicker(false);
                setShowGuestDropdown(false);
              }}>
                <label className="block text-[10px] text-[#595959] font-bold uppercase tracking-wider">Where are you going?</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Zürich, Paris..."
                  className="w-full text-sm font-bold text-[#1a1a1a] focus:outline-none bg-transparent"
                />
              </div>
              <AnimatePresence>
                {showDestDropdown && (
                  <DestinationDropdown
                    inputValue={destination}
                    cities={CITIES}
                    onSelect={(city) => setDestination(city)}
                    onClose={() => setShowDestDropdown(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Input 2: Stay check-in check-out dates layout */}
            <div className="flex-1 bg-white hover:bg-slate-50 rounded-md py-2.5 px-4 flex items-center gap-3 relative cursor-pointer border border-transparent hover:border-gray-200 transition">
              <Calendar className="text-[#595959] shrink-0" size={20} />
              <div
                className="flex-1 text-left"
                onClick={() => {
                  setShowCalPicker(!showCalPicker);
                  setShowDestDropdown(false);
                  setShowGuestDropdown(false);
                }}
              >
                <label className="block text-[10px] text-[#595959] font-bold uppercase tracking-wider">Check-in — Check-out dates</label>
                <div className="text-sm font-bold text-booking-text truncate">
                  {checkIn ? formatDate(checkIn) : 'Pick dates'} — {checkOut ? formatDate(checkOut) : 'Pick dates'}
                </div>
              </div>
              <AnimatePresence>
                {showCalPicker && (
                  <CalendarPicker
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onChange={(dates) => {
                      setCheckIn(dates.checkIn);
                      setCheckOut(dates.checkOut);
                    }}
                    onClose={() => setShowCalPicker(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Input 3: Room/Party distribution details dropdown */}
            <div className="flex-1 bg-white hover:bg-slate-50 rounded-md py-2.5 px-4 flex items-center gap-3 relative cursor-pointer border border-transparent hover:border-gray-200 transition">
              <Users className="text-[#595959] shrink-0" size={20} />
              <div
                className="flex-1 text-left flex items-center justify-between"
                onClick={() => {
                  setShowGuestDropdown(!showGuestDropdown);
                  setShowDestDropdown(false);
                  setShowCalPicker(false);
                }}
              >
                <div>
                  <label className="block text-[10px] text-[#595959] font-bold uppercase tracking-wider">Stays configuration</label>
                  <span className="text-sm font-bold text-[#1a1a1a]">
                    {adultsCount} adults • {childrenCount} children • {roomsCount} room
                  </span>
                </div>
                <ChevronDown size={16} className="text-[#595959]" />
              </div>
              <AnimatePresence>
                {showGuestDropdown && (
                  <GuestsDropdown
                    adults={adultsCount}
                    childrenCount={childrenCount}
                    rooms={roomsCount}
                    onChange={(key, val) => {
                      if (key === 'adults') setAdultsCount(val);
                      if (key === 'childrenCount') setChildrenCount(val);
                      if (key === 'rooms') setRoomsCount(val);
                    }}
                    onClose={() => setShowGuestDropdown(false)}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Action Search button */}
            <button
              type="submit"
              className="bg-[#006ce4] hover:bg-[#0052ad] text-white font-extrabold text-[16px] px-8 py-3.5 rounded transition shadow-md hover:shadow-lg active:scale-95 cursor-pointer shrink-0 uppercase tracking-wider"
              style={{ borderRadius: '4px' }}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* breadcrumbs layer */}
      <div className="bg-white border-b border-[#e7e7e7] py-3 text-xs text-booking-muted">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hover:text-booking-blue hover:underline cursor-pointer" onClick={() => { setActiveSearchCity(''); setDestination(''); }}>Home</span>
            <span className="text-gray-300">&gt;</span>
            <span className="hover:text-booking-blue hover:underline cursor-pointer" onClick={() => { setActiveSearchCity('Zürich'); setDestination('Zürich'); }}>All hotels</span>
            {activeSearchCity && (
              <>
                <span className="text-gray-300">&gt;</span>
                <span className="font-bold text-[#1a1a1a]" id="active-breadcrumb-item">{activeSearchCity} stays</span>
              </>
            )}
          </div>
          {bookings.length > 0 && (
            <div className="hidden sm:flex items-center gap-2 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-100 font-bold font-display scale-95">
              <span>✓ Your private lobby access card is active</span>
            </div>
          )}
        </div>
      </div>

      {/* Last Minute Weekend Deals Section */}
      {showLastDeals && (
        <LastMinuteDeals
          hotels={HOTELS}
          onBook={(h) => setBookingTargetHotel(h)}
          currency={currency}
          onDismiss={() => setShowLastDeals(false)}
          onSeeAllClick={() => {
            setActiveSearchCity('');
            setDestination('');
            const elementsBlock = document.getElementById('discover-hotels-block');
            if (elementsBlock) {
              elementsBlock.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />
      )}

      {/* Trending Destinations Section */}
      <TrendingDestinations
        currency={currency}
        onSelectDestination={handleSelectTrendingDestination}
      />

      {/* Main Container Layout */}
      <main id="discover-hotels-block" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Column 1) */}
        <aside className="lg:col-span-1 space-y-5">
          <div className="bg-white border border-[#e7e7e7] rounded-lg p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-4 border-b pb-3">
              <h3 className="font-bold text-[15px] flex items-center gap-1.5 text-booking-navy">
                <SlidersHorizontal size={15} />
                <span>Filter Stays By:</span>
              </h3>
              {(filterStars.length > 0 || filterRatings.length > 0 || maxPrice < 1000 || selectedAmenities.length > 0 || showFavoritesOnly) && (
                <button
                  onClick={handleResetFilters}
                  className="text-11px text-booking-blue font-bold hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Quick favorites toggle */}
            <div className="mb-5">
              <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider block mb-2">Favorites Portal</label>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`w-full flex items-center justify-between text-xs px-3 py-2 rounded-md border font-semibold transition ${
                  showFavoritesOnly
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-booking-border hover:bg-gray-50 text-booking-muted'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Heart size={14} className={showFavoritesOnly ? 'fill-rose-500 text-rose-500' : ''} />
                  <span>Only Saved ({favorites.length})</span>
                </span>
                <span className="font-bold text-[10px]">Toggle</span>
              </button>
            </div>

            {!showLastDeals && (
              <div className="mb-5 border-t pt-4">
                <label className="text-xs font-bold text-[#1a1a1a] uppercase tracking-wider block mb-2">Weekend Deals</label>
                <button
                  onClick={() => setShowLastDeals(true)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs px-3 py-2.5 rounded-md border border-[#006ce4] hover:bg-blue-50/50 text-[#006ce4] font-bold transition"
                >
                  <Sparkles size={13} className="animate-spin text-amber-500" />
                  <span>Restore Deals Section</span>
                </button>
              </div>
            )}

            {/* filter by price range */}
            <div className="space-y-2 mb-6 border-t pt-4">
              <div className="flex justify-between items-center text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-2">
                <span>Your Budget Limit</span>
                <span className="text-booking-blue lowercase text-[10px]">per night</span>
              </div>
              <input
                type="range"
                min="350"
                max="1000"
                step="25"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-booking-blue cursor-col-resize h-1.5 bg-gray-200 rounded-lg appearance-none"
              />
              <div className="flex justify-between text-xs font-mono font-bold text-gray-700">
                <span>US$350</span>
                <span className="text-booking-blue bg-blue-50 px-2 py-0.5 rounded">Under US${maxPrice}</span>
                <span>US$1000+</span>
              </div>
            </div>

            {/* Star ratings filter */}
            <div className="space-y-2 mb-6 border-t pt-4">
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5">Hotel Star Tier</label>
              <div className="space-y-2 text-xs">
                {[3, 4, 5].map((starCount) => {
                  const isChecked = filterStars.includes(starCount);
                  return (
                    <label key={starCount} className="flex items-center justify-between hover:bg-sky-50/20 p-1 rounded cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setFilterStars(filterStars.filter((s) => s !== starCount));
                            } else {
                              setFilterStars([...filterStars, starCount]);
                            }
                          }}
                          className="h-4 w-4 text-booking-blue border-[#e7e7e7] rounded accent-booking-blue"
                        />
                        <span className="font-semibold text-gray-700 flex items-center gap-0.5">
                          {starCount} Stars
                          {Array.from({ length: starCount }).map((_, idx) => (
                            <Star key={idx} size={11} className="fill-yellow-400 text-yellow-400 inline" />
                          ))}
                        </span>
                      </div>
                      <span className="text-[10px] text-booking-muted font-bold">
                        ({HOTELS.filter((h) => h.stars === starCount).length})
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Guest score threshold ratings */}
            <div className="space-y-2 mb-6 border-t pt-4">
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5">Guest Experience Score</label>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Wonderful (9.0+ score)', val: 9.0 },
                  { label: 'Exceptional (9.4+ score)', val: 9.4 }
                ].map((th) => {
                  const isChecked = filterRatings.includes(th.val);
                  return (
                    <label key={th.val} className="flex items-center justify-between hover:bg-sky-50/20 p-1 rounded cursor-pointer group">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setFilterRatings(filterRatings.filter((r) => r !== th.val));
                            } else {
                              setFilterRatings([...filterRatings, th.val]);
                            }
                          }}
                          className="h-4 w-4 text-booking-blue border-[#e7e7e7] rounded accent-booking-blue"
                        />
                        <span className="font-semibold text-gray-700">{th.label}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Custom Amenities Filter Checklist */}
            <div className="space-y-2 mb-2 border-t pt-4">
              <label className="block text-xs font-bold text-[#1a1a1a] uppercase tracking-wider mb-2.5">Search Perks / Amenities</label>
              <div className="space-y-2 text-xs max-h-56 overflow-y-auto pr-1 no-scrollbar">
                {allAmenities.map((amenity) => {
                  const isChecked = selectedAmenities.includes(amenity);
                  return (
                    <label key={amenity} className="flex items-center gap-2 hover:bg-sky-50/20 p-1 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (isChecked) {
                            setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
                          } else {
                            setSelectedAmenities([...selectedAmenities, amenity]);
                          }
                        }}
                        className="h-4 w-4 text-booking-blue border-[#e7e7e7] rounded accent-booking-blue"
                      />
                      <span className="font-semibold text-gray-700">{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Zurich Travel Guide mini widgets */}
          <div className="bg-[#003580]/5 border border-sky-100 rounded-lg p-5 space-y-3">
            <h4 className="font-bold text-sm text-booking-navy flex items-center gap-2">
              <Compass size={16} className="text-booking-blue" />
              <span>Zürich Boutique Guide</span>
            </h4>
            <p className="text-xs text-booking-muted leading-relaxed">
              Zürich stays are renowned for historic bank conversions (like the spectacular wine library in <b>B2 Hotel</b>) and supreme proximity to pedestrian path networks. Book early to secure complimentary city bike rentals.
            </p>
          </div>
        </aside>

        {/* HOTEL GRID RESULTS LISTING (Column 2-4) */}
        <section className="col-span-1 lg:col-span-3 space-y-5">
          {/* Header Row toolbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-[#e7e7e7] p-4 rounded-lg shadow-sm">
            <div className="text-left w-full sm:w-auto">
              {activeSearchCity ? (
                <>
                  <h2 className="text-lg font-extrabold text-[#1a1a1a] flex items-center gap-2">
                    <span>Verified stays in {activeSearchCity}</span>
                    {globalSearchMode && (
                      <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                        Live search active
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-booking-muted">
                    Found {filteredHotels.length} matching boutique options in our search index
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-extrabold text-[#1a1a1a]">
                    Showing all available holiday resorts
                  </h2>
                  <p className="text-xs text-booking-muted">
                    Discovered {filteredHotels.length} total curated properties
                  </p>
                </>
              )}
            </div>

            {/* Sorting Widget and Clear Filters */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end text-xs">
              <div className="flex items-center gap-1.5">
                <span className="text-[#595959] font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-[#e7e7e7] text-[#1a1a1a] font-bold rounded px-2 py-1.5 focus:outline-none focus:border-booking-blue cursor-pointer"
                >
                  <option value="recommended">Best Match (Recommended)</option>
                  <option value="priceAsc">Price (Lowest first)</option>
                  <option value="priceDesc">Price (Highest first)</option>
                  <option value="ratingDesc">Guest rating (High to Low)</option>
                </select>
              </div>

              {activeSearchCity && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveSearchCity('');
                    setDestination('');
                    setDynamicHotels([]);
                  }}
                  className="bg-sky-50 text-booking-blue hover:bg-booking-blue hover:text-white border border-blue-100 font-bold px-3 py-1.5 rounded transition shadow-2xs"
                  aria-label="See all hotels"
                >
                  See all
                </button>
              )}
            </div>
          </div>

          {/* Active filtered indicators banner if any filter is active */}
          {(filterStars.length > 0 || filterRatings.length > 0 || selectedAmenities.length > 0 || maxPrice < 1000) && (
            <div className="bg-amber-50 text-amber-900 border border-amber-200/50 p-2.5 rounded-lg text-xs flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Info size={14} className="text-amber-600 shrink-0" />
                <span>
                  Using active search filters:
                  {filterStars.length > 0 && ` [Stars: ${filterStars.join(', ')}]`}
                  {filterRatings.length > 0 && ` [Ratings: ${filterRatings.join('+, ')}+]`}
                  {maxPrice < 1000 && ` [Per night < $${maxPrice}]`}
                  {selectedAmenities.length > 0 && ` [Perks: ${selectedAmenities.join(', ')}]`}
                </span>
              </div>
              <button
                onClick={handleResetFilters}
                className="font-bold underline hover:no-underline text-amber-800"
              >
                Reset tags
              </button>
            </div>
          )}

          {/* Dynamic generated status warning if present */}
          {generationError && (
            <div className="bg-sky-50 text-sky-950 border border-sky-100 p-3 rounded-lg text-xs flex items-center gap-1.5">
              <Info size={14} className="text-[#006ce4] shrink-0" />
              <span>{generationError} Search and real-time booking remains operational.</span>
            </div>
          )}

          {/* HOTEL CARDS LIST GRID */}
          <div className="space-y-4">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 bg-white border border-[#e7e7e7] rounded-lg shadow-sm min-h-[380px]">
                <RefreshCw className="animate-spin text-booking-blue" size={36} />
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-base text-[#1a1a1a] tracking-tight">Accessing the Bare-harmony hotel listings database...</h4>
                  <p className="text-xs text-[#595959] max-w-sm mx-auto leading-relaxed">
                    Analyzing real-time rates, mapping amenities and generating high-fidelity suites in <span className="text-[#006ce4] font-bold">{activeSearchCity}</span>. Just a few seconds...
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#003580]/5 px-3 py-1.5 rounded-full border border-sky-100 text-[11.5px] text-booking-blue font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  Gemini smart indexing is live
                </div>
              </div>
            ) : filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  currency={currency}
                  isFavorite={favorites.includes(hotel.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onBook={(h) => {
                    setBookingTargetHotel(h);
                  }}
                />
              ))
            ) : (
              <div className="bg-white border border-[#e7e7e7] rounded-lg p-16 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-booking-muted">
                  <Compass size={28} className="text-amber-500 animate-spin" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-extrabold text-[#1a1a1a] text-lg">No Boutique Resorts Found</h4>
                  <p className="text-xs text-[#595959] max-w-md mx-auto leading-relaxed">
                    We didn't match any hotel listings for "{activeSearchCity}" with your current search parameters. Choose larger price budgets, select other checkable stays amenities or clear search filters.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="bg-booking-blue hover:bg-[#0052ad] text-white text-xs font-bold px-4 py-2 rounded transition cursor-pointer"
                >
                  Reset All Search Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FAQs Section */}
      <BookingFaq />

      {/* FOOTER */}
      <footer className="bg-[#003580] text-gray-300 py-10 mt-16 border-t border-sky-900/40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 space-y-8">
          
          {/* Main layout links grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-left">
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-2">Resorts & Cities</span>
              <a href="#" className="hover:text-white block transition">Boutique Zürich</a>
              <a href="#" className="hover:text-white block transition">Bespoke Geneva</a>
              <a href="#" className="hover:text-white block transition">Heritage Paris</a>
              <a href="#" className="hover:text-white block transition">Imperial Vienna</a>
            </div>
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-2">Bare-harmony Club</span>
              <a href="#" className="hover:text-white block transition">Loyalty Level Rewards</a>
              <a href="#" className="hover:text-white block transition">Write Resort Reviews</a>
              <a href="#" className="hover:text-white block transition">Sustainable Travel Badges</a>
              <a href="#" className="hover:text-white block transition">Swiss Business Lounges</a>
            </div>
            <div className="space-y-2.5">
              <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-2">Customer Care</span>
              <a href="#" className="hover:text-white block transition">Help Center Live Chat</a>
              <a href="#" className="hover:text-white block transition">Cancel Stay Policy</a>
              <a href="#" className="hover:text-white block transition">Voucher Receipts Recovery</a>
              <a href="#" className="hover:text-white block transition">Mobile Scanner App</a>
            </div>
            <div className="space-y-2">
              <span className="font-display font-black text-white text-base tracking-tight block">
                Bare-harmony<span className="text-[#ffb700] font-light">booking</span>
              </span>
              <p className="text-[10px] text-blue-200/70 leading-relaxed mt-1">
                Combining high-tier contemporary boutique comfort with classic Swiss architectural heritage to deliver peaceful, safe experiences.
              </p>
            </div>
          </div>

          {/* Bottom attribution and license footer */}
          <div className="border-t border-blue-900/60 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-blue-200">
            <p>© 2026 Bare-harmony Booking Group S.A. Zürich. All rights reserved.</p>
            <div className="flex gap-4 font-semibold text-blue-100">
              <a href="#" className="hover:underline">Terms of Use</a>
              <a href="#" className="hover:underline">Privacy Policy</a>
              <a href="#" className="hover:underline">VAT Invoices</a>
              <a href="#" className="hover:underline">Geniuses Portal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FULL-SCREEN OVERLAYS (AnimatePresence) */}
      <AnimatePresence>
        {/* Booking & Checkout selection side panel/modal */}
        {bookingTargetHotel && (
          <BookingModal
            hotel={bookingTargetHotel}
            checkIn={checkIn}
            checkOut={checkOut}
            adultsCount={adultsCount}
            childrenCount={childrenCount}
            roomsCount={roomsCount}
            currency={currency}
            onClose={() => setBookingTargetHotel(null)}
            onSaveBooking={handleAddNewBooking}
          />
        )}

        {/* Sidebar right slide drawer list of active booked stays */}
        {showStaysDrawer && (
          <MyBookingsView
            bookings={bookings}
            currency={currency}
            onClose={() => setShowStaysDrawer(false)}
            onCancelBooking={handleCancelBooking}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
