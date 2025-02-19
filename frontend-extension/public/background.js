console.log("background.js loaded");

// Function to fetch user details
const getUserData = async (token, uid) => {
    try {
        const response = await fetch("http://localhost:3000/api/v1/user/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "userid": uid,
                "Content-Type": "application/json",
            }
        });

        if (response.status === 403) {
            return { userDetails: null, error: "Token Expired", tokenExpired: true };
        }

        const userData = await response.json();
        return { userDetails: userData, error: null, tokenExpired: false };

    } catch (err) {
        return { userDetails: null, error: err.message, tokenExpired: false };
    }
};

// Function to add a problem to the list
async function addProblem(problemData, userId, token) {
    console.log(problemData);
    try {
        // Get user credentials from localStorage
        

        if (!userId || !token) {
            throw new Error("Missing authentication credentials.");
        }

        const problem = {
            title: problemData.problemTitle,
            platform: problemData.platform,
            link: problemData.link,
            difficulty: problemData.rating || problemData.difficulty,
            tags: problemData.tags,
        }
        console.log(problem);

        const response = await fetch("http://localhost:3000/api/v1/problem/addProblem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "userId": userId
            },
            body: JSON.stringify(problem)
        });
    
        // Handle response
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to add problem: ${errorData.message}`);
        }

        const result = await response.json();
        return { success: true, message: "Problem added successfully" };

    } catch (error) {
        console.error("Error adding problem:", error.message);
        return { success: false, message: error.message };
    }
}

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetch_problem_details") {

        // Forward the request to the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.tabs.sendMessage(tabs[0].id, { action: "extract_page_info" }, (response) => {
                    sendResponse(response);
                });
            }
        });

        return true; // Required to keep sendResponse() async
    }

    // New action: Fetch user details
    if (message.action === "get_user_details") {

        if (!message.token || !message.uid) {
            sendResponse({ error: "No token or user ID provided", userDetails: null, tokenExpired: false });
            return true;
        }

        getUserData(message.token, message.uid).then((data) => {
            sendResponse(data);
        });

        return true; // Required for async `sendResponse`
    }

    // New action: Add problem to user's list
    if (message.action === "add_problem_to_list") {

        if (!message.problem) {
            sendResponse({ success: false, message: "No problem data provided" });
            return true;
        }
        if (!message.userId) {
            sendResponse({ success: false, message: "No userId data provided" });
            return true;
        }
        if (!message.token) {
            sendResponse({ success: false, message: "No token data provided" });
            return true;
        }

        addProblem(message.problem, message.userId, message.token).then((data) => {
            sendResponse(data);
        });

        return true; // Required for async `sendResponse`
    }
});