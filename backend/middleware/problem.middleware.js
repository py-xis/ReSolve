import zod from 'zod';

const addProblemSchema = zod.object({
    title: zod.string(),
    platform : zod.string(),
    link: zod.string().url(),
    difficulty: zod.union([zod.number(), zod.string()]),
    tags: zod.array(zod.string())
});

// const getProblemsSchema = zod.object({
//     platform: zod.string(),
//     difficulty: zod.number() || zod.string(),
//     tags: zod.array(zod.string())
// });

export function addProblemMiddleware(req, res, next){
    // Add your code here
    try{
        console.log(req.body);
        const isValid = addProblemSchema.safeParse(req.body);
        if(isValid.success){
            req.data = isValid.data;
            next();
        }else{
            res.status(400).json({"message": "Incorrect data format"});
        }
    }
    catch(err){
        res.status(400).json({"message": "An Error Occured"});
    }
}

export function requireProblemId(req, res, next){

    const problemId = req.body.problemId;
    console.log(problemId);
    if(problemId) {
        req.problemId = problemId;
        next();
    } else {
        res.status(400).json({ "message": "Problem Id is required" });
    }
}

// export function getProblemsMiddleware(req, res, next){
//     // Add your code here
//     next();
// }