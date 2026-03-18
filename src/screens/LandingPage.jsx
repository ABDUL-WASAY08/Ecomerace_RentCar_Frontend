import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Car, 
  CircleDollarSign, 
  Github, 
  Linkedin,
  Sparkles,
  Shield,
  Clock,
  MapPin,
  Star,
  Zap,
  Users,
  ChevronRight
} from "lucide-react";
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

const FEATURES = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Premium Fleet",
    description: "Access our curated collection of luxury and performance vehicles"
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Insurance Included",
    description: "Comprehensive coverage for peace of mind on every journey"
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "24/7 Support",
    description: "Round-the-clock assistance for any situation on the road"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Multiple Locations",
    description: "Convenient pickup and drop-off points across the city"
  }
];

const POPULAR_CARS = [
  {
    id: 1,
    name: "Porsche 911",
    category: "Sports",
    price: "$299/day",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    id: 2,
    name: "Range Rover Sport",
    category: "SUV",
    price: "$249/day",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
    rating: 4.8
  },
  {
    id: 3,
    name: "Mercedes S-Class",
    category: "Luxury",
    price: "$349/day",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800",
    rating: 4.9
  },
  {
    id: 4,
    name: "BMW M4",
    category: "Performance",
    price: "$279/day",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=800",
    rating: 4.7
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "James Wilson",
    role: "Business Executive",
    content: "The attention to detail and customer service is exceptional. Every car feels like it's been curated just for you.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Travel Blogger",
    content: "I've rented from many services, but this one stands out. The cars are always immaculate and the booking process is seamless.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108777-286b5e0a2593?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Car Enthusiast",
    content: "Finally a rental service that understands passion for automobiles. The Midnight Series is absolutely stunning.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800"
  }
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
      
      {/* Hero Section */}
      <div ref={containerRef} className="relative h-[100vh] pt-20 md:pt-40 lg:pt-10">
        <div className="sticky top-0 h-screen flex items-center px-6 md:px-12 lg:px-20 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-10 lg:gap-20 items-center">
            <div className="flex flex-col relative h-[300px] md:h-[400px] justify-center text-center lg:text-left">
              <div className="text-[#996244] font-bold text-4xl md:text-4xl lg:text-6xl mb-6 lg:mb-12 leading-tight">
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

      {/* Features Section */}
      <section className="px-6 md:px-12 lg:px-20 py-60 bg-[#FEFAE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#996244] font-semibold tracking-wider uppercase text-sm">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">Experience Excellence</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Every detail matters when you're behind the wheel. We've crafted an experience that matches your ambition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-sm p-8 rounded-2xl border border-[#cd9a65]/20 hover:border-[#cd9a65]/40 transition-all group"
              >
                <div className="text-[#996244] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cars Section */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#FEFAE0]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#996244] font-semibold tracking-wider uppercase text-sm">The Collection</span>
              <h2 className="text-4xl md:text-5xl font-bold text-black mt-4">Popular Choices</h2>
            </div>
            <button 
              onClick={handleBooking}
              className="hidden md:flex items-center gap-2 text-[#996244] hover:text-[#7B542F] transition-colors font-semibold"
            >
              View All <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_CARS.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={handleBooking}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={car.image} 
                    alt={car.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-semibold">{car.rating}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black mb-1">{car.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-[#996244] font-semibold">{car.category}</span>
                  <span className="text-black font-bold">{car.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#FEFAE0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#996244] font-semibold tracking-wider uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-black mt-4 mb-6">Trusted by Drivers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Join thousands of satisfied customers who've made their journeys memorable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-black">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-[#FEFAE0]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-[#996244] to-[#7B542F] p-12 md:p-16 rounded-3xl"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Curate Your Drive?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join our community of discerning drivers and experience the difference of a curated rental.
            </p>
            <button
              onClick={handleBooking}
              className="px-8 py-4 bg-white text-[#996244] rounded-full font-bold text-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group"
            >
              Get Started <Zap size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-12 lg:px-20 py-12 bg-[#FEFAE0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Luxury Cars" },
              { number: "50K+", label: "Happy Customers" },
              { number: "24/7", label: "Support Available" },
              { number: "15+", label: "City Locations" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#996244] mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Area */}
      <div className="w-full relative bottom-0 bg-[#FEFAE0]/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 mt-0 border-t border-[#cd9a65]/20">
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

      {/* Add keyframe animation */}
      <style jsx>{`
        @keyframes fadeSlide {
          0%, 25% {
            opacity: 0;
            transform: translateY(30px);
          }
          33%, 58% {
            opacity: 1;
            transform: translateY(0);
          }
          58%, 100% {
            opacity: 0;
            transform: translateY(-30px);
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;