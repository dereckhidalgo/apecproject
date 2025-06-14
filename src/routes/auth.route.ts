import { Router } from "express";
import { userService } from "../services/users/user.service";


const authRouter = Router();

authRouter.post("/register", async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.addUser(userData);
        res.status(201).json({ message: "user created successfully" , data: newUser });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

authRouter.post("/login", async (req, res) => {
    const userReq = req.body;
    try {
        const userResponse = await userService.loginUser(userReq);
        res.status(200).json({ message: "user logged in successfully", data: userResponse });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});


export default authRouter;