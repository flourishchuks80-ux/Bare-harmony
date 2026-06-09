import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, ShieldAlert, CheckCircle, CreditCard, Award, Hotel as HotelIcon, Check, ArrowRight } from 'lucide-react';
import { Hotel, Booking } from '../types';
import { ROOM_TYPES } from '../data';
import { differenceInDays, generateBookingId, formatDate } from '../utils';

interface BookingModalProps {
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  adultsCount: number;
  childrenCount: number;
  roomsCount: number;
  currency: 'USD' | 'CHF' | 'EUR';
  onClose: () => void;
  onSaveBooking: (booking: Booking) => void;
}

export default function BookingModal({
  hotel,
  checkIn,
  checkOut,
  adultsCount,
  childrenCount,
  roomsCount,
  currency,
  onClose,
  onSaveBooking
}: BookingModalProps) {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Payment card info mockup
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  // Math variables
  const nights = differenceInDays(checkIn, checkOut);
  const roomBasePrice = hotel.basePrice + ROOM_TYPES[selectedRoomIndex].addon;
  const rawSubtotal = roomBasePrice * nights * roomsCount;
  const swissVAT = rawSubtotal * 0.081; // 8.1% Swiss VAT 
  const resortFee = 4.20 * nights * (adultsCount + childrenCount);
  const grandTotalUSD = rawSubtotal + swissVAT + resortFee;

  const getCurrencySign = () => {
    if (currency === 'CHF') return 'CHF';
    if (currency === 'EUR') return '€';
    return 'US$';
  };

  const getConvertedVal = (usdVal: number) => {
    if (currency === 'CHF') return (usdVal * 0.91).toFixed(2);
    if (currency === 'EUR') return (usdVal * 0.92).toFixed(2);
    return usdVal.toFixed(2);
  };

  const getWhatsAppUrl = (booking: Booking) => {
    const message = `Hello, I'd like to confirm my spot at the Bare-harmony Resort! Here are my reservation details:

🏨 Resort: ${booking.hotelName}
📍 Location: ${booking.hotelCity}, Switzerland
🆔 Booking ID: ${booking.id}
👤 Guest: ${booking.guestName}
✉️ Email: ${booking.guestEmail}
🛌 Suite Option: ${booking.roomType}
🗓️ Dates: ${booking.checkIn} to ${booking.checkOut} (${nights} Night${nights > 1 ? 's' : ''})
👥 Details: ${booking.rooms} Room(s) • ${booking.adults} Adult(s)${booking.children > 0 ? ` • ${booking.children} Child(ren)` : ''}
💰 Total Paid: ${getCurrencySign()} ${getConvertedVal(booking.totalPrice)}

Thank you!`;
    return `https://wa.me/19134154907?text=${encodeURIComponent(message)}`;
  };

  const handleCardNumberChange = (val: string) => {
    // Only allow numbers and format into groups of 4
    const digits = val.replace(/\D/g, '');
    const groups = digits.match(/.{1,4}/g);
    setCardNumber(groups ? groups.slice(0, 4).join(' ') : '');
  };

  const handleExpiryChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (digits.length <= 2) {
      setCardExpiry(digits);
    } else {
      setCardExpiry(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    }
  };

  const handleCvvChange = (val: string) => {
    setCardCvv(val.replace(/\D/g, '').slice(0, 4));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!guestName.trim()) errors.guestName = 'Full Name is required';
    if (!guestEmail.trim()) {
      errors.guestEmail = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(guestEmail)) {
      errors.guestEmail = 'Enter a valid email address';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to the first error
      const errorEl = document.querySelector('.error-indicator');
      if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Simulate server side request for high fidelity
    setTimeout(() => {
      const newBooking: Booking = {
        id: generateBookingId(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.images[0],
        hotelCity: hotel.city,
        checkIn,
        checkOut,
        adults: adultsCount,
        children: childrenCount,
        rooms: roomsCount,
        roomType: ROOM_TYPES[selectedRoomIndex].name,
        totalPrice: grandTotalUSD,
        guestName,
        guestEmail,
        createdAt: new Date().toISOString(),
        status: 'confirmed'
      };

      onSaveBooking(newBooking);
      setSuccessBooking(newBooking);
      setIsSubmitting(false);

      // Auto redirect to WhatsApp with the booking message
      try {
        const url = getWhatsAppUrl(newBooking);
        window.open(url, '_blank');
      } catch (err) {
        console.error('Failed to open WhatsApp window automatically', err);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="bg-white w-full max-w-4xl rounded-xl shadow-2xl flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto text-booking-text"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black hover:bg-gray-100 p-2 rounded-full cursor-pointer transition z-30"
        >
          <X size={20} />
        </button>

        {!successBooking ? (
          <>
            {/* BOOKING DETAILS ENTRY */}
            {/* Sidebar Overview Panel (Left) */}
            <div className="w-full md:w-[320px] bg-emerald-50/10 border-r border-[#e7e7e7] p-6 flex flex-col shrink-0">
              <div className="relative rounded-lg overflow-hidden h-36 mb-4 shrink-0">
                <img
                  src={hotel.images[0]}
                  alt={hotel.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-booking-navy text-white text-[11px] font-bold py-0.5 px-2 rounded-sm border border-emerald-950 shadow-xs">
                  ★ {hotel.stars} Stars
                </div>
              </div>

              <span className="text-[11px] font-bold text-booking-blue uppercase tracking-wider">Your stay selection</span>
              <h4 className="text-base font-bold text-booking-navy leading-tight mt-1 mb-3">{hotel.name}</h4>
              <p className="text-xs text-booking-muted mb-4">{hotel.city}, Switzerland</p>

              {/* Stay params outline */}
              <div className="space-y-3.5 border-t border-[#e7e7e7] pt-4 text-xs font-medium">
                <div className="flex items-center gap-2.5 text-gray-700">
                  <Calendar size={15} className="text-booking-blue shrink-0" />
                  <div>
                    <span className="block font-bold">Check-In</span>
                    <span className="text-booking-muted">{formatDate(checkIn)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-gray-700">
                  <Calendar size={15} className="text-booking-blue shrink-0" />
                  <div>
                    <span className="block font-bold">Check-Out</span>
                    <span className="text-booking-muted">{formatDate(checkOut)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-gray-700">
                  <Users size={15} className="text-booking-blue shrink-0" />
                  <div>
                    <span className="block font-bold">Stay Details</span>
                    <span className="text-booking-muted">
                      {nights} Night{nights > 1 && 's'} • {roomsCount} Room{roomsCount > 1 && 's'}
                    </span>
                    <span className="block text-[11px] text-zinc-500 font-semibold mt-0.5">
                      {adultsCount} Adult{adultsCount > 1 && 's'} {childrenCount > 0 && `• ${childrenCount} Child`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Instant price ledger breakdown */}
              <div className="mt-auto pt-6 border-t border-dashed border-[#e7e7e7]">
                <div className="bg-white/80 p-3 rounded-lg border border-emerald-100/80 space-y-2 text-xs">
                  <span className="block font-bold text-booking-navy mb-1 text-center border-b pb-1">Price Summary</span>
                  <div className="flex justify-between">
                    <span className="text-booking-muted font-normal">Base Rate:</span>
                    <span className="font-semibold text-gray-700">
                      {getCurrencySign()} {getConvertedVal(roomBasePrice)} / nt
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-booking-muted font-normal">Nights multiplier:</span>
                    <span className="font-semibold text-gray-700">x {nights}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-booking-muted font-normal">Total room cost:</span>
                    <span className="font-semibold text-gray-700">
                      {getCurrencySign()} {getConvertedVal(rawSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-booking-muted font-normal flex items-center gap-0.5">
                      Swiss VAT <span className="text-[10px] text-zinc-400 font-light">(8.1%)</span>:
                    </span>
                    <span className="font-semibold text-gray-700">
                      {getCurrencySign()} {getConvertedVal(swissVAT)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-booking-muted font-normal">Tourist resort levy:</span>
                    <span className="font-semibold text-gray-700">
                      {getCurrencySign()} {getConvertedVal(resortFee)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t font-extrabold text-sm text-booking-navy">
                    <span>Grand Total:</span>
                    <span className="text-booking-blue">
                      {getCurrencySign()} {getConvertedVal(grandTotalUSD)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form & Room Selection Area (Right) */}
            <form onSubmit={handleFormSubmit} className="flex-1 p-6 flex flex-col justify-between bg-white">
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-extrabold text-booking-navy flex items-center gap-2">
                    <HotelIcon size={18} className="text-booking-blue" />
                    <span>Complete Your Bare-harmony Reservation</span>
                  </h3>
                  <p className="text-xs text-booking-muted mt-1">Please configure your luxury room suite option and guest credentials below</p>
                </div>

                {/* Step 1: Choose Room Tier Option */}
                <div>
                  <label className="block text-xs font-bold text-booking-navy uppercase tracking-wider mb-2">Step 1: Choose Room Suite Level</label>
                  <div className="grid grid-cols-1 gap-2.5">
                    {ROOM_TYPES.map((room, idx) => {
                      const isSelected = selectedRoomIndex === idx;
                      const addedAmt = room.addon;
                      return (
                        <div
                          key={idx}
                          onClick={() => setSelectedRoomIndex(idx)}
                          className={`border-2 rounded-lg p-3 cursor-pointer transition flex items-start gap-3 relative ${
                            isSelected
                              ? 'border-booking-blue bg-emerald-50/20'
                              : 'border-[#e7e7e7] hover:border-emerald-200 bg-white'
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'border-booking-blue bg-booking-blue text-white' : 'border-gray-300'
                          }`}>
                            {isSelected && <Check size={12} strokeWidth={3} />}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-bold text-sm text-booking-navy">{room.name}</span>
                              <span className="text-xs font-bold text-emerald-600">
                                {addedAmt === 0 ? 'Included rate' : `+ ${getCurrencySign()}${getConvertedVal(addedAmt)} / night`}
                              </span>
                            </div>
                            <p className="text-xs text-[#595959] mt-0.5 leading-relaxed">{room.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Traveler details with errors rendering */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-booking-navy uppercase tracking-wider">Step 2: Guest Information</label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Full Guest Name</label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-3 py-2 rounded border text-sm text-gray-800 focus:outline-none focus:border-booking-blue focus:ring-1 focus:ring-booking-blue ${
                          formErrors.guestName ? 'border-rose-500 bg-rose-50/20 error-indicator' : 'border-[#e7e7e7]'
                        }`}
                      />
                      {formErrors.guestName && (
                        <p className="text-[11px] text-rose-500 font-medium mt-0.5">{formErrors.guestName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="johndoe@example.com"
                        className={`w-full px-3 py-2 rounded border text-sm text-gray-800 focus:outline-none focus:border-booking-blue focus:ring-1 focus:ring-booking-blue ${
                          formErrors.guestEmail ? 'border-rose-500 bg-rose-50/20' : 'border-[#e7e7e7]'
                        }`}
                      />
                      {formErrors.guestEmail && (
                        <p className="text-[11px] text-rose-500 font-medium mt-0.5">{formErrors.guestEmail}</p>
                      )}
                    </div>
                  </div>

                  <div>
                     <label className="block text-xs font-semibold text-gray-700 mb-1">Special Wishes or Requests (Optional)</label>
                     <textarea
                       value={specialRequests}
                       onChange={(e) => setSpecialRequests(e.target.value)}
                       placeholder="e.g. Feather-free pillows, early checking if possible, high floor, quiet terrace perspective..."
                       rows={2}
                       className="w-full px-3 py-1.5 border border-[#e7e7e7] rounded text-xs text-gray-800 focus:outline-none focus:border-booking-blue focus:ring-1 focus:ring-booking-blue placeholder-gray-400"
                     />
                  </div>
                </div>
              </div>

              {/* Action Button Strip */}
              <div className="mt-6 pt-4 border-t border-[#e7e7e7] flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border rounded text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-booking-blue hover:bg-[#047857] text-white font-bold text-sm px-6 py-2.5 rounded transition shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Securing Room Spot...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Reservation</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          /* RESERVATION CONFIRMED RECEIPT VIEW */
          <div className="w-full p-8 text-center bg-white flex flex-col items-center justify-center space-y-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-emerald-300"
            >
              <CheckCircle size={38} className="stroke-[2.5]" />
            </motion.div>

            <div className="space-y-2 max-w-lg">
              <h3 className="font-display font-extrabold text-2xl text-booking-navy">Your stay is booked and locked!</h3>
              <p className="text-sm text-booking-muted">
                Thank you for booking with <span className="text-booking-blue font-bold">Bare-harmony Booking</span>. We have saved the booking to your device. An official confirmation voucher has been transmitted to <span className="font-bold text-[#1a1a1a]">{successBooking.guestEmail}</span>.
              </p>
            </div>

            {/* Structured Receipt Layout Card */}
            <div className="bg-slate-50 border border-[#e7e7e7] rounded-xl p-5 w-full max-w-md text-left text-xs divide-y divide-[#e7e7e7] relative overflow-hidden shadow-md">
              
              {/* Receipt Top Header */}
              <div className="pb-3 flex justify-between items-center bg-slate-100/50 -m-5 px-5 py-3 mb-2 border-b">
                <div>
                  <span className="font-mono text-xs font-bold text-gray-500 uppercase">OFFICIAL VOUCHER</span>
                  <p className="font-extrabold text-sm text-[#064e3b] mt-0.5">Bare-harmony Resort</p>
                </div>
                <div className="text-right">
                  <span className="font-bold block text-emerald-700">✓ CONFIRMED</span>
                  <span className="font-mono font-black text-booking-blue text-sm">{successBooking.id}</span>
                </div>
              </div>

              {/* Grid content */}
              <div className="py-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#595959]">Boutique Resort:</span>
                  <span className="font-bold text-booking-navy text-right max-w-[200px]">{successBooking.hotelName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">City Location:</span>
                  <span className="font-semibold text-gray-800">{successBooking.hotelCity}, Switzerland</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">Selected Suite:</span>
                  <span className="font-bold text-gray-800">{successBooking.roomType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">Checking Dates:</span>
                  <span className="font-mono font-medium text-gray-700">
                    {successBooking.checkIn} — {successBooking.checkOut}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">Guest Registered:</span>
                  <span className="font-bold text-booking-navy">{successBooking.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#595959]">Party Composition:</span>
                  <span className="font-semibold text-gray-700">
                    {successBooking.rooms} Room(s) for {successBooking.adults} Adult{successBooking.adults > 1 ? 's' : ''} {successBooking.children > 0 ? `• ${successBooking.children} Child(ren)` : ''}
                  </span>
                </div>
              </div>

              {/* Payment ledger */}
              <div className="py-3">
                <div className="flex justify-between text-sm font-black text-booking-navy pt-1">
                  <span>Price paid:</span>
                  <span className="text-booking-blue text-base">
                    {getCurrencySign()} {getConvertedVal(successBooking.totalPrice)}
                  </span>
                </div>
                <p className="text-[10px] text-booking-muted text-right mt-0.5">Total room layout taxes & resort levy integrated</p>
              </div>

              {/* QR Code Graphic representation */}
              <div className="pt-4 flex items-center justify-between gap-5 bg-white -mx-5 -mb-5 p-5 mt-2 border-t">
                <div className="space-y-1">
                  <p className="font-bold text-slate-800">Mobile Check-In Voucher</p>
                  <p className="text-[10px] text-booking-muted leading-tight">Ready to scan. Please present this QR graphic during check-in reception counters.</p>
                </div>
                {/* Simulated QR Code matrix box */}
                <div className="w-16 h-16 border-2 border-slate-300 p-1 bg-white flex items-center justify-center shrink-0">
                  <div className="grid grid-cols-4 gap-1 w-full h-full select-none cursor-help" title="Mock Check-In Code">
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-200 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    
                    <div className="bg-slate-200 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-200 rounded-sm"></div>
                    
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-200 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                    <div className="bg-slate-200 rounded-sm"></div>
                    <div className="bg-slate-900 rounded-sm"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voucher Control actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center w-full max-w-sm mx-auto">
              <a
                href={getWhatsAppUrl(successBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-2.5 text-xs font-bold rounded cursor-pointer transition shadow-md select-none"
              >
                <svg className="w-4 h-4 fill-current shrink-0 animate-pulse" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.115-2.875-6.973C16.604 1.912 14.12 1.887 11.94 1.887 6.51 1.887 2.08 6.308 2.076 11.75c-.001 1.745.465 3.447 1.349 4.954l-.99 3.615 3.712-.973zm11.365-5.992c-.312-.156-1.848-.912-2.134-1.016-.286-.104-.494-.156-.701.156-.207.312-.801.104-.981.312a.51.51 0 0 1-.722-.104c-.312-.156-1.316-.484-2.507-1.547-.927-.827-1.552-1.849-1.734-2.16-.182-.312-.019-.481.137-.636.141-.14.312-.365.468-.547.156-.182.208-.312.312-.52.104-.208.052-.391-.026-.547-.078-.156-.701-1.688-.96-2.312-.252-.606-.51-.522-.701-.522l-.598-.014c-.208 0-.547.078-.832.39-.286.312-1.092 1.068-1.092 2.604 0 1.536 1.117 3.02 1.273 3.229.156.208 2.2 3.36 5.33 4.715.745.322 1.325.515 1.78.659.749.238 1.432.204 1.971.124.602-.09 1.848-.756 2.108-1.45.26-.695.26-1.29.182-1.412-.078-.124-.286-.208-.598-.364z" />
                </svg>
                <span>Send to WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto flex items-center justify-center bg-booking-blue hover:bg-[#047857] text-white px-6 py-2.5 text-xs font-bold rounded cursor-pointer transition select-none"
              >
                <span>Back to Explorer</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
