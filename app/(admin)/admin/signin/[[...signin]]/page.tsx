import { SignIn } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Admin Login Header */}
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>

      {/* SignIn Component */}
      <SignIn
        redirectUrl="/instructor/courses" // Redirect after successful login
        routing="path" // or "hash" if using hash-based routing
        path="/admin/signin"
        appearance={{
          elements: {
            socialButtonsBlockButton: {
              display: "none",
            },
            socialButtonsBlock: {
              display: "none",
            },
            footerAction__signIn: {
              display: "none",
            },
            footerAction: {
              display: "none",
            },
            dividerRow: {
              display: "none",
            },
            headerSubtitle: {
              display: "none",
            },
          },
        }}
      />

      {/* User Login Link positioned below the form */}
      <Link
        href="/sign-in"
        className="mt-4  ml-80 text-sm hover:text-[#FDAB04]"
      >
        User Login
      </Link>
    </div>
  );
};

export default Page;
