import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BentoGrid from '../components/BentoGrid';
import { useConsultation } from '../contexts/ConsultationContext';
import { IoWarning } from "react-icons/io5";

function Dashboard({isDark, setIsDark, setIsLoggedIn}) {
  const { startConsultation } = useConsultation();

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar 
          isDark={isDark} 
          setIsDark={setIsDark} 
          setIsLoggedIn={setIsLoggedIn}
          onStartConsultation={startConsultation}
        />
        <div className="flex flex-1 overflow-hidden">
            {/* Mobile/Tablet unsupported message */}
            <div className="lg:hidden flex items-center justify-center flex-1 bg-gray-50 dark:bg-[#0a0a0a]">
                <div className="text-center p-8 max-w-md mx-auto">
                    <IoWarning className="text-6xl mb-6 text-gray-700 dark:text-gray-200 mx-auto" />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                        Smaller screens not supported
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Please use a desktop or laptop
                    </p>
                </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:flex flex-1">
                <Sidebar />
                <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0a0a0a]">
                    <BentoGrid />
                </main>
            </div>
        </div>
    </div>
  );
}

export default Dashboard;

