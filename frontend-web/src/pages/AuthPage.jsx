import { LoginCard } from "@/components/AuthCard";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "@/store/atoms/darkMode";
import Header2 from "@/components/Header2";

export default function AuthPage() {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <div className="dark:bg-gray-950 min-h-screen">
                {/* Pass dark mode toggle to Header */}
                <Header2 isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

                {/* Pass dark mode state to LoginCard */}
                <LoginCard isDarkMode={isDarkMode} />
            </div>
        </div>
    );
}