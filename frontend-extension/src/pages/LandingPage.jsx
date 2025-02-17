"use client"

import { useRecoilState } from "recoil"
import Header from "@/components/header"
import Hero from "@/components/Hero"
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
      </div>
      </div>
    </div>
  )
}