import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Trash2, ShieldAlert, X, ChevronRight, MessageSquare, Heart, RefreshCw, Printer } from 'lucide-react';
import { Booking } from '../types';
import { formatDate } from '../utils';

interface MyBookingsViewProps {
  bookings: Booking[];
  currency: 'USD' | 'CHF' | 'EUR';
  onClose: () => void;
  onCancelBooking: (id: string) => void;
}

export default function MyBookingsView({
  bookings,
  currency,
  onClose,
  onCancelBooking
}: MyBookingsViewProps) {
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);

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

  const bookingToCancel = bookings.find((b) => b.id === cancelConfirmId);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-end z-[100] p-0">
      {/* Backdrop closer */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      <div className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left text-booking-text overflow-hidden">
        
        {/* Animated cancellation confirmation overlay */}
        <AnimatePresence>
          {cancelConfirmId && bookingToCancel && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute inset-0 bg-[#003580]/98 backdrop-blur-md flex flex-col justify-center items-center p-6 text-center text-white z-50"
            >
              <div className="bg-white/15 rounded-full p-4 mb-4 text-[#ffb700] ring-4 ring-[#ffb700]/30 animate-pulse">
                <ShieldAlert size={36} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2 font-display">Cancel Stay Reservation?</h4>
              <p className="text-xs text-blue-100 leading-relaxed max-w-xs mb-6">
                Are you sure you want to cancel your high-end stay at:
                <br />
                <span className="font-extrabold text-[#ffb700] text-sm block mt-1.5 mb-1.5">
                  {bookingToCancel.hotelName}
                </span>
                This premium boutique suite option was locked in at an exclusive rate. Action is irreversible.
              </p>

              <div className="w-full space-y-3 max-w-xs">
                <button
                  onClick={() => {
                    onCancelBooking(bookingToCancel.id);
                    setCancelConfirmId(null);
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded transition duration-200 uppercase tracking-widest shadow-md cursor-pointer select-none"
                >
                  Confirm Cancellation
                </button>
                <button
                  onClick={() => setCancelConfirmId(null)}
                  className="w-full py-3 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded transition duration-200 uppercase tracking-widest cursor-pointer select-none"
                >
                  Keep Reservation
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header toolbar */}
        <div className="p-5 bg-booking-navy text-white flex items-center justify-between shadow-sm">
          <div>
            <h3 className="font-display font-bold text-lg flex items-center gap-2">
              <Calendar size={18} className="text-yellow-400" />
              <span>Your Stay Reservations</span>
            </h3>
            <p className="text-[10px] text-blue-200 uppercase tracking-widest mt-0.5">Bare-harmony Secure Portal</p>
          </div>
          <button
            onClick={onClose}
            className="text-blue-100 hover:text-white p-1.5 hover:bg-white/10 rounded-full transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-[#e7e7e7] rounded-xl overflow-hidden hover:shadow-md transition-all bg-white relative group"
              >
                {/* Stay thumbnail */}
                <div className="h-24 w-full relative">
                  <img
                    src={booking.hotelImage}
                    alt={booking.hotelName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <p className="text-white font-bold text-sm leading-tight line-clamp-1">{booking.hotelName}</p>
                  </div>
                  <div className="absolute top-2.5 right-2 bg-emerald-600 text-white font-black text-[9px] px-2 py-0.5 rounded shadow-sm">
                    ✓ SECURED
                  </div>
                </div>

                {/* Reservation detailed blocks */}
                <div className="p-4 space-y-3 text-xs leading-normal">
                  <div className="flex justify-between font-mono text-[10px] text-booking-muted uppercase">
                    <span>Reference Code:</span>
                    <span className="font-bold text-booking-blue">{booking.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-500">Check-In</span>
                      <span className="font-semibold text-gray-800">{formatDate(booking.checkIn)}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-gray-500">Check-Out</span>
                      <span className="font-semibold text-gray-800">{formatDate(booking.checkOut)}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-booking-muted">
                    <div className="flex justify-between">
                      <span>Room Choice:</span>
                      <span className="font-bold text-[#1a1a1a]">{booking.roomType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Traveler:</span>
                      <span className="font-semibold text-gray-800">{booking.guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rooms & Guests:</span>
                      <span className="font-medium text-gray-800">
                        {booking.rooms} flat(s) for {booking.adults} adult{booking.adults > 1 && 's'}
                      </span>
                    </div>
                  </div>

                  {/* Payment overview */}
                  <div className="pt-2 border-t flex justify-between items-center text-sm font-black text-booking-navy">
                    <span>Amount Paid:</span>
                    <span className="text-booking-blue text-base">
                      {getConvertedPriceStr(booking.totalPrice)}
                    </span>
                  </div>
                </div>

                {/* Footer panel cancellation triggers */}
                <div className="px-4 py-2.5 bg-slate-100 border-t flex justify-between items-center">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 text-booking-muted hover:text-[#1a1a1a] transition text-[11px] font-bold cursor-pointer"
                  >
                    <Printer size={13} />
                    <span>Voucher Receipt</span>
                  </button>

                  <button
                    onClick={() => setCancelConfirmId(booking.id)}
                    className="flex items-center gap-1 bg-white hover:bg-rose-50 text-rose-600 hover:text-rose-700 font-bold text-[11px] border border-rose-100 hover:border-rose-200 px-3 py-1.5 rounded transition cursor-pointer shadow-2xs"
                  >
                    <Trash2 size={13} />
                    <span>Cancel Booking</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 px-6">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-[#595959]">
                <RefreshCw size={28} className="animate-spin text-booking-blue" />
              </div>
              <h4 className="font-bold text-base text-booking-navy">No active bookings yet</h4>
              <p className="text-xs text-booking-muted mt-2 max-w-xs mx-auto leading-relaxed">
                Unlock Swiss elegance. Use the search block to filter luxury Swiss boutique hotels, input reservation schedules and secure your room to enjoy direct premium lounge access cards.
              </p>
            </div>
          )}
        </div>

        {/* Action terms footer */}
        <div className="p-5 border-t bg-slate-50 text-xs text-booking-muted text-center space-y-2">
          <p className="leading-relaxed">All check-in processing utilizes our <b>Bare-harmony Smart Cards</b>. Show code at recepion gates.</p>
          <div className="flex justify-center gap-3 font-semibold text-booking-blue">
            <a href="#" className="hover:underline">Swiss Stay Terms</a>
            <span>•</span>
            <a href="#" className="hover:underline">Privacy Rules</a>
          </div>
        </div>
      </div>
    </div>
  );
}
