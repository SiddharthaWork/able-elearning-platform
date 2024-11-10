// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Find the admin by email
  const admin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!admin) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // Set the session here if using session management
  return NextResponse.json({ success: true, message: 'Login successful' });
}

