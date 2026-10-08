import { motion, AnimatePresence } from 'framer-motion';

const images = [
  './images1.jpg',
  './images2.jpg',
  './images3.jpg',
  './images4.jpg',
  './images5.jpg',
];

const BackgroundCarousel = ({ activeSection }: { activeSection: string }) => {
  // Map sections to image index
  const sectionMap: Record<string, number> = {
    'home': 0,
    'about': 1,
    'programs': 2,
    'stats': 3,
    'testimonials': 4,
  };
  
  const imageIndex = sectionMap[activeSection] || 0;

  return (
    <div className="fixed inset-0 z-0">
      <AnimatePresence>
        <motion.img
          key={imageIndex}
          src={images[imageIndex]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-slate-50/50" />
    </div>
  );
};

export default BackgroundCarousel;
