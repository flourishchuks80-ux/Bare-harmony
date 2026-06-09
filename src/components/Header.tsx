import { Sparkles, Briefcase, HelpCircle, Heart } from 'lucide-react';
import { Booking } from '../types';

interface HeaderProps {
  currentCurrency: 'USD' | 'CHF' | 'EUR';
  setCurrency: (currency: 'USD' | 'CHF' | 'EUR') => void;
  savedBookingsCount: number;
  onOpenBookings: () => void;
  onOpenFavorites: () => void;
  favoritesCount: number;
}

export default function Header({
  currentCurrency,
  setCurrency,
  savedBookingsCount,
  onOpenBookings,
  onOpenFavorites,
  favoritesCount
}: HeaderProps) {
  return (
    <header className="bg-[#003580] text-white w-full sticky top-0 z-50 shadow-md">
      {/* Top Banner Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-14 flex items-center justify-between border-b border-blue-900/60 text-xs text-blue-100">
        <div className="flex items-center gap-4">
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <label className="text-blue-200">Currency:</label>
            <select
              value={currentCurrency}
              onChange={(e) => setCurrency(e.target.value as any)}
              className="bg-blue-950/80 border border-blue-800 text-white font-semibold rounded px-1.5 py-0.5 focus:outline-none focus:border-yellow-400 cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="CHF">CHF (Fr.)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>
          <a href="#" className="hover:text-white transition flex items-center gap-1">
            <HelpCircle size={14} />
            <span>Support</span>
          </a>
          <span className="text-blue-800">|</span>
          <span className="flex items-center gap-1 text-yellow-300 font-medium">
            <Sparkles size={13} />
            <span>Bare-harmony Club</span>
          </span>
        </div>
      </div>

      {/* Main Header Brand Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5 focus:outline-none">
              <span className="font-display font-black text-2xl tracking-tight text-white flex items-center gap-1">
                <span className="text-[#ffb700] font-light">Bare</span>
              </span>
              <span className="bg-[#ffb700] text-[#003580] font-black text-[10px] px-1 rounded uppercase tracking-wider">
                Harmony
              </span>
            </div>
            <p className="text-[10px] text-blue-200 font-mono tracking-wider">Swiss Boutique & Luxury Resorts</p>
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist Button */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-2 hover:bg-white/10 px-3.5 py-2 rounded-md transition duration-200 text-sm font-medium"
            title="Saved favorites"
          >
            <Heart size={18} className={favoritesCount > 0 ? "fill-rose-500 text-rose-500" : "text-white"} />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#003580]">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Bookings Tracker Button */}
          <button
            onClick={onOpenBookings}
            className="relative flex items-center gap-2 hover:bg-white/10 px-3.5 py-2 rounded-md transition duration-200 text-sm font-medium border border-blue-200/20 bg-blue-900/30"
          >
            <Briefcase size={18} className="text-yellow-400" />
            <span className="hidden sm:inline">My Stays</span>
            {savedBookingsCount > 0 ? (
              <span className="bg-[#ffb700] text-[#003580] font-bold text-xs px-2 py-0.5 rounded-full border-1 border-white shadow-sm flex items-center gap-1">
                {savedBookingsCount} active
              </span>
            ) : (
              <span className="text-blue-300 text-xs hidden sm:inline">None</span>
            )}
            {savedBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </button>

          <span className="text-blue-800 hidden sm:inline">|</span>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 text-sm ml-1 cursor-pointer hover:bg-white/5 py-1.5 px-2.5 rounded-md">
            <div className="w-8 h-8 rounded-full bg-blue-600 border border-blue-400 flex items-center justify-center text-white font-bold text-xs select-none">
              ZH
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold leading-tight">Zürich Guest</span>
              <span className="text-[10px] text-blue-300">Level 2 Level Geniuses</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
