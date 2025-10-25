import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [tab, setTab] = useState("login");

  return (
    <div className="min-h-screen grid place-items-center bg-white dark:bg-[#141414] p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-[#28ce78]">Welcome</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{tab === "login" ? "Sign in to your account" : "Create your account"}</p>
        </div>

        {/* Tabs */}
        <div className="flex rounded-2xl bg-gray-100 dark:bg-[#1a1a1a] shadow-sm border border-gray-200 dark:border-[#38393c] overflow-hidden">
          <button
            className={`flex-1 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28ce78] ${
              tab === "login"
                ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setTab("login")}
            aria-current={tab === "login"}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#28ce78] ${
              tab === "signup"
                ? "bg-white dark:bg-[#141414] text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
            onClick={() => setTab("signup")}
            aria-current={tab === "signup"}
          >
            Sign Up
          </button>
        </div>

        <div className="mt-4">
          {tab === "login" ? <LoginForm /> : <SignupForm switchToLogin={() => setTab("login")} />}
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing you agree to our <a href="#" className="text-[#28ce78] underline decoration-dotted underline-offset-2 hover:decoration-solid">Terms</a> and <a href="#" className="text-[#28ce78] underline decoration-dotted underline-offset-2 hover:decoration-solid">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    // Dummy login logic - check for specific credentials
    if (email === "johndoe@example.com" && password === "dev1234567") {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      navigate("/");
    } else {
      setErrors("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-sm border border-gray-200 dark:border-[#38393c] p-6 space-y-4">
      {errors && (
        <div className="rounded-xl border border-red-200/60 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300 px-4 py-2 text-sm">
          {errors}
        </div>
      )}

      <Field label="Email" htmlFor="email">
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Password" htmlFor="password">
        <div className="relative">
          <input
            id="password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 pr-10 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 dark:border-[#38393c] text-[#28ce78] focus:ring-[#28ce78]"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-[#28ce78] hover:underline">Forgot password?</a>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-[#28ce78]/30 text-gray-900 dark:text-white py-2 font-medium shadow-sm hover:bg-[#28ce78]/10 hover:border-[#28ce78]/50 focus:outline-none focus:ring-2 focus:ring-[#28ce78] disabled:opacity-70 disabled:cursor-not-allowed transition"
      >
        {loading ? "Signing in…" : "Sign In"}
      </button>

      <Divider text="OR" />

      <button
        type="button"
        className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] py-2 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
      >
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => {
          setEmail("johndoe@example.com");
          setPassword("dev1234567");
        }}
        className="w-full text-[#28ce78] text-sm cursor-pointer underline hover:text-[#22b869]"
      >
        Fill Credentials
      </button>
    </form>
  );
}

function SignupForm({ switchToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      setLoading(true);
      // TODO: Replace with your API call
      await new Promise((res) => setTimeout(res, 900));
      alert(`Account created for ${name}! Check your inbox to verify.`);
      switchToLogin();
    } catch (err) {
      setErrors("Could not create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-white dark:bg-[#1a1a1a] shadow-sm border border-gray-200 dark:border-[#38393c] p-6 space-y-4">
      {errors && (
        <div className="rounded-xl border border-red-200/60 bg-red-50 text-red-700 dark:border-red-500/40 dark:bg-red-950/40 dark:text-red-300 px-4 py-2 text-sm">
          {errors}
        </div>
      )}

      <Field label="Full Name" htmlFor="name">
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
          placeholder="Ada Lovelace"
          autoComplete="name"
        />
      </Field>

      <Field label="Email" htmlFor="signup-email">
        <input
          id="signup-email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </Field>

      <Field label="Password" htmlFor="signup-password">
        <div className="relative">
          <input
            id="signup-password"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 pr-10 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
            placeholder="At least 8 characters"
            autoComplete="new-password"
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-2 my-auto h-8 rounded-md px-2 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
      </Field>

      <Field label="Confirm Password" htmlFor="confirm">
        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full rounded-xl border border-gray-300 dark:border-[#38393c] bg-white dark:bg-[#141414] px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 outline-none focus:ring-2 focus:ring-[#28ce78]"
          placeholder="Re-enter password"
          autoComplete="new-password"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
        <input
          type="checkbox"
          className="mt-0.5 h-4 w-4 rounded border-gray-300 dark:border-[#38393c] text-[#28ce78] focus:ring-[#28ce78]"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <span>
          I agree to the <a href="#" className="font-medium text-[#28ce78] underline decoration-dotted underline-offset-2 hover:decoration-solid">Terms</a> and <a href="#" className="font-medium text-[#28ce78] underline decoration-dotted underline-offset-2 hover:decoration-solid">Privacy Policy</a>.
        </span>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-[#28ce78]/30 text-gray-900 dark:text-white py-2 font-medium shadow-sm hover:bg-[#28ce78]/10 hover:border-[#28ce78]/50 focus:outline-none focus:ring-2 focus:ring-[#28ce78] disabled:opacity-70 disabled:cursor-not-allowed transition"
      >
        {loading ? "Creating account…" : "Create Account"}
      </button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-300">
        Already have an account?{" "}
        <button type="button" onClick={switchToLogin} className="font-medium text-[#28ce78] hover:underline">
          Sign in
        </button>
      </p>
    </form>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <div className="space-y-2">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 dark:text-gray-200">
        {label}
      </label>
      {children}
    </div>
  );
}

function Divider({ text }) {
  return (
    <div className="relative my-2">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-200 dark:border-[#38393c]" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white dark:bg-[#1a1a1a] px-3 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">{text}</span>
      </div>
    </div>
  );
}
