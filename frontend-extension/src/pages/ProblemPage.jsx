import Header from "@/components/Header";
import { useEffect } from "react";
import { darkModeAtom } from "@/store/atoms/darkMode";
import { useRecoilState } from "recoil";
import { userAtom } from "@/store/atoms/userDetails";
import { useSetRecoilState } from "recoil";
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import { CircleCheckBig } from 'lucide-react';
import { useState } from "react";

export default function ProblemPage() {
    const [isDarkMode, setIsDarkMode] = useRecoilState(darkModeAtom);
    const setUserDetails = useSetRecoilState(userAtom);
    const [problem, setProblem] = useState({});
    const [problemStatus, setProblemStatus] = useState("Add to your list");
    const [problemSuccess, setProblemSuccess] = useState(false);

    useEffect(() => {
        // Send message to background script as soon as the component loads
        const token = localStorage.getItem("authToken");
        const uid = localStorage.getItem("uid");
        chrome.runtime.sendMessage({ action: "get_user_details", token, uid }, (response) => {
            setUserDetails(response.userDetails.userDetails);
        });
        
        chrome.runtime.sendMessage({ action: "fetch_problem_details" }, (response) => {
            console.log("Problem details received:", response);
            setProblem(response);

        });
    }, []); // Runs only once when the component mounts

    return (
        <div className={`${isDarkMode ? "dark" : ""}`}>
            <div className="dark:bg-gray-950">
                <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} signedIn={true}/>
                <p className="text-gray-600 dark:text-gray-400 text-2xl">
                    {problem.problemTitle}
                </p>
                <div className="px-4 py-2 pb-2">
                    <Button onClick={() => 
                                            {
                                                const userId = localStorage.getItem("uid");
                                                const token = localStorage.getItem("authToken");
                                                chrome.runtime.sendMessage({ action: "add_problem_to_list", problem, userId, token }, (response) => {
                                                    console.log("Problem added to list:", response);
                                                    if(response.success){
                                                        setProblemStatus("Problem added to your list");
                                                        setProblemSuccess(true);
                                                    }else{
                                                        setProblemStatus("Failed to add problem");
                                                        setProblemSuccess(false);
                                                    }
                                                });
                                            }
                                    } 
                        className="text-md font-semibold rounded-lg">
                            {!problemSuccess && <CirclePlus />}
                            {problemSuccess && <CircleCheckBig />}
                            {problemStatus}
                    </Button>
                </div>
            </div>
        </div>
    );
}