import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ error: 'Access Denied' });
    }
    next();
  };
};
