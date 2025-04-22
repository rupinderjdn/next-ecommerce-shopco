import { promises as fs } from 'fs';
import path from 'path';
import { LoginCredentials, AuthResponse, TokenPayload } from '@/types/auth';
import { generateTokens } from '@/utils/jwt';
import bcrypt from 'bcryptjs';

const USERS_FILE_PATH = path.join(process.cwd(), 'src/database/users.json');

export class AuthService {
  private static async getUsers() {
    const fileContent = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    return JSON.parse(fileContent);
  }

  static async validateUser(credentials: LoginCredentials): Promise<AuthResponse | null> {
    try {
      const users = await this.getUsers();
      const user = users.find((u: any) => u.email === credentials.email);

      if (!user) {
        return null;
      }

      // In a real application, you should use bcrypt.compare
      // const isValidPassword = await bcrypt.compare(credentials.password, user.password);
      const isValidPassword = credentials.password === user.password; // Temporary for demo

      if (!isValidPassword) {
        return null;
      }

      const tokenPayload: TokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
      };

      const { accessToken, refreshToken } = generateTokens(tokenPayload);

      // In a real application, you would store the refresh token in a database
      // and associate it with the user

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      };
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }
} 