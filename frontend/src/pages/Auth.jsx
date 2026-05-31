import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, GraduationCap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const { login, signup, loading, error } = useAuth();
  const navigate = useNavigate();

  // Shared form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(fullName, email, password);
      }
      navigate('/');
    } catch (err) {
      // Error handled in context
    }
  };

  // Animation variants
  const formVariants = {
    initial: (isLogin) => ({
      opacity: 0,
      x: isLogin ? -50 : 50,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 }
    },
    exit: (isLogin) => ({
      opacity: 0,
      x: isLogin ? 50 : -50,
      transition: { duration: 0.3, ease: 'easeIn' }
    })
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans overflow-hidden">
      
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-slate-950 overflow-hidden items-center justify-center">
        {/* Dynamic Gradient Background */}
        <motion.div 
          className="absolute inset-0 opacity-80"
          initial={false}
          animate={{
            background: isLogin 
              ? 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)' 
              : 'linear-gradient(135deg, #0f172a 0%, #042f2e 100%)'
          }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+Cjwvc3ZnPg==')] opacity-30"></div>

        {/* Ambient Animated Orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-[20%] -left-[10%] w-96 h-96 rounded-full mix-blend-screen filter blur-[100px] opacity-40 ${isLogin ? 'bg-blue-600' : 'bg-teal-500'}`}
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className={`absolute -bottom-[20%] -right-[10%] w-[30rem] h-[30rem] rounded-full mix-blend-screen filter blur-[120px] opacity-30 ${isLogin ? 'bg-purple-600' : 'bg-emerald-500'}`}
        />

        {/* Content Container */}
        <div className="relative z-20 p-16 flex flex-col justify-center h-full max-w-xl w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login-text' : 'signup-text'}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col"
            >
              {/* Glassmorphic Icon */}
              <div className="mb-12 inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 shadow-2xl self-start">
                {isLogin ? (
                  <ShieldCheck size={36} className="text-blue-400" strokeWidth={1.5} />
                ) : (
                  <GraduationCap size={36} className="text-teal-400" strokeWidth={1.5} />
                )}
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                {isLogin ? (
                  <>Govern your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">institution</span>.</>
                ) : (
                  <>Build the <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">foundation</span>.</>
                )}
              </h1>
              
              <p className="text-lg text-slate-400 leading-relaxed max-w-md font-medium">
                {isLogin 
                  ? "A hyper-fast, brutally minimalist portal to command your academic structure and manage thousands of students securely."
                  : "Deploy the ultimate administrative environment. Configure your taxonomy and onboard your staff in seconds."}
              </p>
            </motion.div>
          </AnimatePresence>
          
          <div className="mt-auto pt-20">
            <div className="flex items-center gap-4 text-xs tracking-widest uppercase text-slate-500 font-semibold">
              <div className="h-px bg-slate-800 flex-1"></div>
              <span>{isLogin ? "System v2.0 Online" : "Secure Registration"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Container */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-32 bg-slate-50 lg:bg-white relative">
        
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2 text-slate-900 font-bold text-xl">
          {isLogin ? <ShieldCheck className="text-blue-600" /> : <GraduationCap className="text-teal-600" />}
          <span>AdminPortal</span>
        </div>

        <div className="mx-auto w-full max-w-md relative">
          
          <AnimatePresence mode="wait" custom={isLogin}>
            <motion.div
              key={isLogin ? 'login-form' : 'signup-form'}
              custom={isLogin}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <div className="mb-10 text-center lg:text-left">
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tight text-slate-900">
                  {isLogin ? 'Welcome back' : 'Create an account'}
                </motion.h2>
                <motion.p variants={itemVariants} className="mt-2 text-sm text-slate-500">
                  {isLogin ? 'Please enter your details to sign in.' : 'Enter your details to get started.'}
                </motion.p>
              </div>

              <div className="bg-white lg:bg-transparent py-8 px-6 lg:p-0 shadow-xl shadow-slate-200/50 lg:shadow-none border border-slate-100 lg:border-none rounded-2xl">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  {error && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-red-50/80 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center">
                      {error}
                    </motion.div>
                  )}

                  {!isLogin && (
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium leading-6 text-slate-700">Full Name</label>
                      <div className="mt-2">
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className={`block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6 transition-shadow bg-slate-50/50 focus:bg-white`}
                          placeholder="John Doe"
                        />
                      </div>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium leading-6 text-slate-700">Email address</label>
                    <div className="mt-2">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset ${isLogin ? 'focus:ring-blue-600' : 'focus:ring-teal-600'} sm:text-sm sm:leading-6 transition-shadow bg-slate-50/50 focus:bg-white`}
                        placeholder="admin@example.com"
                      />
                    </div>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium leading-6 text-slate-700">Password</label>
                    <div className="mt-2">
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`block w-full rounded-xl border-0 py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset ${isLogin ? 'focus:ring-blue-600' : 'focus:ring-teal-600'} sm:text-sm sm:leading-6 transition-shadow bg-slate-50/50 focus:bg-white`}
                        placeholder="••••••••"
                      />
                    </div>
                  </motion.div>

                  {isLogin && (
                    <motion.div variants={itemVariants} className="flex items-center justify-between !mt-6">
                      <div className="flex items-center">
                        <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600 cursor-pointer" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600 cursor-pointer">Remember me</label>
                      </div>
                      <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">Forgot password?</a>
                    </motion.div>
                  )}

                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={loading}
                    className={`group flex w-full justify-center items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-70 transition-all duration-200 shadow-md ${!isLogin ? 'mt-6' : ''}`}
                  >
                    {loading ? (isLogin ? 'Signing in...' : 'Creating account...') : (isLogin ? 'Sign in' : 'Create account')}
                    {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                  </motion.button>
                </form>

                <motion.p variants={itemVariants} className="mt-10 text-center lg:text-left text-sm text-slate-500">
                  {isLogin ? (
                    <>Don't have an account? <Link to="/signup" className="font-semibold leading-6 text-blue-600 hover:text-blue-500 transition-colors">Create one now</Link></>
                  ) : (
                    <>Already have an account? <Link to="/login" className="font-semibold leading-6 text-teal-600 hover:text-teal-500 transition-colors">Sign in instead</Link></>
                  )}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default Auth;
