import Navbar from '../components/Navbar';

function Dashboard({isDark, setIsDark}) {
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#141414]">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className="flex-1 flex items-center justify-center">
            {/* Centered Welcome Text */}
            <h2 className="text-5xl font-extrabold text-[#28ce78]">
                Welcome to Your App
            </h2>
        </main>
    </div>
  );
}

export default Dashboard;

