import { motion } from 'motion/react';

export default function ValuePropsSection() {
  const props = [
    {
      title: 'Transparent Care Plans',
      description: 'Clear chiropractic recommendations, transparent pricing, and insurance direct-billing options with zero surprises.',
    },
    {
      title: 'Gentle, Tension-Free Adjustments',
      description: 'Patient-paced manual therapies, soothing alignments, and comforting clinical pacing from start to finish.',
    },
    {
      title: 'Focused Natural Healing',
      description: 'Gentle treatments targeting the root cause of joint and muscle pain to restore mobility safely without surgery or heavy drugs.',
    }
  ];

  return (
    <section className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.map((prop, idx) => (
          <motion.div
            key={idx}
            className="p-8 rounded-[28px] bg-white border border-gray-100 shadow-2xs hover:shadow-sm transition-all duration-300 flex flex-col justify-center space-y-3 min-h-[160px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -3 }}
          >
            <h4 className="font-display font-bold text-lg text-gray-950 leading-tight">
              {prop.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-sans font-normal">
              {prop.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
