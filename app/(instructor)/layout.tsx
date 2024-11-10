import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";
import AdminTopbar from "@/components/layout/AdminTopbar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()
  if (!userId) {
    return redirect("/admin/signin")
  }
  

  return (
    <div className="h-full flex flex-col">
      <AdminTopbar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default InstructorLayout;
