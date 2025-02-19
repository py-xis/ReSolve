console.log("Loaded content.js");
/**
 * Extracts problem details from AtCoder
 * @returns {Object} Problem details including ID, title, and contest name
 */
function extractAtCoderDetails() {
    const url = window.location.href;
    const problemIdMatch = url.match(/contests\/(.+?)\/tasks\/(.+?)/);
    const titleElement = document.querySelector('.h2');
    const contestElement = document.querySelector('.contest-title');

    return {
        platform: "AtCoder",
        problemId: problemIdMatch ? problemIdMatch[2] : "Unknown",
        problemTitle: titleElement ? titleElement.innerText.trim().split(' - ')[1] : "Unknown",
        link: url,
        contestName: contestElement ? contestElement.innerText.trim() : "Unknown",
        tags: [],
        difficulty: "Unknown"
    };
}

function extractCodeforcesDetails() {
    const url = window.location.href;
    const problemIdMatch = url.match(/problemset\/problem\/(\d+)\/(\w+)/) ||
                          url.match(/contest\/(\d+)\/problem\/(\w+)/);

    const tagElements = document.querySelectorAll('.tag-box');
    const tags = [];
    let rating = "Unknown";

    tagElements.forEach(tagElement => {
        if (tagElement.getAttribute('title') === "Difficulty") {
            rating = tagElement.innerText.trim();
        } else {
            tags.push(tagElement.innerText.trim());
        }
    });

    return {
        platform: "Codeforces",
        problemId: problemIdMatch ? `${problemIdMatch[1]}-${problemIdMatch[2]}` : "Unknown",
        problemTitle: document.querySelector('.title')?.innerText.trim() || "Unknown",
        link: url,
        tags,
        rating
    };
}

function extractLeetCodeDetails() {
    const url = window.location.href;
    const problemId = url.split("/problems/")[1]?.split("/")[0] || "Unknown";
    const tagElements = document.querySelectorAll('a[href*="/tag/"]');
    const difficultyElement = document.querySelector('div[class*="difficulty-"]');

    return {
        platform: "LeetCode",
        problemId,
        problemTitle: problemId,
        link: url,
        tags: Array.from(tagElements).map(tag => tag.innerText.trim()),
        difficulty: difficultyElement ? difficultyElement.innerText.trim() : "Unknown"
    };
}

function extractProblemDetails() {
    const url = window.location.href;
    
    if (url.includes("codeforces.com")) {
        return extractCodeforcesDetails();
    } 
    
    if (url.includes("leetcode.com")) {
        return extractLeetCodeDetails();
    }
    
    if (url.includes("atcoder.jp")) {
        return extractAtCoderDetails();
    }
    
    console.log("This website is not supported.");
    return null;
}

// extractProblemDetails();

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "extract_page_info") {
        const problemDetails = extractProblemDetails();
        sendResponse(problemDetails);
    }
});
