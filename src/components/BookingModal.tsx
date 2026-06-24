import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, User, Clock, CheckCircle2, Star, Sparkles, ChevronLeft } from 'lucide-react';
import { DENTISTS, SERVICES } from '../data';
import { Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: () => void;
}

export default function BookingModal({ isOpen, onClose, onBookingSuccess }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [selectedDentistId, setSelectedDentistId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientNote, setPatientNote] = useState('');

  // Generate 7 days starting from today for scheduling
  const getUpcomingDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // Skip Thursdays, Saturdays, and Sundays (clinic is closed)
      if (date.getDay() === 0 || date.getDay() === 4 || date.getDay() === 6) continue;
      
      days.push({
        rawDate: date.toISOString().split('T')[0],
        dayOfWeek: weekdays[date.getDay()],
        dayOfMonth: date.getDate(),
        month: months[date.getMonth()],
        year: date.getFullYear()
      });
    }
    return days;
  };

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const upcomingDays = getUpcomingDays();

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
    setStep(2);
  };

  const handleDentistSelect = (id: string) => {
    setSelectedDentistId(id);
    setStep(3);
  };

  const handleDateSelect = (dateStr: string) => {
    setSelectedDate(dateStr);
  };

  const handleTimeSelect = (timeStr: string) => {
    setSelectedTime(timeStr);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId || !selectedDentistId || !selectedDate || !selectedTime || !patientName || !patientEmail) {
      return;
    }

    const service = SERVICES.find(s => s.id === selectedServiceId);
    const dentist = DENTISTS.find(d => d.id === selectedDentistId);

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      serviceId: selectedServiceId,
      serviceName: service?.title || 'General Consultation',
      dentistId: selectedDentistId,
      dentistName: dentist?.name || 'Any Available Specialist',
      date: selectedDate,
      time: selectedTime,
      patientName,
      patientEmail,
      patientPhone,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    // Save to local storage
    const existing = localStorage.getItem('dentix_bookings');
    const bookings = existing ? JSON.parse(existing) : [];
    bookings.push(newAppointment);
    localStorage.setItem('dentix_bookings', JSON.stringify(bookings));

    setStep(5);
    onBookingSuccess();
  };

  const handleReset = () => {
    setStep(1);
    setSelectedServiceId('');
    setSelectedDentistId('');
    setSelectedDate('');
    setSelectedTime('');
    setPatientName('');
    setPatientEmail('');
    setPatientPhone('');
    setPatientNote('');
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const selectedService = SERVICES.find(s => s.id === selectedServiceId);
  const selectedDentist = DENTISTS.find(d => d.id === selectedDentistId);

  // Helper for displaying nice date format
  const formatFriendlyDate = (dateStr: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" id="booking-modal-overlay">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 flex flex-col md:flex-row min-h-[580px]"
        >
          {/* Left panel (Appointment Summary or Aesthetic Promo) */}
          <div className="w-full md:w-[240px] bg-[#142216] p-6 text-white flex flex-col justify-between border-r border-[#1a2f1d]">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-7 h-7 rounded-full bg-[#15803d] flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-[#b6f05e]" />
                </div>
                <span className="font-display font-bold text-base tracking-tight text-[#b6f05e]">
                  Mercier Care
                </span>
              </div>

              {step < 5 ? (
                <div className="space-y-6">
                  <div className="text-xs font-semibold tracking-wider text-[#b6f05e] uppercase">
                    Your Selection
                  </div>
                  
                  {/* Service selection state */}
                  {selectedService && (
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                      <span className="text-[11px] text-gray-400 font-medium block">SERVICE</span>
                      <p className="text-[13px] font-medium leading-snug">{selectedService.title}</p>
                      <p className="text-xs text-[#b6f05e] font-semibold">{selectedService.price}</p>
                    </motion.div>
                  )}

                  {/* Dentist selection state */}
                  {selectedDentist && (
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                      <span className="text-[11px] text-gray-400 font-medium block">SPECIALIST</span>
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedDentist.image}
                          alt={selectedDentist.name}
                          className="w-5 h-5 rounded-full object-cover border border-white/20"
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-[13px] font-medium">{selectedDentist.name}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Date & Time selection state */}
                  {selectedDate && selectedTime && (
                    <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="space-y-1">
                      <span className="text-[11px] text-gray-400 font-medium block">APPOINTMENT</span>
                      <p className="text-[13px] font-medium">{formatFriendlyDate(selectedDate)}</p>
                      <p className="text-xs text-[#b6f05e] font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {selectedTime}
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="w-12 h-12 rounded-full bg-[#15803d]/30 border border-[#b6f05e]/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#b6f05e]" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-white leading-tight">Confirmed!</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    We have successfully saved your booking and sent a reminder details summary directly to your client-side dashboard!
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 text-[11px] text-gray-400 border-t border-white/10 pt-4">
              Need assistance? Call us at <br />
              <span className="text-white font-semibold">+1 662-562-9021</span>
            </div>
          </div>

          {/* Right panel (Workflow steps) */}
          <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between bg-white relative">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Step navigation indicator */}
            {step < 5 && (
              <div className="flex items-center gap-4 mb-6">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                )}
                <div className="text-[11px] text-gray-400 font-semibold tracking-wider uppercase ml-auto">
                  Step {step} of 4
                </div>
              </div>
            )}

            {/* Dynamic Step Content */}
            <div className="flex-1 overflow-y-auto max-h-[420px] pr-1 custom-scrollbar">
              <AnimatePresence mode="wait">
                {/* STEP 1: Select Service */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 tracking-tight">
                        Select a Chiropractic Service
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Choose the chiropractic care or consultation service you need.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {SERVICES.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleServiceSelect(service.id)}
                          className={`group p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer text-left hover:shadow-sm ${
                            selectedServiceId === service.id
                              ? 'border-[#15803d] bg-emerald-50/20'
                              : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-sm text-gray-900 group-hover:text-[#15803d] transition-colors">
                                {service.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                            <span className="text-xs font-semibold text-[#15803d] shrink-0 whitespace-nowrap bg-emerald-50 px-2 py-1 rounded-lg">
                              {service.price}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 mt-2 pt-2 border-t border-gray-100/50 text-[10px] text-gray-400 font-medium">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {service.duration}
                            </span>
                            <span>• Specialist chiropractic session</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Select Specialist */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 tracking-tight">
                        Select a Specialist
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Our dedicated chiropractic and soft tissue specialists.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {DENTISTS.map((dentist) => (
                        <div
                          key={dentist.id}
                          onClick={() => handleDentistSelect(dentist.id)}
                          className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex gap-4 hover:shadow-sm ${
                            selectedDentistId === dentist.id
                              ? 'border-[#15803d] bg-emerald-50/20'
                              : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50/50'
                          }`}
                        >
                          <img
                            src={dentist.image}
                            alt={dentist.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-100"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold text-sm text-gray-900">
                                {dentist.name}
                              </h3>
                              <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 shrink-0">
                                <Star className="w-3.5 h-3.5 fill-current" /> {dentist.rating}
                              </div>
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium">{dentist.role}</p>
                            <p className="text-xs text-gray-400 mt-1 line-clamp-1 leading-normal">
                              {dentist.bio}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Choose Date & Time */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 tracking-tight">
                        Choose Date & Time
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Select a convenient day and time slot for your procedure.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Date Horizontal Carousel */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Select Date</label>
                        <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-thin custom-scrollbar">
                          {upcomingDays.map((day) => (
                            <button
                              key={day.rawDate}
                              type="button"
                              onClick={() => handleDateSelect(day.rawDate)}
                              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border min-w-[64px] transition-all cursor-pointer ${
                                selectedDate === day.rawDate
                                  ? 'border-[#15803d] bg-[#15803d] text-white'
                                  : 'border-gray-100 hover:border-gray-200 bg-gray-50/50 hover:bg-gray-50 text-gray-700'
                              }`}
                            >
                              <span className={`text-[10px] font-semibold tracking-wider uppercase ${selectedDate === day.rawDate ? 'text-emerald-100' : 'text-gray-400'}`}>
                                {day.dayOfWeek}
                              </span>
                              <span className="text-base font-bold font-display mt-0.5">
                                {day.dayOfMonth}
                              </span>
                              <span className={`text-[9px] font-medium ${selectedDate === day.rawDate ? 'text-emerald-100' : 'text-gray-500'}`}>
                                {day.month}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Time Slots Grid */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Available Slots</label>
                        {selectedDate ? (
                          <div className="grid grid-cols-4 gap-2">
                            {timeSlots.map((timeStr) => (
                              <button
                                key={timeStr}
                                type="button"
                                onClick={() => handleTimeSelect(timeStr)}
                                className={`py-2 rounded-xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                                  selectedTime === timeStr
                                    ? 'border-[#15803d] bg-[#15803d]/10 text-[#15803d]'
                                    : 'border-gray-100 hover:border-gray-200 bg-white text-gray-700'
                                }`}
                              >
                                {timeStr}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6 border border-dashed border-gray-100 rounded-xl bg-gray-50/30">
                            <p className="text-xs text-gray-400">Please select a date first to view time slots.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        disabled={!selectedDate || !selectedTime}
                        onClick={() => setStep(4)}
                        className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-sans font-semibold text-xs transition-colors hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                      >
                        Continue to Details
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: Patient Details */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="space-y-4"
                  >
                    <div>
                      <h2 className="font-display font-bold text-xl text-gray-900 tracking-tight">
                        Patient Details
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Please provide your contact information to finalize the booking.
                      </p>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="Eleanor Vance"
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-100 focus:border-[#15803d] focus:outline-none text-sm transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1">Email Address *</label>
                          <input
                            type="email"
                            required
                            value={patientEmail}
                            onChange={(e) => setPatientEmail(e.target.value)}
                            placeholder="eleanor@example.com"
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-100 focus:border-[#15803d] focus:outline-none text-sm transition-colors"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            value={patientPhone}
                            onChange={(e) => setPatientPhone(e.target.value)}
                            placeholder="(310) 555-0199"
                            className="w-full px-3.5 py-2 rounded-xl border border-gray-100 focus:border-[#15803d] focus:outline-none text-sm transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-500 tracking-wide block mb-1">Note or Symptoms (Optional)</label>
                        <textarea
                          rows={2}
                          value={patientNote}
                          onChange={(e) => setPatientNote(e.target.value)}
                          placeholder="Brief description of physical health history, current symptoms, joint/muscle concerns, or special requests..."
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-100 focus:border-[#15803d] focus:outline-none text-sm transition-colors resize-none"
                        />
                      </div>

                      <div className="flex justify-end pt-3 border-t border-gray-100">
                        <button
                          type="submit"
                          className="w-full py-3 rounded-xl bg-[#b6f05e] hover:bg-[#a3e635] text-[#0f172a] font-sans font-bold text-sm transition-all shadow hover:shadow-md cursor-pointer"
                        >
                          Confirm Appointment ↗
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 5: Success confirmation */}
                {step === 5 && (
                  <motion.div
                    key="step-5"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-4 text-[#15803d]">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="font-display font-bold text-2xl text-gray-900 tracking-tight">
                      Appointment Confirmed!
                    </h2>
                    <p className="text-xs text-gray-500 mt-2 max-w-sm leading-relaxed">
                      Thank you for choosing Mercier Chiropractic, <strong>{patientName}</strong>. Your appointment has been booked. We look forward to helping you live life without the ache.
                    </p>

                    <div className="w-full max-w-sm mt-6 p-4 rounded-2xl bg-gray-50 text-left space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">SPECIALIST:</span>
                        <span className="font-semibold text-gray-800">{selectedDentist?.name}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">SERVICE:</span>
                        <span className="font-semibold text-gray-800">{selectedService?.title}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-400 font-medium">DATE & TIME:</span>
                        <span className="font-semibold text-[#15803d]">
                          {formatFriendlyDate(selectedDate)} at {selectedTime}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-slate-900 text-white font-sans font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Return to Website
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
