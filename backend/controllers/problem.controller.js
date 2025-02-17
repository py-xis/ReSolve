// import Problem from '../models/problem.model.js';
// import UserProblem from '../models/userProblems.model.js';

// export async function addProblem(req, res){
//     const userId = req.userId;
//     const data = req.data;

//     try {
//         const problemExists = await Problem.findOne({
//             name: data.name,
//             platform: data.platform
//         });

//         let status;

//         if (problemExists) {
//             status = await addProblemToUser(userId, problemExists._id); 
//         } else {
//             const problemId = await addProblemToDb(data);
//             status = await addProblemToUser(userId, problemId);
//         }

//         if (status) {
//             return res.status(200).json({ message: "Problem added successfully" });
//         } else {
//             return res.status(500).json({ message: "Error adding problem" });
//         }

//     } catch (error) {
//         console.error("Error in addProblem:", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// }

// async function addProblemToDb(data) {
//     const problem = new Problem({
//         title: data.title,
//         platform: data.platform,
//         link: data.link,
//         difficulty: data.difficulty,
//         tags: data.tags
//     });

//     const savedProblem = await problem.save();
//     return savedProblem._id;
// }

// async function addProblemToUser(userId, problemId) {
//     try {
//         const userProblem = await UserProblem.findOne({ userId: userId });

//         if (userProblem) {
//             userProblem.problemIds.push(problemId); 
//             await userProblem.save();
//         } else {
//             const newUserProblem = new UserProblem({
//                 userId: userId,
//                 problemIds: [problemId] 
//             });
//             await newUserProblem.save();
//         }
//         return true;
//     } catch (err) {
//         console.error("Error in addProblemToUser:", err);
//         return false;
//     }
// }

// export async function getProblems(req, res){
    
//     const userId = req.userId;

//     try{
//         const userProblems = await UserProblem.findOne({ userId: userId });
//         const problems = await Problem.find({ _id: { $in: userProblems.problemIds } });

//         res.status(200).json(problems);
//     }catch(err){
//         console.log(err);
//         res.status(400).json({message: "Error"});
//     }
// }

import Problem from '../models/problem.model.js';
import UserProblem from '../models/userProblems.model.js';

/**
 * Add a Problem to User's List
 */
export async function addProblem(req, res) {
    const userId = req.userId;
    const data = req.data;
    console.log(userId);
    console.log(data);
    try {
        // Check if the problem already exists
        let problem = await Problem.findOne({ title: data.title, platform: data.platform });

        if (!problem) {
            problem = await addProblemToDb(data);
        }

        // Add the problem to the user's problem map (not revisited by default)
        const status = await addProblemToUser(userId, problem._id, false);
        console.log(status);

        if (status) {
            return res.status(200).json({ message: "Problem added successfully" });
        } else {
            return res.status(500).json({ message: "Failed to add problem" });
        }
    } catch (error) {
        console.error("Error in addProblem:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

/**
 * Mark a Problem as Revisited
 */
export async function visitProblem(req, res) {
    const userId = req.userId;
    const problemId = req.problemId;

    try {
        const userProblem = await UserProblem.findOne({ userId });

        if (!userProblem) {
            return res.status(404).json({ message: "No problems found for this user." });
        }

        // ✅ Update the revisited status to true
        userProblem.problems.set(problemId, true);
        await userProblem.save();

        res.status(200).json({ message: "Problem marked as revisited." });
    } catch (error) {
        console.error("Error in visitProblem:", error);
        res.status(500).json({ message: "Error updating revisit status" });
    }
}

/**
 * Mark a Problem as Not Revisited
 */
export async function unvisitProblem(req, res) {
    const userId = req.userId;
    const problemId = req.problemId;

    try {
        const userProblem = await UserProblem.findOne({ userId });

        if (!userProblem) {
            return res.status(404).json({ message: "No problems found for this user." });
        }

        // ✅ Update the revisited status to false
        if (userProblem.problems.has(problemId)) {
            userProblem.problems.set(problemId, false);
            await userProblem.save();
            res.status(200).json({ message: "Problem marked as not revisited." });
        } else {
            res.status(404).json({ message: "Problem not found in user's list." });
        }
    } catch (error) {
        console.error("Error in unvisitProblem:", error);
        res.status(500).json({ message: "Error updating revisit status" });
    }
}

/**
 * Delete a Problem from the User's Problem Map
 */
export async function deleteProblem(req, res) {
    const userId = req.userId;
    const problemId = req.problemId;

    try {
        const userProblem = await UserProblem.findOne({ userId });

        if (!userProblem) {
            return res.status(404).json({ message: "User does not have any problems added." });
        }

        // ✅ Remove the problem from the dictionary
        if (userProblem.problems.has(problemId)) {
            userProblem.problems.delete(problemId);
            await userProblem.save();
            res.status(200).json({ message: "Problem deleted successfully." });
        } else {
            res.status(404).json({ message: "Problem not found in user's list." });
        }
    } catch (error) {
        console.error("Error in deleteProblem:", error);
        res.status(500).json({ message: "Error deleting problem." });
    }
}

/**
 * Get All Problems for a User
 */

// export async function getProblems(req, res) {
//     const userId = req.userId;

//     try {
//         const userProblems = await UserProblem.findOne({ userId });

//         if (!userProblems) {
//             return res.status(404).json({ message: "No problems found for this user." });
//         }

//         // Convert the Map to a standard object and send it back
//         const problems = Array.from(userProblems.problems.entries()).map(([problemId, revisited]) => ({
//             problemId,
//             revisited
//         }));



//         res.status(200).json({ problems });
//     } catch (error) {
//         console.error("Error in getProblems:", error);
//         res.status(500).json({ message: "Error fetching problems." });
//     }
// }

/**
 * Get All Problems for a User with Complete Details
 */
export async function getProblems(req, res) {

    const userId = req.userId;

    try {
        const userProblems = await UserProblem.findOne({ userId });

        if (!userProblems) {
            return res.status(200).json({ problems: [] });
        }

        // Fetch the list of problemIds from the user's problem map with pagination
        const problemIds = Array.from(userProblems.problems.keys());

        // Fetch the full problem details using the collected problemIds
        const problems = await Problem.find({ _id: { $in: problemIds } });

        // Transform the result to include title, platform, link, rating, difficulty, tags, and revisited
        const enrichedProblems = problems.map(problem => ({
            id: problem._id,
            title: problem.title,
            platform: problem.platform,
            link: problem.link,
            rating: problem.rating || "Unknown",
            difficulty: problem.difficulty,
            tags: problem.tags,
            revisited: userProblems.problems.get(problem._id.toString())  // Fetch revisited status from map
        }));

        res.status(200).json({ problems: enrichedProblems });
    } catch (error) {
        console.error("Error in getProblems:", error);
        res.status(500).json({ message: "Error fetching problems." });
    }
}

/**
 * Helper Function to Add a Problem to the Database
 */
async function addProblemToDb(data) {
    const problem = new Problem({
        title: data.title,
        platform: data.platform,
        link: data.link,
        difficulty: data.difficulty,
        tags: data.tags
    });

    const savedProblem = await problem.save();
    return savedProblem;
}

/**
 * Helper Function to Add Problem to User's Map
 */
async function addProblemToUser(userId, problemId, revisited = false) {
    try {
        let userProblem = await UserProblem.findOne({ userId });

        if (!userProblem) {
            userProblem = new UserProblem({ userId });
        }

        // ✅ Adding the problem with revisit status
        userProblem.problems.set(problemId.toString(), revisited);
        await userProblem.save();
        return true;

    } catch (error) {
        console.error("Error in addProblemToUser:", error);
        return false;
    }
}