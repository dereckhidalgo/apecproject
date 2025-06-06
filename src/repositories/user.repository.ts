import { db } from "../config/database";
import { User } from "@prisma/client";
import { PrismaErrorHandler } from "../utils/prisma-error-handler";



class UserRepository {
    async getAllUsers(): Promise<User[]> {
        try {
            return await db.user.findMany();
        } catch (error) {
            const prismaError = PrismaErrorHandler.handleError(error as Error);
            throw new Error("Error retrieving users: " + prismaError.message);
        }
    }

    async getUserById(id: number): Promise<User | null> {
        try {
            return await db.user.findUnique({ where: { id } });
        } catch (error) {
            const prismaError = PrismaErrorHandler.handleError(error as Error);
            throw new Error("Error retrieving user by ID: " + prismaError.message);
        }
    }

    async addUser(userData: Omit<User, 'id'>): Promise<User> {
        try {
            return await db.user.create({ data: userData });
        } catch (error) {
            const prismaError = PrismaErrorHandler.handleError(error as Error);
            throw new Error("Error adding user: " + prismaError.message);
        }
    }

    async getByUsername(username: string): Promise<User | null> {
        try {
            return await db.user.findFirst({ 
                where: { username },
                include: { role: true } 
            });
        } catch (error) {
            const prismaError = PrismaErrorHandler.handleError(error as Error);
            throw new Error("Error retrieving user by username: " + prismaError.message);
        }
    }
}

export const userRepository = new UserRepository();