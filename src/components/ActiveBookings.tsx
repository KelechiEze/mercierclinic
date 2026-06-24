import { useState, useEffect } from 'react';
import { Calendar, Clock, User, Trash2, CheckCircle2, Sparkles } from 'lucide-react';
import { Appointment } from '../types';

interface ActiveBookingsProps {
  refreshTrigger: number;
  onCancelBooking: () => void;
}

export default function ActiveBookings({ refreshTrigger, onCancelBooking }: ActiveBookingsProps) {
  const [bookings, setBookings] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchBookings = () => {
      const stored = localStorage.getItem('dentix_bookings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Only show confirmed, active ones
          const active = parsed.filter((b: Appointment) => b.status === 'confirmed');
          setBookings(active);
        } catch (e) {
          console.error(e);
        }
      } else {
        setBookings([]);
      }
    };
    fetchBookings();
  }, [refreshTrigger]);

  const handleCancel = (id: string) => {
    const stored = localStorage.getItem('dentix_bookings');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Appointment[];
        const updated = parsed.map(b => {
          if (b.id === id) return { ...b, status: 'cancelled' as const };
          return b;
        });
        localStorage.setItem('dentix_bookings', JSON.stringify(updated));
        
        // Refresh local view
        const active = updated.filter(b => b.status === 'confirmed');
        setBookings(active);
        onCancelBooking();
      } catch (e) {
        console.error(e);
      }
    }
  };

  if (bookings.length === 0) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 mt-8">
      <div className="bg-emerald-50/40 border border-[#15803d]/15 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-5 h-5 rounded-full bg-[#15803d]/10 flex items-center justify-center">
            <Sparkles className="w-3 text-[#15803d]" />
          </div>
          <h4 className="font-display font-bold text-xs text-slate-800 tracking-tight">
            Your Active Restorative Bookings ({bookings.length})
          </h4>
        </div>

        <div className="space-y-2.5">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-[#15803d]/10 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
            >
              <div className="space-y-1.5 text-left">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0" />
                  <span>{booking.serviceName}</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gray-500 font-medium">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gray-400" /> {booking.dentistName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" /> {booking.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" /> {booking.time}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleCancel(booking.id)}
                className="self-end sm:self-auto flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-500 hover:bg-red-50/50 text-[10.5px] font-semibold transition-all cursor-pointer"
                title="Cancel Appointment"
              >
                <Trash2 className="w-3.5 h-3.5" /> Cancel
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
