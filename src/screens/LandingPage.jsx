import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Car, CircleDollarSign, Github, Linkedin } from "lucide-react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const CARDS = [
  {
    id: 1,
    title: "Midnight Series",
    category: "Premium",
    color: "bg-black",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Urban Explorer",
    category: "Utility",
    color: "bg-zinc-700",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Velocity Red",
    category: "Sport",
    color: "bg-red-950",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800",
  },
];

const TEXT_CONTENT = [
  {
    id: 1,
    message: "Renting a car is more than a transaction; it’s the freedom to choose the aesthetic of your journey.",
    message2: "A good dashboard should answer the user's most urgent questions within 3 seconds of loading.",
  },
  {
    id: 2,
    message: "A car is just a machine; the drive is a masterpiece. Don't just arrive—curate the space.",
    message2: "Experience zero-latency exploration. Browse our collection through an immersive live-map gallery.",
  },
  {
    id: 3,
    message: "Your journey has a mood. We have the drive to match it. Design your escape, one curve at a time.",
    message2: "Scout, select, and steer. With live-map tracking, your rental experience becomes a tactical advantage.",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.2]);

  const handleBooking = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate("/Auth");
  };

  return (
    <div className="bg-[#FEFAE0] min-h-screen">
      <Header />
      <div ref={containerRef} className="relative h-[400vh]">
        <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 lg:gap-20 items-center">
            <div className="flex flex-col relative h-[300px] md:h-[400px] justify-center text-center lg:text-left">
              <motion.h1
                style={{ opacity: titleOpacity }}
                className="text-[#996244] font-bold text-4xl md:text-5xl lg:text-6xl mb-6 lg:mb-12 leading-tight"
              >
                Don't just catch a ride, <br />
                <span className="text-black">curate the drive.</span>
              </motion.h1>

              <div className="relative h-48 md:h-40">
                {TEXT_CONTENT.map((item, index) => {
                  const start = index * 0.33;
                  const end = (index + 1) * 0.33;
                  const opacity = useTransform(scrollYProgress, [start - 0.05, start, end - 0.05, end], [0, 1, 1, 0]);
                  const y = useTransform(scrollYProgress, [start - 0.05, start, end], [40, 0, -40]);

                  return (
                    <motion.div
                      key={item.id}
                      style={{ opacity, y }}
                      className="absolute top-0 left-0 w-full flex flex-col items-center lg:items-start gap-2 md:gap-4"
                    >
                      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                        <Car className="text-black shrink-0 hidden md:block" size={28} />
                        <p className="text-black text-lg md:text-xl lg:text-2xl font-medium leading-snug lg:leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                      <p className="text-[#7B542F] text-base md:text-lg lg:text-xl font-medium leading-snug mt-2 lg:mt-5">
                        {item.message2}
                      </p>
                      
                      {index === TEXT_CONTENT.length - 1 && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          className="mt-6 px-6 py-2 md:px-8 md:py-3 bg-[#996244] text-white rounded-full font-bold text-sm md:text-base hover:bg-[#7B542F] transition-colors"
                          onClick={handleBooking}
                        >
                          Book Your Drive
                        </motion.button>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <div className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full max-w-[300px] md:max-w-[450px] lg:max-w-[600px] mx-auto [perspective:1200px]">
              {CARDS.map((card, index) => {
                const start = index * 0.33;
                const end = start + 0.33;
                const x = useTransform(
                  scrollYProgress,
                  [start, start + 0.2, start + 0.25],
                  [0, 200, 0] 
                );
                const scale = useTransform(scrollYProgress, [start - 0.33, start, end], [0.85, 1, 0.85]);
                const opacity = useTransform(scrollYProgress, [start - 0.33, start, end], [0.4, 1, 0.4]);
                const zIndex = useTransform(scrollYProgress, [start, start + 0.22, start + 0.23], [30 - index, 30 - index, 0]);

                return (
                  <motion.div
                    key={card.id}
                    style={{ x, scale, opacity, zIndex, rotateY: -15 }}
                    className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 origin-center"
                  >
                    <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                      <p className="text-[10px] md:text-sm opacity-80 uppercase tracking-widest mb-1">{card.category}</p>
                      <h3 className="text-xl md:text-3xl font-bold">{card.title}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="w-full relative lg:fixed bottom-0 bg-[#FEFAE0]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6">
        <div className='flex items-center gap-8'>
            <a href="#" className="text-[#cd9a65] hover:text-pink-600 transition-all transform hover:scale-110"><CircleDollarSign size={24} /></a>
            <a href="#" className="text-[#cd9a65] hover:text-black transition-all transform hover:scale-110"><Github size={24} /></a>
            <a href="#" className="text-[#cd9a65] hover:text-blue-700 transition-all transform hover:scale-110"><Linkedin size={24} /></a>
        </div>
        <p className='text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold'>
            © 2026 Rent A Car. Made By @wasay.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;