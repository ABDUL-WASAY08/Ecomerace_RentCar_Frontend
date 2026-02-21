import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { LayoutDashboard, ShieldCheck, CalendarCheck, ClipboardList } from 'lucide-react';
import Footer from '../components/Footer';
import api from '../api/axiosInstance'
import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from "react-router-dom"
function Auth() {
    const navigate = useNavigate();
    const features = [
        { id: 1, title: "Smart User Dashboard", desc: "Manage your bookings efficiently.", icon: <LayoutDashboard size={24} /> },
        { id: 2, title: "Safety & Trust Features", desc: "Fully insured and 24/7 support.", icon: <ShieldCheck size={24} /> },
        { id: 3, title: "Booking & Reservation System", desc: "Instant confirmation in one click.", icon: <CalendarCheck size={24} /> },
        { id: 4, title: "Detailed Car Listing", desc: "Explore 500+ premium vehicles.", icon: <ClipboardList size={24} /> }
    ];

    const [activetab, setActiveTab] = useState("register");
    const [formData, SetformData] = useState({ name: "", email: "", password: "" });
    // car changing logic
    const cars = ["./car2.png", "./car1.png", "./car3.png", "./car4.png"];
    const [currentCarIndex, setCurrentCarIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentCarIndex((prevIndex) => (prevIndex + 1) % cars.length);
        }, 3000)
        return () => clearInterval(interval);
    }, []);

    // Tab change handle karne ke liye (Data reset karne ke liye)
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        SetformData({ name: "", email: "", password: "" });
    };

    // handle auth logic
    const handleAuth = async (e) => {
        e.preventDefault();
        let endpoint = activetab === "register" ? "/Users/registration" : "/Users/login";
        const payload = activetab === "register"
            ? formData
            : { email: formData.email, password: formData.password };

        try {
            const response = await api.post(endpoint, payload);
            console.log("Successfull:", response.data);
            if (response.data.status === true) {
                alert(response.data.message || "Operation Successful");
                if (activetab === "login") {
                    navigate('/dashboard');
                }
                else {
                    handleTabChange("login");
                }
            } else {
                alert(response.data.message || "Failed to process request");
            }


        } catch (error) {
            console.log("Auth Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong!");
        }
    };
    // handle google auth
    const handleGoogleSuccess = async (authResult) => {
        try {
            const token = authResult.credential;
            const response = await api.post("/Users/googleAuth", { token });
            console.log("Google Login Success:", response.data);
            alert("Login Successful!");
            navigate('/dashboard')

        } catch (error) {
            console.error("Google Auth Error:", error.response?.data || error.message);
            alert("Google Authentication Failed");
        }
    }
    // contact logic
    const [ContactData, setContactData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const handleContactChange = (e) => {
        setContactData({ ...ContactData, [e.target.name]: e.target.value });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Backend endpoint: /Ecomerace/Mail/sendmail
            const response = await api.post("/Mail/sendmail", ContactData);
            if (response.data.status) {
                alert("Email Sent Successfully!");
                setContactData({ name: "", email: "", message: "" }); // Reset form
            }
        } catch (error) {
            console.error("Mail Error:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Failed to send email");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='relative bg-white md:min-h-screen w-full overflow-hidden '>
            <Header />

            {/* the auth section */}
            <div className='grid grid-cols-1 lg:grid-cols-2 md:min-h-screen w-full gap-10 lg:gap-25 '>
                {/* branding div */}
                <div className='bg-[#ecd1af] flex-row  justify-center p-10 pt-32'>
                    <div className="mt-[20px] md:mt-[150px] text-center">
                        <h1 className="text-2xl sm:3xl md:text-3xl lg:text-7xl font-bold"><span className='text-blue-900'>R</span>ENT A CAR</h1>
                        <p className='text-black mt-5 text-2xl' >RENT A CAR WITH US AND HAVE SAFE JOURNEY</p>
                    </div>
                    {/* features */}
                    <div className='text-start ml-10 mt-10 hidden lg:block text-black '>
                        {features.map((item) => (
                            <div
                                key={item.id}
                                className=" group p-2 transition-all duration-300 cursor-default"
                            >
                                <div className="text-blue-700 mb-3 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                                <p className="text-gray-700 text-xs leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    {/* car on small screens */}
                    <div className='mx-auto z-20 pointer-events-none lg:hidden w-[400px] max-[442px]:w-[270px] max-[320px]:w-[200px] animate-x'>
                        <img
                            key={currentCarIndex + 1}
                            src={cars[(currentCarIndex + 1) % cars.length]}
                            alt="Premium Car"
                            className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 ease-in-out animate-fade-in animate-x"
                        />
                    </div>
                </div>

                {/* main work to do */}
                <div className='bg-transparent flex flex-col items-center justify-center p-3 md:p-10 text-black tracking-widest lg:min-h-screen relative '>
                    <div className="w-full max-w-md flex flex-col items-center ">
                        {activetab === "register" ? (
                            <>
                                <div className="text-center text-2xl md:text-4xl lg:text-5xl mb-10">
                                    <h1 className="font-bold max-[442]:text-sm uppercase">CREATE YOUR ACCOUNT</h1>
                                </div>
                                <form className="space-y-4 w-2/3 relative z-50 " onSubmit={handleAuth}>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="fullname"
                                            value={formData.name}
                                            className="peer w-full border-b-2 border-gray-300 py-2 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                            placeholder="Full Name"
                                            onChange={(e) => SetformData({ ...formData, name: e.target.value })}
                                            required
                                        />
                                        <label
                                            htmlFor="fullname"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm"
                                        >
                                            Full Name
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            className="peer w-full border-b-2 border-gray-300 py-2 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                            placeholder="Email Address"
                                            onChange={(e) => SetformData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password"
                                            value={formData.password}
                                            className="peer w-full border-b-2 border-gray-300 py-2 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                            placeholder="Password"
                                            onChange={(e) => SetformData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98] mt-4"
                                    >
                                        Sign Up
                                    </button>
                                    <p className="text-center text-sm text-gray-600 mt-6 tracking-normal">
                                        Already have an account?
                                        <span className="text-blue-900 font-bold ml-1 hover:underline cursor-pointer" onClick={() => handleTabChange("login")}>Log in</span>
                                    </p>
                                    <div className="flex items-center my-4">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="px-3 text-gray-500 text-xs">OR</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => console.log('Login Failed')}
                                            use_fedcm_for_prompt={true}
                                            theme="filled_blue"
                                            shape="pill"
                                        />
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <div className="text-center text-2xl md:text-4xl lg:text-5xl mb-10">
                                    <h1 className="font-bold max-[442]:text-sm uppercase">WELCOME BACK</h1>
                                </div>
                                <form className="space-y-4 w-2/3 relative z-50 " onSubmit={handleAuth}>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email-login"
                                            value={formData.email}
                                            className="peer w-full border-b-2 border-gray-300 py-2 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                            placeholder="Email Address"
                                            onChange={(e) => SetformData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                        <label
                                            htmlFor="email-login"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm"
                                        >
                                            Email Address
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            id="password-login"
                                            value={formData.password}
                                            className="peer w-full border-b-2 border-gray-300 py-2 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                            placeholder="Password"
                                            onChange={(e) => SetformData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <label
                                            htmlFor="password-login"
                                            className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all active:scale-[0.98] mt-4"
                                    >
                                        Sign In
                                    </button>
                                    <p className="text-center text-sm text-gray-600 mt-6 tracking-normal">
                                        DONT HAVE AN ACCOUNT?
                                        <span className="text-blue-900 font-bold ml-1 hover:underline cursor-pointer" onClick={() => handleTabChange("register")}>Register</span>
                                    </p>
                                    <div className="flex items-center my-4">
                                        <div className="flex-grow border-t border-gray-300"></div>
                                        <span className="px-3 text-gray-500 text-xs">OR</span>
                                        <div className="flex-grow border-t border-gray-300"></div>
                                    </div>
                                    <div className="flex justify-center w-full">
                                        <GoogleLogin
                                            onSuccess={handleGoogleSuccess}
                                            onError={() => console.log('Login Failed')}
                                            theme="filled_blue"
                                            shape="pill"
                                        />
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* about section & contact section */}
            <div className='grid grid-cols-1 md:grid-cols-2 md:min-h-screen w-full gap-10 lg:gap-25 '>
                <div className='relative bg-transparent flex flex-col justify-center p-10 pt-32 lg:min-h-screen overflow-hidden'>
                    <div className='absolute inset-0 z-0 pointer-events-none md:hidden xl:block'>
                        <img
                            src='./wasay.png'
                            className='w-3/4 h-3/4 object-cover opacity-20 grayscale mx-auto mt-50'
                            alt="Background Decor"
                        />

                        <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10">
                        <div className="mt-[20px] md:mt-[150px] text-center">
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-900 uppercase">OUR STORY</h1>
                            <p className='text-cyan-900 mt-5 text-2xl font-semibold'>"Driving Excellence Since 2010."</p>
                        </div>

                        <p className='text-black mt-10 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed text-center font-medium'>
                            What began as a small fleet of five vehicles has grown into a premium network of 500+ cars.
                            Our journey has been fueled by one goal—making luxury travel accessible and safe.
                            Every car in our fleet undergoes a rigorous 50-point safety check, ensuring that
                            when you're with us, you're in the best hands.
                        </p>

                        {/* car on small screens */}
                        <div className='mx-auto mt-10 z-20 pointer-events-none lg:hidden w-[400px] max-[442px]:w-[270px] max-[320px]:w-[200px] animate-x'>
                            <img
                                key={currentCarIndex}
                                src={cars[currentCarIndex]}
                                alt="Premium Car"
                                className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 ease-in-out animate-fade-in animate-x"
                            />
                        </div>
                    </div>
                </div>

                {/* contact */}
                <div className='bg-white flex flex-col items-center justify-center p-3 md:p-10 text-black tracking-widest lg:min-h-screen relative'>
                    <div className="w-full max-w-md flex flex-col items-center sm:mb-10">
                        <form
                            onSubmit={handleContactSubmit}
                            className="space-y-6 w-full max-w-lg relative z-50 bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20"
                        >
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-black text-blue-900 tracking-tighter uppercase">GET IN TOUCH</h2>
                                <p className="text-gray-600 text-xs mt-2 tracking-widest uppercase">We'd love to hear from you</p>
                            </div>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    id="contact-name"
                                    value={ContactData.name}
                                    onChange={handleContactChange}
                                    required
                                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                    placeholder="Name"
                                />
                                <label htmlFor="contact-name" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm">
                                    Your Name
                                </label>
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    id="contact-email"
                                    value={ContactData.email}
                                    onChange={handleContactChange}
                                    required
                                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent"
                                    placeholder="Email"
                                />
                                <label htmlFor="contact-email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm">
                                    Email Address
                                </label>
                            </div>

                            <div className="relative">
                                <textarea
                                    name="message"
                                    id="message"
                                    rows="3"
                                    value={ContactData.message}
                                    onChange={handleContactChange}
                                    required
                                    className="peer w-full border-b-2 border-gray-300 py-3 focus:border-blue-900 outline-none transition-colors bg-transparent placeholder-transparent resize-none"
                                    placeholder="Message"
                                ></textarea>
                                <label htmlFor="message" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-blue-900 peer-focus:text-sm">
                                    How can we help?
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-900 text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(30,58,138,0.3)] hover:bg-blue-800 transition-all active:scale-[0.98] uppercase tracking-widest text-sm ${loading ? 'opacity-50' : ''}`}
                            >
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>

                            <div className="flex justify-between items-center pt-4 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                                <span>📍 PAKISTAN, ISB</span>
                                <span>📞 +9233157B9320</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/* cars on large screen */}
            <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block lg:w-[300px] xl:w-[550px] '>
                <img
                    key={currentCarIndex}
                    src={cars[currentCarIndex]}
                    alt="Premium Car"
                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 ease-in-out animate-fade-in animate-x"
                />
            </div>
            <div className='absolute top-[85%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none hidden lg:block lg:w-[300px] xl:w-[550px] '>
                <img
                    key={currentCarIndex + 1}
                    src={cars[(currentCarIndex + 1) % cars.length]}
                    alt="Premium Car"
                    className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.3)] transition-opacity duration-1000 ease-in-out animate-fade-in animate-x"
                />
            </div>
            <Footer />
        </div>
    )
}

export default Auth;