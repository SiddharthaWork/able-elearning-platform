"use client";

import { useAuth, SignOutButton } from "@clerk/nextjs";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";


const AdminTopbar = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.push("/admin/signin"); // Redirect to the /admin/signin page
  };

  const topRoutes = [
    { label: "Admin", path: "/instructor/courses" },
  ];

  const sidebarRoutes = [
    { label: "Courses", path: "/instructor/courses" },
    {
      label: "Performance",
      path: "/instructor/performance",
    },
  ];

  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    setSearchInput("");
  };

  return (
    <div className="flex justify-between items-center p-4">
      <Link href="/instructor/courses">
        <Image src="/logo10.png" height={100} width={200} alt="logo" />
      </Link>


      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className="text-sm font-medium hover:text-[#FDAB04]"
            >
              {route.label}
            </Link>
          ))}
        </div>

        <div className="z-20 sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 text-lg">
                {topRoutes.map((route) => (
                  <Link
                    href={route.path}
                    key={route.path}
                    className="text-lg font-large hover:text-[#FDAB04]"
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
              
              {pathName.startsWith("/instructor") && (
                <div className="flex flex-col gap-4">
                  {sidebarRoutes.map((route) => (
                    <Link
                      href={route.path}
                      key={route.path}
                      className="text-sm font-medium hover:text-[#FDAB04]"
                    >
                      {route.label}
                    </Link>
                  ))}
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {isSignedIn ? (
          <Button onClick={handleSignOut}>
          Sign Out
        </Button>
        ) : (
          <Link href="/admin/signin">
            <Button>Sign In</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminTopbar;
