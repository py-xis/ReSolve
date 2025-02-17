"use client"

import { useRecoilState } from "recoil"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import { Chrome } from 'lucide-react';
import { Button } from "../components/ui/button";
import { darkModeAtom } from "@/store/atoms/darkMode";

export default function LandingPage() {
  const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-950 min-h-screen">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} signedIn={false}/>
        <main className="container mx-auto px-4 py-16">
          <Hero />
        </main>
        <div className="flex justify-center items-center">
          <Button className="px-6 py-3 text-lg font-semibold rounded-lg" onClick={() => window.open("https://google.com", "_blank")}>
            <Chrome className="w-6 h-6" /> {/* Increase icon size */}
            <span className="ml-2">Get the Chrome Extension</span>
          </Button>
      </div>
      </div>
    </div>
  )
}