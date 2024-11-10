import { SignIn } from "@clerk/nextjs";
import Link from "next/link"; // Import Next.js Link component

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          elements: {
            socialButtonsBlockButton: {
              display: "none",
            },
            socialButtonsBlock: {
              display: "none",
            },
            dividerRow: {
              display: "none",
            },
            footerAction__havingTrouble: {
              display: "none",
            },
          },
        }}
      />
      
      {/* Admin Login link */}
      <Link
        href="/admin/signin"
        className="mt-4 self-end mr-4 text-sm hover:text-[#FDAB04] "
      >
        Admin Login
      </Link>
    </div>
  );
}
