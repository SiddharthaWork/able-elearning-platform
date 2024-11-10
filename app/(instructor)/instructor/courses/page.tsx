import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { DataTable } from "@/components/custom/DataTable";
import { columns } from "@/components/courses/Columns";

const CoursesPage = async () => {
  const { userId } = auth();;

  if (!userId) {
    // Redirect to sign in if the user is not logged in
    return redirect("/admin/signin");
  }

  const user = await currentUser();

  if (!user || !user.emailAddresses.length) {
    // Redirect to sign in if user info is not available
    return redirect("/admin/signin");
  }

  // Check if the user email is able@gmail.com
  const primaryEmail = user.emailAddresses[0]?.emailAddress;

  if (primaryEmail !== "siddharthashresthasir@gmail.com") {
    // Redirect to a different page if the user is not authorized
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      instructorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="px-6 py-4">
      <Link href="/instructor/create-course">
        <Button>Create New Course</Button>
      </Link>

      <div className="mt-5">
        <DataTable columns={columns} data={courses} />
      </div>
    </div>
  );
};

export default CoursesPage;
