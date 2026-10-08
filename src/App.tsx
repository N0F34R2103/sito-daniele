import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform, useScroll } from 'framer-motion';
import { Instagram, MessageCircle, ChevronDown, Dumbbell, Star, Mail, Zap, Camera, Users, Award, Clock, TrendingDown } from 'lucide-react';
import BackgroundCarousel from './components/BackgroundCarousel';

const SectionWrapper = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <motion.section
    id={id}
    className="py-32 px-6 scroll-mt-20 max-w-7xl mx-auto"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-100px' }}
    variants={{
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    }}
  >
    <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}>
      {children}
    </motion.div>
  </motion.section>
);

// Counter component for animated numbers
function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useSpring(from, { duration: duration * 1000 });
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, to, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const stats = [
  { label: 'Ore di Coaching', value: 5000, icon: Clock },
  { label: 'Clienti Soddisfatti', value: 350, icon: Users },
  { label: 'Kg Persi Totali', value: 2000, icon: TrendingDown },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Chi sono', id: 'about' },
    { name: 'Programmi', id: 'programs' },
    { name: 'Statistiche', id: 'stats' },
    { name: 'Testimonianze', id: 'testimonials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        if (section && section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(id);
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 font-sans relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      {/* Dynamic Background Carousel */}
      <BackgroundCarousel activeSection={activeSection} />
      
      {/* Floating Dynamic Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <motion.a 
          href="https://wa.me/393347401501?text=Ciao%2C%20vorrei%20avere%20maggiori%20informazioni%20sui%20vostri%20programmi%20di%20allenamento." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="p-3 bg-red-700 hover:bg-red-600 text-white rounded-full shadow-lg transition-all" 
          whileHover={{ scale: 1.1 }}
        >
          <MessageCircle size={20} />
        </motion.a>
        <motion.a href="https://www.instagram.com/danielebalestrino_fitnesscoach" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg transition-all" whileHover={{ scale: 1.1 }}><Instagram size={20} /></motion.a>
        <motion.button onClick={() => scrollToSection(navLinks[(navLinks.findIndex(l => l.id === activeSection) + 1) % navLinks.length].id)} className="p-3 bg-slate-50 text-black rounded-full shadow-lg transition-all" whileHover={{ scale: 1.1 }}><ChevronDown size={20} /></motion.button>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 scroll-mt-20">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="text-center">
            <motion.h1 
              className="text-6xl md:text-9xl font-extrabold tracking-tighter mb-8 bg-gradient-to-r from-red-600 to-slate-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 50, skewX: 20 }}
              animate={{ opacity: 1, y: 0, skewX: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Allenamento e <br /> Nutrizione su Misura.
            </motion.h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">Percorsi personalizzati basati sulle tue esigenze uniche. Dalla scienza alla pratica, per risultati reali.</p>
          </motion.div>
        </section>

        {/* About */}
        <SectionWrapper id="about">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square overflow-hidden rounded-3xl border border-slate-800">
              <img src="/images5.jpg" alt="Daniele e Cliente" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl font-bold">Il tuo approccio unico</h2>
              <p className="text-lg text-slate-400">Non esistono soluzioni standard. Analizzo la tua fisiologia, il tuo stile di vita e i tuoi obiettivi per creare un sistema sinergico di allenamento e nutrizione che si adatti a te, e non viceversa.</p>
            </div>
          </div>
        </SectionWrapper>

        {/* Programs */}
        <SectionWrapper id="programs">
          <h2 className="text-6xl font-extrabold mb-20 text-center tracking-tighter">Servizi Personalizzati</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
                { title: 'Personal Training', desc: 'Allenamenti su misura per i tuoi obiettivi, che tu sia a casa, in palestra o all\'aperto.', icon: Dumbbell },
                { title: 'Nutrizione Adattata', desc: 'Piani alimentari flessibili e sostenibili, creati per supportare il tuo allenamento e la tua salute.', icon: Star },
                { title: 'Monitoraggio Costante', desc: 'Analisi periodica dei progressi e aggiustamenti del programma in tempo reale.', icon: TrendingDown }
            ].map((p, idx) => (
              <motion.div key={p.title} whileHover={{ y: -10 }} className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 transition-all hover:border-red-900/50 shadow-xl">
                <div className="aspect-video overflow-hidden rounded-2xl mb-8">
                  <img src={`./images${idx + 1}.jpg`} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <p.icon className="mb-6 text-red-600" size={40} />
                <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
                <p className="text-slate-300 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* Stats */}
        <SectionWrapper id="stats">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-900/60 p-10 rounded-3xl border border-slate-800 text-center shadow-xl hover:border-red-900/50 transition-all">
                <stat.icon className="w-12 h-12 text-red-600 mx-auto mb-6" />
                <h3 className="text-6xl font-extrabold text-white mb-3">
                  <Counter to={stat.value} />+
                </h3>
                <p className="text-slate-300 font-semibold tracking-wide uppercase text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Testimonials */}
        <SectionWrapper id="testimonials">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <h2 className="text-6xl font-extrabold mb-20 text-center tracking-tighter">Successi dei Clienti</h2>
            <motion.div 
              className="flex gap-8"
              drag="x"
              dragConstraints={{ left: -1000, right: 0 }}
              dragElastic={0.2}
              dragTransition={{ power: 0.2, timeConstant: 200, modifyTarget: target => Math.round(target / 320) * 320 }}
            >
              {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
                <motion.div key={idx} className="flex-shrink-0 w-80 p-8 border border-slate-800 rounded-3xl bg-slate-900/60 shadow-xl hover:border-red-900/50 transition-all">
                  <Star className="text-red-600 mb-6" size={32} fill="currentColor" />
                  <p className="mb-8 text-slate-300 leading-relaxed italic">"Daniele ha trasformato il mio approccio all'allenamento. I risultati erano visibili in poche settimane."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                      <Users className="text-slate-500" size={24} />
                    </div>
                    <span className="font-semibold text-white">Cliente {i}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
