import User from "../models/user.model.js"; 
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import getAvatarUrl from "../utils/generateAvatar.js";

export async function signup(req, res){
    const data = req.signupData;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userExists = await User.findOne({ email: data.email });

    if(userExists){
        return res.status(409).json({
            "message": "User with that email already exists",
        });
    }

    const avatarUrl = getAvatarUrl(data.name);
    console.log(avatarUrl)
    console.log(typeof avatarUrl);
    const newUser = new User({
        fullName: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        profilePicture : avatarUrl,
    });

    console.log(newUser.profile);
    console.log(newUser);
    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json({
            "message": "User created successfully",
            "data": generateToken(savedUser._id),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "message": "An error occured",
        });
    }
}

export async function signin(req, res){
    try{
        const data = req.signinData;

        const user = await User.findOne({ email: data.email });

        if(!user){
            return res.status(404).json({
                "message": "User with that email does not exist",
            });
        }
        const validPassword = await bcrypt.compare(data.password, user.password);

        if(!validPassword){
            return res.status(401).json({
                "message": "Invalid password",
            });
        }

        res.status(200).json({
            "message": "User signed in successfully",
            "data": generateToken(user._id),
        }); 

    }catch(error){
        console.log(error);
        res.status(500).json({
            "message": "An error occured",
        });
    }
}


export async function googleFirebase(req, res){
    console.log(req.user);
    const user = req.user;

    const userExists = await User.findOne({ email: user.email });

    if(userExists){
        const userId = userExists._id;
        res.status(200).json({ 
                message: "Access granted",
                uid   : userId 
            });
    }else{
        const newUser = new User({
            fullName: user.name,
            email: user.email,
            profilePicture: user.picture,
        });

        try {
            const savedUser = await newUser.save();
            const userId = savedUser._id;
            res.status(200).json({ 
                message: "Access granted",
                uid   : userId 
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                "message": "An error occured",
            });
        }
    }
}