import jwt from 'jsonwebtoken';
import { TokenPayload } from '@/types/auth';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || '';
const JWT_REFRESH_SECRET = process.env.NEXT_PUBLIC_JWT_REFRESH_SECRET || '';

export const generateTokens = (payload: TokenPayload) => {
  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}; 