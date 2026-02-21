import React from 'react'

function Header() {
    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6  md:px-12 flex justify-between items-center 
                        bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm transition-all duration-300">

            {/* 1. BRAND LOGO */}
            <div className="w-10 h-10 md:w-16 md:h-16 flex items-center justify-center overflow-hidden">
                <h1 className="text-2xl font-bold text-blue-900">RENT</h1>
            </div>

            <div className="flex items-center gap-6 md:gap-10">
                <a href="/" className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:text-blue-900 transition-all">
                    <span>←</span> Back to Website
                </a>
                
                <div className="flex items-center gap-4 border-l border-black/20 pl-6">
                    <button className="text-xs font-bold uppercase tracking-widest text-black hover:text-blue-900">
                        Help
                    </button>
                    <div className="cursor-pointer text-black hover:text-blue-900">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header