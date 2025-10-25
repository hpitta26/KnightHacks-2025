import Navbar from '../components/Navbar';

function Dashboard({isDark, setIsDark}) {
  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className="flex-1 flex items-center justify-center">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white">
                Welcome to Your App
            </h2>
        </main>
    </div>
  );
}

export default Dashboard;

