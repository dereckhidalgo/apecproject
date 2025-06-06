import { Request, Response, NextFunction } from "express";
import { envs } from "../config/envs.config";
import jwt from "jsonwebtoken";


interface UserPayload {
  id: number;
  username: string;
  email: string;
}

interface AuthRequest extends Request {
  user?: UserPayload;
}

export const authValidator = (req: AuthRequest, res: Response, next: NextFunction): void => {

  //validate path if it is login or register
  if (req.path === '/login' || req.path === '/register') {
    next();
    return;
  }
    
  const authHeader = req.headers['authorization'] as string | undefined;
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    res.status(401).json({ 
      error: 'Token de acceso requerido',
      message: 'No se proporcionó un token de autorización'
    });
    return;
  }

  jwt.verify(token, envs.SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ 
        error: 'Token inválido',
        message: 'El token proporcionado no es válido o ha expirado'
      });
      return;
    }
    
    req.user = decoded as UserPayload;
  });

  next();

  }