/* eslint-disable react/prop-types */
import { Moon, Sun } from "lucide-react"


export default function Header2({ isDarkMode, setIsDarkMode}) {
  return (
    <header className="border-b dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
        <h1 className="text-2xl md:text-4xl font-bold dark:text-white">
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">Re</span>Solve.
        </h1>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            {isDarkMode ? <Moon className="w-5 h-5 dark:text-gray-400" /> : <Sun className="w-5 h-5 text-gray-600" />}
          </button>
        </div>
      </div>
    </header>
  )
}

