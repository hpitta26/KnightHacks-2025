import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BentoGrid from '../components/BentoGrid';

function Dashboard({isDark, setIsDark}) {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto bg-gray-50 dark:bg-[#0a0a0a]">
                <BentoGrid />
            </main>
        </div>
    </div>
  );
}

export default Dashboard;

