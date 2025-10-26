import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { FiLogOut } from 'react-icons/fi';

function ProfileModal({ isOpen, onClose, setIsLoggedIn }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleLogout = () => {
    // Clear authentication state
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    
    // Navigate to login page
    navigate('/login');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 z-50" ref={modalRef}>
      <div className="rounded-lg bg-white dark:bg-[#141414] shadow-lg border border-gray-200 dark:border-[#38393c] overflow-hidden">
        {/* User Info Section */}
        <div className="px-4 py-3 border-b border-gray-200 dark:border-[#38393c]">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Signed in as
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            johndoe@example.com
          </p>
        </div>
        
        {/* Logout Button */}
        <div className="py-1">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <div className="flex items-center">
              <FiLogOut className="w-4 h-4 mr-3" />
              Sign out
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;

