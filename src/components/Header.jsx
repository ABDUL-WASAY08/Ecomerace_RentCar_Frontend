import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Clock, CheckCircle } from "lucide-react";
import useSocketStore from "../Store/useSocket";

function Header() {
  const navigate = useNavigate();
  const {
    notifications,
    notifyOpen,
    toggleNotify,
    markNotificationRead,
    clearNotifications,
  } = useSocketStore();
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        if (notifyOpen) toggleNotify();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifyOpen, toggleNotify]);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-4 flex justify-between items-center 
                        bg-transparent backdrop-blur-sm border-b border-white/10 transition-all duration-300"
    >
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <h1 className="text-[#996244] text-xl md:text-2xl font-black tracking-tighter">
          RENT<span className="text-[#231a13]">CARS</span>
        </h1>
      </div>

      <div className="flex items-center gap-4 md:gap-10 relative">
        <div className="relative" ref={notificationRef}>
          <button
            className={`group relative p-2 rounded-xl transition-all duration-200 ${
              notifyOpen ? "bg-[#996244]" : "hover:bg-white/5"
            }`}
            onClick={toggleNotify}
          >
            <Bell
              className={`w-5 h-5 transition-colors duration-200 ${
                notifications.length > 0 ? "animate-swing" : ""
              } ${
                notifyOpen
                  ? "text-white"
                  : "text-[#996244] group-hover:text-[#cd9a65]"
              }`}
            />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-[#0F172A] rounded-full" />
            )}
          </button>
          {notifyOpen && (
            <div className="absolute right-0 mt-3 w-72 sm:w-80 bg-white border border-white/30 shadow-2xl rounded-2xl z-50 overflow-hidden transform origin-top-right transition-all">
              <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h3 className="font-bold text-black text-sm">Notifications</h3>
                <span className="text-[10px] bg-[#F5B754] text-black px-2 py-0.5 rounded-full font-bold">
                  {notifications.length} New
                </span>
              </div>
              <div className="max-h-[350px] overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-medium">
                      No new alerts
                    </p>
                  </div>
                ) : (
                  notifications.map((n, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex gap-3 text-white"
                      onClick={() => {
                        const nid = n.id || n._id;
                        if (nid) markNotificationRead(nid);
                        toggleNotify();
                        navigate("/dashboard");
                      }}
                    >
                      <div className="mt-0.5">
                        {n.type === "request" ? (
                          <Clock className="w-4 h-4 text-[#F5B754]" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {n.type === "request" ? (
                            <>
                              New booking request for{" "}
                              <span className="font-bold text-[#F5B754]">
                                {n.carName || "a car"}
                              </span>
                            </>
                          ) : (
                            <>
                              Your booking for{" "}
                              <span className="font-bold text-white">
                                {n.carName}
                              </span>{" "}
                              is{" "}
                              <span className="text-green-400 font-bold">
                                {n.status}
                              </span>
                            </>
                          )}
                        </p>
                        <span className="text-[10px] text-slate-500 mt-1 block">
                          Just now
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="w-full py-3 text-[11px] text-[#F5B754] font-bold hover:bg-white/5 transition-colors border-t border-white/5"
                >
                  Clear all notifications
                </button>
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/Auth")}
          className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black hover:text-[#F5B754] transition-all"
        >
          <span className="text-sm">←</span> Login
        </button>

        <div className="flex items-center gap-5 border-l border-white/10 pl-6">
          <button
            className="text-[10px] font-black uppercase tracking-[0.2em] text-black hover:text-[#F5B754] transition-colors"
            onClick={() => navigate("/store")}
          >
            Store
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
