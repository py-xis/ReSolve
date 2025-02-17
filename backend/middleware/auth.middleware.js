import zod from "zod";

const signupSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
    name: zod.string().min(3),
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6),
});

export async function signupMiddleware(req, res, next){
    try {
        console.log(req.body);
        const isValid = signupSchema.safeParse(req.body);
        // console.log(isValid);
        if(isValid.success){
            req.signupData = isValid.data;
            next();
        }else{
            res.status(422).json({
                "message": "The data you provided is invalid",
            })
        }
    } catch (error) {
        res.status(500).json({ "message": "An Error Occured" });
    }
}

export async function signinMiddleware(req, res, next){
    try {
        // console.log(req.body);
        const isValid = signinSchema.safeParse(req.body);
        // console.log(isValid);
        if(isValid.success){
            req.signinData = isValid.data;
            next();
        }else{
            res.status(422).json({
                "message": "The data you provided is invalid",
            })
        }
    } catch (error) {
        res.status(500).json({ "message": "An Error Occured" });
    }
}

// export async function signoutMiddleware(req, res, next){

// }