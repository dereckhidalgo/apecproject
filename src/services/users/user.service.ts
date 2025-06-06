import { CreateUserDto } from "../../DTOs/Users/createUserDto";
import { LoginUserRequestDto, LoginUserResponseDto } from "../../DTOs/Users/loginUserDto";
import { User } from "@prisma/client";
import { userRepository } from "../../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { envs } from "../../config/envs.config";


class UserService {

    async addUser(userData: CreateUserDto): Promise<User> {
        Validation.username(userData.username);
        Validation.password(userData.password);

        const user = userData as User;

        const existingUser = await userRepository.getByUsername(userData.username);
        if (existingUser) { 
            throw new Error('Username already exists');
        }

        user.password = await bcrypt.hash(userData.password, 10);

        return await userRepository.addUser(user);
    }

    async loginUser(userReq: LoginUserRequestDto ): Promise<LoginUserResponseDto> {
        
        const user = await userRepository.getByUsername(userReq.username);
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(userReq.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign(
            { userId: user.id, username: user.username, roleId: user.roleId },
            envs.SECRET_KEY,
            {
                expiresIn: "1d",
            }
        );
        
        const response: LoginUserResponseDto = {
            email: user.email,
            username: user.username,
            roleId: user.roleId,
            token
        }

        return response;
    }

    async getAllUsers(): Promise<User[]> {
        return await userRepository.getAllUsers();
    }
}

class Validation {
    static username(username: string) {
        if (typeof username !== 'string') throw new Error('Username must be a string');
        if (username.length < 3) throw new Error('Username must be at least 3 characters long');
    }   

    static password(password: string) {
        if (typeof password !== 'string') throw new Error('Password must be a string');
        if (password.length < 6) throw new Error('Password must be at least 6 characters long');
    }
}

export const userService = new UserService();