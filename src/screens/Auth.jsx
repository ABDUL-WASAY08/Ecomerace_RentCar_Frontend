import React, { useEffect, useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  LayoutDashboard,
  ShieldCheck,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import useUserStore from "../Store/useUserStore"; 
import useSocketStore from "../Store/useSocket";

function Auth() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [activetab, setActiveTab] = useState("register");
  const { connectSocket, listenToBookings } = useSocketStore(); 
  const [state, handleSubmit] = useForm("mzdakole");

  const [formData, SetformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const features = [
    {
      id: 1,
      title: "Smart User Dashboard",
      desc: "Manage your bookings efficiently.",
      icon: <LayoutDashboard size={24} color="#432818" />,
    },
    {
      id: 2,
      title: "Safety & Trust Features",
      desc: "Fully insured and 24/7 support.",
      icon: <ShieldCheck size={24} color="#432818"/>,
    },
    {
      id: 3,
      title: "Booking & Reservation System",
      desc: "Instant confirmation in one click.",
      icon: <CalendarCheck size={24} color="#432818" />,
    },
    {
      id: 4,
      title: "Detailed Car Listing",
      desc: "Explore 500+ premium vehicles.",
      icon: <ClipboardList size={24} color="#432818" />,
    },
  ];

  const cars = ["./car2.png", "./car1.png", "./car3.png", "./car4.png"];
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [cars.length]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    SetformData({ name: "", email: "", password: "" });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email and password are required");
      return;
    }
    if (activetab === "register" && !formData.name) {
      alert("Name is required for registration");
      return;
    }

    try {
      const endpoint =
        activetab === "register" ? "/user/register" : "/user/login";
      const payload =
        activetab === "register"
          ? formData
          : { email: formData.email, password: formData.password };
      const response = await api.post(endpoint, payload);

      if (response.data.status || response.data.success) {
        if (activetab === "register") {
          alert(
            "Registration successful! Please check email for verification.",
          );
          handleTabChange("login");
        } else {
          setUser(response.data.user);

          if (response.data.token)
            localStorage.setItem("token", response.data.token);
          if (response.data.user && response.data.user.id) {
            connectSocket(response.data.user.id);

            listenToBookings();
            console.log("✅ Socket connection initiated for user:", response.data.user.id);
          } else {
            console.warn("❌ User ID not available in response");
          }
          navigate("/store");
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGoogleSuccess = async (authResult) => {
    try {
      const response = await api.post("/user/google-login", {
        token: authResult.credential,
      });
      if (response.data.status || response.data.success) {
        setUser(response.data.user);
       localStorage.setItem("token", response.data.token);
        navigate("/store");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Google login failed");
    }
  };
  return (
    <div className="relative bg-white md:min-h-screen w-full overflow-hidden">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 md:min-h-screen w-full gap-10 lg:gap-25">
        <div className="bg-[#ddad71] flex-row justify-center p-10 pt-32">
          <div className="mt-[20px] md:mt-[150px] text-center">
            <h1 className="text-2xl sm:3xl md:text-3xl lg:text-7xl font-bold pointer-events-none">
              <span className="text-[#935732]">R</span>ENT A CAR
            </h1>
            <p className="text-white/50 mt-5 text-2xl pointer-events-none">
              RENT A CAR WITH US AND HAVE SAFE JOURNEY
            </p>
            <div className="flex justify-center my-8 pr-10">
              <button
                className="group relative flex items-center justify-center gap-3 bg-[#432818] text-[#fdfbf7] px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-[0.2em] hover:bg-[#604439] transition-all active:scale-95 shadow-lg shadow-brown-100/50"
                onClick={() => navigate("/store")}
              >
                Visit Store
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
          <div className="text-start ml-10 mt-10 hidden lg:block text-black">
            {features.map((item) => (
              <div
                key={item.id}
                className="group p-2 transition-all duration-300 cursor-default"
              >
                <div className="text-blue-700 mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="mx-auto z-20 pointer-events-none lg:hidden w-[400px] max-[442px]:w-[270px] max-[320px]:w-[200px] animate-x">
            <img
              key={currentCarIndex + 1}
              src={cars[(currentCarIndex + 1) % cars.length]}
              alt="Car"
              className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 animate-fade-in animate-x"
            />
          </div>
        </div>
        <div className="bg-transparent flex flex-col items-center justify-center p-3 md:p-10 text-black tracking-widest lg:min-h-screen relative">
          <div className="w-full max-w-md flex flex-col items-center">
            {activetab === "register" ? (
              <>
                <div className="text-center text-2xl md:text-4xl lg:text-5xl mb-10">
                  <h1 className="text-[#432818] font-bold uppercase pointer-events-none">CREATE YOUR ACCOUNT</h1>
                </div>
                <form
                  className="space-y-4 w-2/3 relative z-50"
                  onSubmit={handleAuth}
                >
                  <div className="relative">
                    <input
                      type="text"
                      id="fullname"
                      value={formData.name}
                      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                      placeholder="Full Name"
                      onChange={(e) =>
                        SetformData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="fullname"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                    >
                      Full Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                      placeholder="Email Address"
                      onChange={(e) =>
                        SetformData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password"
                      value={formData.password}
                      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                      placeholder="Password"
                      onChange={(e) =>
                        SetformData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#432818] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-[#cd9a65] transition-all active:scale-[0.98] mt-4"
                  >
                    Sign Up
                  </button>
                  <p className="text-center text-sm text-[#cd9a65] mt-6 tracking-normal">
                    Already have an account?{" "}
                    <span
                      className="text-[#432818] font-bold ml-1 hover:underline cursor-pointer"
                      onClick={() => handleTabChange("login")}
                    >
                      Log in
                    </span>
                  </p>
                  <div className="flex justify-center w-full mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => console.log("Login Failed")}
                      use_fedcm_for_prompt={true}
                      theme="filled_black"
                      shape="pill"
                    />
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="text-center text-2xl md:text-4xl lg:text-5xl mb-10">
                  <h1 className=" text-[#432818] font-bold uppercase">WELCOME BACK</h1>
                </div>
                <form
                  className="space-y-4 w-2/3 relative z-50"
                  onSubmit={handleAuth}
                >
                  <div className="relative">
                    <input
                      type="email"
                      id="email-login"
                      value={formData.email}
                      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                      placeholder="Email Address"
                      onChange={(e) =>
                        SetformData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="email-login"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      id="password-login"
                      value={formData.password}
                      className="peer w-full border-b-2 border-gray-300 py-2 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                      placeholder="Password"
                      onChange={(e) =>
                        SetformData({ ...formData, password: e.target.value })
                      }
                      required
                    />
                    <label
                      htmlFor="password-login"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                    >
                      Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#432818] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98] mt-4"
                  >
                    Sign In
                  </button>
                  <p className="text-center text-sm text-[#cd9a65] mt-6 tracking-normal">
                    DONT HAVE AN ACCOUNT?{" "}
                    <span
                      className="text-[#432818] font-bold ml-1 hover:underline cursor-pointer"
                      onClick={() => handleTabChange("register")}
                    >
                      Register
                    </span>
                  </p>
                  <div className="flex justify-center w-full mt-4">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => console.log("Login Failed")}
                      theme="filled_black"
                      shape="pill"
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-screen w-full gap-10 lg:gap-25">
        <div className="relative bg-transparent flex flex-col justify-center p-10 pt-32 lg:min-h-screen overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none md:hidden xl:block">
            <img
              src="./wasay.png"
              className="w-3/4 h-3/4 object-cover opacity-20 grayscale mx-auto mt-50"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"></div>
          </div>
          <div className="relative z-10">
            <div className="mt-[20px] md:mt-[150px] text-center">
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#432818] uppercase">
                OUR STORY
              </h1>
              <p className="text-cyan-900 mt-5 text-2xl font-semibold">
                "Driving Excellence Since 2010."
              </p>
            </div>
            <p className="text-black mt-10 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-center font-medium">
              What began as a small fleet of five vehicles has grown into a
              premium network of 500+ cars. Our journey has been fueled by one
              goal—making luxury travel accessible and safe.
            </p>
          </div>
        </div>

        <div className="bg-white flex flex-col items-center justify-center p-3 md:p-10 text-black tracking-widest lg:min-h-screen relative">
          <div className="w-full max-w-md flex flex-col items-center sm:mb-10">
            {state.succeeded ? (
              <div className="text-center p-10 bg-white rounded-2xl shadow-xl border border-blue-100 relative z-50">
                <h2 className="text-2xl font-bold text-[#432818]">THANKS</h2>
                <p className="text-gray-600 mt-2">Your Message Is receieved.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-[#432818] underline font-bold"
                >
                  Resend
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 w-full max-w-lg relative z-50 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-black text-[#432818] tracking-tighter uppercase">
                    GET IN TOUCH
                  </h2>
                  <p className="text-gray-600 text-xs mt-2 tracking-widest uppercase">
                    We'd love to hear from you
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="contact-name"
                    required
                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                    placeholder="Name"
                  />
                  <label
                    htmlFor="contact-name"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                  >
                    Your Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email-contact"
                    required
                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="email-contact"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-[10px]"
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    rows="3"
                    required
                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-[#432818] outline-none transition-colors bg-transparent placeholder-transparent resize-none"
                    placeholder="Message"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-[#432818] peer-focus:text-sm"
                  >
                    How can we help?
                  </label>
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                    className="text-red-500 text-[10px]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-[#432818] text-white font-black py-4 rounded-xl shadow-lg hover:bg-[#cd9a65] transition-all active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
                <div className="flex justify-between items-center pt-4 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                  <span>📍 PAKISTAN, ISB</span>
                  <span>📞 +9233157B9320</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block lg:w-[300px] xl:w-[550px]">
        <img
          key={currentCarIndex}
          src={cars[currentCarIndex]}
          alt="Car"
          className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 animate-fade-in animate-x"
        />
      </div>
      <div className="absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block lg:w-[300px] xl:w-[550px]">
        <img
          key={currentCarIndex + 1}
          src={cars[(currentCarIndex + 1) % cars.length]}
          alt="Car"
          className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 animate-fade-in animate-x"
        />
      </div>
      <Footer />
    </div>
  );
}

export default Auth;
