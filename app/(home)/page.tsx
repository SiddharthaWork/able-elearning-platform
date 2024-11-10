import { db } from "@/lib/db";
import getCoursesByCategory from "../actions/getCourses";
import Categories from "@/components/custom/Categories";
import CourseCard from "@/components/courses/CourseCard";
import Recommend from "./recommend/page";
import { auth, currentUser } from "@clerk/nextjs/server";
// import { Userintrest } from "@/components/custom/Userintrest";

// Utility function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

export default async function Home() {
  // Fetch categories
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      subCategories: {
        orderBy: {
          name: "asc",
        },
      },
    },
  });

  // Fetch all courses
  const courses = await getCoursesByCategory(null);

  // Shuffle the courses array
  const shuffledCourses = shuffleArray(courses);

  // Slice to get first 8 courses and remaining courses
  const displayedCourses = shuffledCourses.slice(0, 8);
  const recommendedCourses = shuffledCourses.slice(8);

  // Assuming you have a user session with their purchased course details
  const userId = "current-user-id"; // Replace with actual user ID from session/context
  const lastPurchasedCourseId = await db.purchase.findFirst({
    where: { customerId: userId },
    orderBy: { createdAt: "desc" }, // Get the most recent purchase
    select: { courseId: true },
  });

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <Categories categories={categories} selectedCategory={null} />
      <Recommend />


      {/* All Courses Section */}
      <h2 className="mt-8 mb-10 pl-28 text-2xl font-bold bg-[#fdaa049e]">All Courses</h2> 
      <div className="flex flex-wrap gap-7 justify-start ml-16"> 
        {displayedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Recommended Courses Section */}
      {recommendedCourses.length > 0 && (
        <>
          <h2 className="mt-8 px-16 text-2xl font-bold"></h2>
          <div className="flex flex-wrap gap-7 justify-center">
            {recommendedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

        </>
      )}
    </div>
  );
}
