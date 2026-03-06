import React, { useState } from 'react';
import { Mail, Lock, ShieldCheck, Key, Camera, X, LogOut, Trash2 } from 'lucide-react';
import useUserStore from '../Store/useUserStore';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const navigate = useNavigate();
  const { user, updatePassword, logout, deleteAccount, isLoading } = useUserStore();

  const [showPopup, setShowPopup] = useState(false);
  const [passData, setPassData] = useState({ oldPassword: '', newPassword: '' });

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("token")
    navigate("/Auth"); 
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure? This will permanently delete your account.")) {
      const res = await deleteAccount();
      if (res.success)
          localStorage.removeItem("token")
          navigate("/");
    }
  };

  const handleUpdatePass = async (e) => {
    e.preventDefault();
    const res = await updatePassword(passData);
    alert(res.message);
    if (res.success) setPassData({ oldPassword: '', newPassword: '' });
  };

  return (
    <div className="mx-auto space-y-6 pb-10 px-4">
      <div className="bg-white p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img 
            src={user?.profilePic || "https://ui-avatars.com/api/?name=" + user?.name} 
            alt="Profile" 
            className="w-20 h-20 rounded-2xl object-cover border-2 border-[#ecd1af]/20"
          />
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold text-gray-900 uppercase">{user?.name || "User Name"}</h2>
          <p className="text-sm text-[#935732] flex items-center gap-2">
            <Mail className="w-3 h-3" /> {user?.email || "email@example.com"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-[#935732]">Quick Reset</h3>
          </div>
          <p className="text-xs text-gray-500 mb-4 flex-grow">
            System will send a random strong password to your email.
          </p>
          <button 
            onClick={() => setShowPopup(true)} 
            className="w-fit px-4 py-2 bg-[#935732] text-white text-sm rounded-xl font-bold hover:bg-black transition-all flex items-center gap-2"
          >
            <Key className="w-3.5 h-3.5" /> Send Reset Email
          </button>
        </div>
        <div className="bg-white p-5">
          <div className="flex items-center gap-3 mb-3">
            <Lock className="w-5 h-5 text-[#ecd1af]" />
            <h3 className="font-bold text-[#935732]">Manual Change</h3>
          </div>
          <form className="space-y-2" onSubmit={handleUpdatePass}>
            <input 
              type="password" placeholder="Old Password" required
              value={passData.oldPassword}
              onChange={(e) => setPassData({...passData, oldPassword: e.target.value})}
              className="text-black w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ecd1af]"
            />
            <input 
              type="password" placeholder="New Password" required
              value={passData.newPassword}
              onChange={(e) => setPassData({...passData, newPassword: e.target.value})}
              className="text-black w-full px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#ecd1af]"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="w-fit px-4 py-2 bg-[#935732] text-white text-sm rounded-xl font-bold hover:bg-[#ecd1af] transition-all disabled:opacity-50"
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
      <div className="bg-white p-6">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Account Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
          <button 
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all"
          >
            <Trash2 className="w-4 h-4" /> Delete Account
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-white border border-green-500 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
          <Mail className="w-4 h-4 text-green-600" />
          <p className="text-xs font-bold text-gray-800">Password request sent!</p>
          <button onClick={() => setShowPopup(false)}><X className="w-3 h-3 text-gray-400" /></button>
        </div>
      )}
    </div>
  );
}

export default Settings;