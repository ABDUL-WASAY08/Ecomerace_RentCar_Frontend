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
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
  },
];

const TEXT_CONTENT = [
  {
    id: 1,
    message:
      "Renting a car is more than a transaction; it’s the freedom to choose the aesthetic of your journey.",
    message2:
      "A good dashboard should answer the user's most urgent questions within 3 seconds of loading.",
  },
  {
    id: 2,
    message:
      "A car is just a machine; the drive is a masterpiece. Don't just arrive—curate the space.",
    message2:
      "Experience zero-latency exploration. Browse our collection through an immersive live-map gallery.",
  },
  {
    id: 3,
    message:
      "Your journey has a mood. We have the drive to match it. Design your escape, one curve at a time.",
    message2:
      "Scout, select, and steer. With live-map tracking, your rental experience becomes a tactical advantage.",
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
      <div ref={containerRef} className="relative h-[100vh] pt-20 md:pt-10">
        <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 lg:gap-20 items-center">
            <div className="flex flex-col relative h-[300px] md:h-[400px] justify-center text-center lg:text-left">
              <div className="text-[#996244] font-bold text-4xl md:text-5xl lg:text-6xl mb-6 lg:mb-12 leading-tight">
                Don't just catch a ride, <br />
                <span className="text-black">curate the drive.</span>
                <div className="relative ">
                  <button
                    className="px-6 py-2 md:px-8 md:py-3 bg-[#996244] text-white rounded-full font-bold text-sm md:text-base hover:bg-[#7B542F] transition-colors cursor-pointer"
                    onClick={handleBooking}
                  >
                    Book Your Drive
                  </button>
                </div>
              </div>

              <div className="relative h-48 md:h-40">
                {TEXT_CONTENT.map((item, index) => {
                  const delay = index * 3;
                  return (
                    <div
                      key={item.id}
                      style={{
                        animation: `fadeSlide 12s ${delay}s infinite`,
                        opacity: 0,
                        transform: "translateY(30px)",
                      }}
                      className="absolute top-0 left-0 w-full flex flex-col items-center lg:items-start gap-2 md:gap-4"
                    >
                      <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center lg:items-start">
                        <Car
                          className="text-black shrink-0 hidden md:block"
                          size={28}
                        />
                        <p className="text-black text-lg md:text-xl lg:text-2xl font-medium leading-snug lg:leading-relaxed">
                          {item.message}
                        </p>
                      </div>
                      <p className="text-[#7B542F] text-base md:text-lg lg:text-xl font-medium leading-snug mt-2 lg:mt-5">
                        {item.message2}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full max-w-[300px] md:max-w-[450px] lg:max-w-[600px] mx-auto [perspective:1200px]">
              {CARDS.map((card, index) => {
                return (
                  <div
                    key={card.id}
                    className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 origin-center"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                      <p className="text-[10px] md:text-sm opacity-80 uppercase tracking-widest mb-1">
                        {card.category}
                      </p>
                      <h3 className="text-xl md:text-3xl font-bold">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Area */}
      <div className="w-full relative lg:fixed bottom-0 bg-[#FEFAE0]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 mt-10">
        <div className="flex items-center gap-8">
          <a
            href="#"
            className="text-[#cd9a65] hover:text-pink-600 transition-all transform hover:scale-110"
          >
            <CircleDollarSign size={24} />
          </a>
          <a
            href="#"
            className="text-[#cd9a65] hover:text-black transition-all transform hover:scale-110"
          >
            <Github size={24} />
          </a>
          <a
            href="#"
            className="text-[#cd9a65] hover:text-blue-700 transition-all transform hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
        </div>
        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">
          © 2026 Rent A Car. Made By @wasay.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
