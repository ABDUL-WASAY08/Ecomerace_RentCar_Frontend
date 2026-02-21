import React from 'react';
import { Instagram, Github, Linkedin } from 'lucide-react';
function Footer() {
    return (
        <footer className='mt-15 min-h-20 bg-white border-t border-gray-100 flex flex-col items-center justify-center p-6'>
            <div className='flex items-center gap-8'>
                <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 transition-all duration-300 transform hover:scale-110"
                >
                    <Instagram size={24} />
                </a>
                <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                    <Github size={24} />
                </a>
                <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-700 transition-all duration-300 transform hover:scale-110"
                >
                    <Linkedin size={24} />
                </a>
            </div>
            <p className='text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold'>
                © 2026 Rent A Car. All Rights Reserved.
            </p>
        </footer>
    );
}

export default Footer;