// app/components/SignIn.tsx
"use client"; // Make sure to mark it as a client component

import { SignIn } from "@clerk/nextjs"; // or your custom sign-in component

const SignInComponent = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignIn />
    </div>
  );
};

export default SignInComponent;