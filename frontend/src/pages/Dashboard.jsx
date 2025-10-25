import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function Dashboard({isDark, setIsDark}) {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center overflow-auto">
                {/* Centered Welcome Text */}
                <h2 className="text-5xl font-extrabold text-[#28ce78]">
                    Welcome to Your App
                </h2>
            </main>
        </div>
    </div>
  );
}

export default Dashboard;

