// src/app/api/auth/register/route.ts
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import { NextResponse } from 'next/server'; // Import Next.js response
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    // Parse the request body to get email and password
    const { email, password } = await request.json();

    // Check if an admin with the provided email already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
    }

    // Hash the password using bcrypt with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new admin with the hashed password
    const newAdmin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the new admin data as a response
    return NextResponse.json({ success: true, admin: newAdmin }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
