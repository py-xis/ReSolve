import { useState, useEffect } from "react";
import axios from "axios";

const useDashboardData = (token) => {
    const [user, setUser] = useState(null);
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);
    let tokenExpired = false;

    useEffect(() => {
        if (!token) {
            setError("Unauthorized: No token provided");
            return;
        }

        const fetchData = async () => {
            try {

                // Fetch User Details
                const userResponse = await axios.get("http://localhost:3000/api/v1/user/", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userid: localStorage.getItem("uid"),
                        "Content-Type": "application/json",
                    },
                });

                // Fetch Problems
                const problemResponse = await axios.get("http://localhost:3000/api/v1/problem/getProblems", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        userId: localStorage.getItem("uid"),
                        "Content-Type": "application/json",
                    },
                });
                
                
                if(problemResponse.status === 403 || userResponse.status === 403) {
                    tokenExpired = true;
                    setError("Token Expired");
                    return;
                }

                setUser(userResponse.data);
                setProblems(Array.isArray(problemResponse.data.problems) ? problemResponse.data.problems : []);

            } catch (err) {
                setError(err.response?.data?.message || "An error occurred");
            }
        };

        fetchData();
    }, [token]); // ✅ Only runs when `token` changes

    return { user, problems, error, tokenExpired};
};

export default useDashboardData;