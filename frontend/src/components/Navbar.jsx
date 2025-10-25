import { useState } from 'react';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import ProfileModal from './modals/ProfileModal';

function Navbar({ isDark, setIsDark }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-[#38393c] shadow-sm">
      <div className="max-w-8xl mx-auto py-3 px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <img 
              src="/noun-globalization-7433299.svg" 
              alt="FinTerra Logo" 
              className="w-8 h-8 brightness-0 opacity-70 dark:brightness-0 dark:invert dark:opacity-80"
            />
            <h1 className="text-2xl font-semibold text-[#28ce78]">
              FinTerra
            </h1>
          </div>
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg transition text-gray-700 hover:text-[#28ce78] dark:text-gray-200 dark:hover:text-[#28ce78] cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <HiOutlineSun className="w-6 h-6" />
              ) : (
                <HiOutlineMoon className="w-6 h-6" />
              )}
            </button>

            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-lg bg-[#28ce78] hover:bg-[#22b869] text-white font-semibold flex items-center justify-center transition cursor-pointer"
                aria-label="Profile menu"
              >
                J
              </button>
              <ProfileModal 
                isOpen={isProfileOpen} 
                onClose={() => setIsProfileOpen(false)} 
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;