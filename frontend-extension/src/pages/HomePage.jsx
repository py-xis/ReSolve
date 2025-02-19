import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkModeAtom } from "@/store/atoms/darkMode";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Chrome } from "lucide-react";

export default function HomePage(){
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);

    useEffect(() => {   
        async function fetchToken() {
        // Defining a function to get the cookies stored by the frontend.
            function getCookie(name, url){
                return new Promise((resolve, reject) => {
                    chrome.cookies.get({ url, name }, (cookie) => {
                        if(cookie){
                            resolve(cookie.value);
                        } else {
                            reject("Cookie not found");
                        }
                    });
                });
            }
            const token = await getCookie("firebaseAuthToken", "http://localhost:5173");
            const userId = await getCookie("userId", "http://localhost:5173");

            if(token && userId){
                localStorage.setItem("authToken", token);
                localStorage.setItem("uid", userId);
                navigate("/problem");
            }
        }

        
        fetchToken();

    }, []);

        

  return (
    <div className={`${isDarkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-950">
        <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} signedIn={false}/>
        <main className="container mx-auto px-4 py-16">
          <Hero />
        </main>
        <div className="flex justify-center items-center">
          <Button className="px-6 py-3 text-lg font-semibold rounded-lg" onClick={() => window.open("http://localhost:5173", "_blank")}>
            <Chrome className="w-6 h-6" /> {/* Increase icon size */}
            <span className="ml-2">Please Sign in on the webpage to get started</span>
          </Button>
      </div>
      </div>
    </div>
  )
}