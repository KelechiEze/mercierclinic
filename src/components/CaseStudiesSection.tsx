import { useState } from 'react';
import { motion } from 'motion/react';

interface CaseStudy {
  id: string;
  name: string;
  age: number;
  treatment: string;
  quote: string;
  image: string;
}

function BeforeAfterSlider({ image, alt }: { image: string; alt: string }) {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative aspect-[3/4] w-full rounded-[24px] overflow-hidden select-none border border-gray-100 bg-gray-50 shadow-xs group">
      
      {/* Before Image (Grayscale & Slightly contrasty) */}
      <img
        src={image}
        alt={`${alt} Before`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none filter grayscale contrast-110 brightness-90 transition-all duration-300"
        referrerPolicy="no-referrer"
      />

      {/* After Image (Full Color, clipped based on slider position) */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img
          src={image}
          alt={`${alt} After`}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Before/After Badges */}
      <div className="absolute left-4 top-4 bg-black/45 backdrop-blur-xs text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 pointer-events-none">
        Before
      </div>
      <div className="absolute right-4 top-4 bg-[#15803d]/85 backdrop-blur-xs text-white text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10 pointer-events-none">
        After
      </div>

      {/* Slider Line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      />

      {/* Slider Control Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center z-20 pointer-events-none transition-transform duration-200 group-hover:scale-110"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="flex gap-0.5 items-center justify-center text-gray-500 font-bold text-[10px]">
          <span>‹</span>
          <span>›</span>
        </div>
      </div>

      {/* Hidden input range spanning the entire card to capture all touch & drag gestures */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />
    </div>
  );
}

export default function CaseStudiesSection() {
  const cases: CaseStudy[] = [
    {
      id: 'roberto',
      name: 'Roberto',
      age: 34,
      treatment: 'Sciatica Adjustment Roadmap',
      quote: '“They spent an hour on my consultation, scanned my spinal posture, and showed me exactly how alignment affects my daily pain. No pressure, just incredible relief.”',
      image: '/images/patient_roberto_chiro_1782245545772.jpg',
    },
    {
      id: 'margaret',
      name: 'Margaret',
      age: 61,
      treatment: 'Spinal Decompression',
      quote: '“I’d been putting off chiropractic care for years because I was nervous about adjustments. Dr. Mercier was incredibly gentle, walked me through every step, and now my chronic lower back pain is completely gone.”',
      image: '/images/patient_margaret_chiro_1782245561684.jpg',
    },
    {
      id: 'walter',
      name: 'Walter',
      age: 56,
      treatment: 'Cervical Alignment',
      quote: '“I used to get severe daily tension headaches and neck stiffness from my desk job. After just a few regular adjustments here, I’m sleeping better and working pain-free.”',
      image: '/images/patient_walter_chiro_1782245578198.jpg',
    }
  ];

  return (
    <section id="news" className="py-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* Centered Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-50 text-[#15803d] rounded-full text-xs font-bold font-mono tracking-wider">
          <span>◆</span> CASE STUDIES
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[44px] leading-tight text-gray-900 tracking-tight">
          Restore Your Natural Mobility
        </h2>
      </div>

      {/* Grid of Sliders and Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((patient, idx) => (
          <motion.div
            key={patient.id}
            className="flex flex-col space-y-5 bg-white rounded-3xl p-4 border border-gray-100 shadow-2xs hover:shadow-sm transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: 'easeOut' }}
          >
            {/* Interactive Before/After image slider */}
            <BeforeAfterSlider image={patient.image} alt={patient.name} />

            {/* Quote and Info */}
            <div className="flex-1 flex flex-col justify-between px-2 pb-2 space-y-4">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed italic font-sans font-normal">
                {patient.quote}
              </p>
              
              <div className="pt-2 border-t border-gray-50 flex flex-col">
                <span className="text-xs font-bold text-gray-950 font-sans">
                  {patient.name}, {patient.age}
                </span>
                <span className="text-[11px] text-gray-400 font-medium font-sans mt-0.5">
                  {patient.treatment}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
