import useDashboardData from "@/hooks/useDashboardData";
import { darkModeAtom } from "@/store/atoms/darkMode";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect } from "react";
import { userAtom } from "@/store/atoms/userDetails";
import { problemsAtom } from "@/store/atoms/problems";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);
    const { user, problems, error, tokenExpired} = useDashboardData(localStorage.getItem("authToken"));
    const navigate = useNavigate()
    if(tokenExpired) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("uid");
        navigate("/auth");
        window.location.reload();
    }
    const setUser = useSetRecoilState(userAtom);
    const setProblems = useSetRecoilState(problemsAtom);
    
    useEffect(() => {
        if (user){
            setUser(user.userDetails);
        }
        if (problems) setProblems(problems);
    }, [user, problems, setUser, setProblems]);


    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-950">
                <p className="text-red-500">An error occurred: {error}</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
            <div className="dark:bg-gray-950 min-h-screen">
                <Header 
                    isDarkMode={isDarkMode} 
                    setIsDarkMode={setIsDarkMode} 
                    signedIn={true}  // ✅ Use `user?.profilePicture` directly
                />
                <main className="container mx-auto px-4 py-16">
                    <Hero />
                </main>
                <Problems />
            </div>
        </div>
    );
}