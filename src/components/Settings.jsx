import React, { useState } from 'react';
import { User, Mail, Lock, ShieldCheck, Key, Camera, X } from 'lucide-react';

function Settings() {
  const [showPopup, setShowPopup] = useState(false);

  // User details (Dummy)
  const user = {
    name: "Admin User",
    email: "admin@rentcars.com",
    profilePic: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop"
  };

  const handleAutoPassword = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 4000); // 4 sec baad popup khud band ho jaye
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-24 md:pb-8">
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            <img 
              src={user.profilePic} 
              alt="Profile" 
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-[#ecd1af]/20"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-xl shadow-lg border border-gray-100 text-gray-600 hover:text-[#ecd1af] transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-gray-500 flex items-center justify-center sm:justify-start gap-2 mt-1">
              <Mail className="w-4 h-4" /> {user.email}
            </p>
            <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
              <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-lg border border-green-100">Verified Account</span>
              <span className="px-3 py-1 bg-[#ecd1af]/10 text-[#c5a884] text-xs font-bold rounded-lg border border-[#ecd1af]/20">Super Admin</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Option 1: Quick Reset */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Quick Reset</h3>
            <p className="text-sm text-gray-500 mt-2">
              System will generate a strong random password and send it to your registered Gmail account.
            </p>
          </div>
          <button 
            onClick={handleAutoPassword}
            className="mt-6 w-full py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <Key className="w-4 h-4" /> Send New Password
          </button>
        </div>

        {/* Option 2: Manual Update */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-12 h-12 bg-[#ecd1af]/10 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-[#ecd1af]" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Manual Change</h3>
          <form className="mt-4 space-y-3" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="password" 
              placeholder="Current Password" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ecd1af]/50"
            />
            <input 
              type="password" 
              placeholder="New Password" 
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#ecd1af]/50"
            />
            <button className="w-full py-3 bg-[#ecd1af] text-white rounded-2xl font-bold hover:bg-[#dab890] transition-all">
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[200] animate-bounce-in">
          <div className="bg-white border-2 border-green-500 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Email Sent!</p>
              <p className="text-xs text-gray-500">Your new password is sent to <span className="font-semibold">{user.email}</span></p>
            </div>
            <button onClick={() => setShowPopup(false)} className="ml-4">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;