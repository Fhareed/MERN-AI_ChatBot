import User from "../models/User.js";
import { hash, compare } from 'bcrypt';
export const getAllUsers = async (req, res, next) => {
    //get all users 
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    //get all users 
    try {
        //user signup
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already exists");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    //get all users 
    try {
        //user login
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('User does not exist');
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }
        return res.status(200).json({ message: "OK", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map