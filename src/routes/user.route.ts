import { Router } from "express";
import { userService } from "../services/users/user.service";


const userRouter = Router();

userRouter.get("/", async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json({ message: "users retrieved successfully", data: users });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });      
    }
});

export default userRouter;