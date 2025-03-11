import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        // Get email and password from request body
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Read users from JSON file
        const usersPath = path.join(process.cwd(), 'src/database/users.json');
        const usersData = fs.readFileSync(usersPath, 'utf-8');
        const users = JSON.parse(usersData);

        // Find user with matching email and password
        const user = users.find(
            (u: any) => u.email === email && u.password === password
        );

        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Return success with user data (excluding password)
        const { password: _, ...userWithoutPassword } = user;
        return NextResponse.json({
            message: 'Authentication successful',
            user: userWithoutPassword
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
