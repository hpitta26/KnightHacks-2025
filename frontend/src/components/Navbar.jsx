import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { Link } from 'react-router-dom';

function Navbar({ isDark, setIsDark }) {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My App
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition text-gray-700 dark:text-gray-200 cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <HiOutlineSun className="w-5 h-5" />
              ) : (
                <HiOutlineMoon className="w-5 h-5" />
              )}
            </button>

            {/* Login / Signup Button */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
            >
              Login / Signup
            </Link>

            {/* Dashboard Button */}
            <Link
              to="/"
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition font-medium"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;