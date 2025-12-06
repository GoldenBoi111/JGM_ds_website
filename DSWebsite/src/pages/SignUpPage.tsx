import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
  return (
    <div className="relative bg-zinc-950 text-white h-full flex items-center justify-center p-4 py-12 sm:py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] sm:w-[120%] sm:h-[120%] lg:w-[80%] lg:h-[80%] bg-gradient-to-br from-purple-900/40 via-zinc-900/0 to-zinc-900/0 rounded-full animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 space-y-6 bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl shadow-purple-900/20">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Create an Account</h1>
          <p className="mt-2 text-zinc-400">Join us and start your journey.</p>
        </div>
        <form className="space-y-6">
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Your Name"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-0 ring-offset-0 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-0 ring-offset-0 focus:border-blue-500"
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800/50 py-2 pl-10 pr-4 text-white placeholder-zinc-400 outline-none ring-0 ring-offset-0 focus:border-blue-500"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2.5 text-white font-semibold shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900">
              Sign Up
            </button>
          </motion.div>
        </form>

        <div className="flex items-center gap-4">
          <div className="h-px w-full bg-zinc-700" />
          <span className="text-zinc-400 text-sm">OR</span>
          <div className="h-px w-full bg-zinc-700" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="w-full flex items-center justify-center gap-2 rounded-md border border-zinc-700 py-2.5 text-white transition-colors hover:bg-zinc-800">
              <FcGoogle className="text-xl" />
              Google
            </button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <button className="w-full flex items-center justify-center gap-2 rounded-md border border-zinc-700 py-2.5 text-white transition-colors hover:bg-zinc-800">
              <FiGithub className="text-xl" />
              GitHub
            </button>
          </motion.div>
        </div>

        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
