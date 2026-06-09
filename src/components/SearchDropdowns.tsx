import { Users, Minus, Plus, Calendar, Bed, Sparkles, MapPin } from 'lucide-react';

interface GuestsDropdownProps {
  adults: number;
  childrenCount: number;
  rooms: number;
  onChange: (key: 'adults' | 'childrenCount' | 'rooms', value: number) => void;
  onClose: () => void;
}

export function GuestsDropdown({ adults, childrenCount, rooms, onChange, onClose }: GuestsDropdownProps) {
  return (
    <div className="absolute top-[calc(100%+8px)] right-0 w-[280px] bg-white border-2 border-booking-yellow rounded-lg shadow-xl p-4 z-[60] text-booking-text animate-fade-in text-sm">
      <div className="flex items-center justify-between border-b pb-2 mb-3">
        <span className="font-bold text-booking-navy flex items-center gap-1.5">
          <Users size={16} />
          <span>Guests & Rooms</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-booking-blue font-bold text-xs hover:underline cursor-pointer"
        >
          Done
        </button>
      </div>

      <div className="space-y-4">
        {/* Adults control */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">Adults</span>
            <span className="text-xs text-booking-muted">Age 13 or above</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={adults <= 1}
              onClick={() => onChange('adults', adults - 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold disabled:opacity-30 disabled:pointer-events-none"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center font-bold text-gray-800">{adults}</span>
            <button
              type="button"
              onClick={() => onChange('adults', adults + 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Children control */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">Children</span>
            <span className="text-xs text-booking-muted">Age 0 - 12</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={childrenCount <= 0}
              onClick={() => onChange('childrenCount', childrenCount - 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold disabled:opacity-30 disabled:pointer-events-none"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center font-bold text-gray-800">{childrenCount}</span>
            <button
              type="button"
              onClick={() => onChange('childrenCount', childrenCount + 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        {/* Rooms control */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-bold text-gray-800">Rooms</span>
            <span className="text-xs text-booking-muted">Total suites needed</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={rooms <= 1}
              onClick={() => onChange('rooms', rooms - 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold disabled:opacity-30 disabled:pointer-events-none"
            >
              <Minus size={14} />
            </button>
            <span className="w-5 text-center font-bold text-gray-800">{rooms}</span>
            <button
              type="button"
              onClick={() => onChange('rooms', rooms + 1)}
              className="w-8 h-8 rounded-full border flex items-center justify-center text-booking-blue border-booking-blue hover:bg-emerald-50 transition font-bold"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface DestinationDropdownProps {
  inputValue: string;
  cities: string[];
  onSelect: (city: string) => void;
  onClose: () => void;
}

export function DestinationDropdown({ inputValue, cities, onSelect, onClose }: DestinationDropdownProps) {
  const filtered = cities.filter((city) =>
    city.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border-2 border-booking-yellow rounded-lg shadow-xl py-2 z-[60] text-booking-text animate-fade-in text-sm">
      <div className="px-3 py-1.5 text-xs font-bold text-booking-muted uppercase border-b mb-1">
        Popular Stay Locations
      </div>
      {filtered.length > 0 ? (
        filtered.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => {
              onSelect(city);
              onClose();
            }}
            className="w-full text-left px-3 py-2 hover:bg-emerald-50/80 flex items-center gap-2.5 transition"
          >
            <MapPin size={16} className="text-booking-blue shrink-0" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{city}</span>
              <span className="text-[10px] text-booking-muted">Switzerland & Major Europe Cities</span>
            </div>
          </button>
        ))
      ) : (
        <div className="px-3 py-3 text-xs text-booking-muted text-center">
          No matches found. Try Zürich, Paris or London.
        </div>
      )}
    </div>
  );
}
