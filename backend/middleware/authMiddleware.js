import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// export async function authorizationMiddleware(req,res,next){

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if(!token){
//         res.status(403).json({
//             "message" : "Invalid Authentication Token"
//         });
//     }
//     console.log(token);
//     try{
//         console.log("Inside")
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(decoded);
//         req.userId = decoded.userId;

//         next();
//     }catch(err){
//         console.log("authMiddleware.sj:authorizationMiddleware:An error Occured", err);
//         res.status(500).json({
//             "message" : "An Error Occured on Our Side"
//         });
//     }
// }

export async function authorizationMiddleware(req, res, next){
    console.log(req.headers);
    const userId = req.headers.userid;
    
    if(!userId){
        res.status(403).json({
            "message" : "Invalid User Id"
        });
    }

    req.userId = userId;
    next();
}



