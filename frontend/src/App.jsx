import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center flex-col gap-6">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
        Student Management Portal
      </h1>
      <p className="text-lg text-gray-300">
        TailwindCSS is successfully integrated!
      </p>
      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg font-semibold shadow-lg shadow-blue-500/30">
        Get Started
      </button>
    </div>
  )
}

export default App
