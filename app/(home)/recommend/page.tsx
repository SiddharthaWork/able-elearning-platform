// app/(user)/learning/page.tsx
import CourseCard from "@/components/courses/CourseCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"; // Import your carousel components
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ClientCarousel from "@/components/custom/ClientCarousel";
// Cosine similarity function

const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// Vectorize the course data (tags and subcategory)
const vectorizeCourse = (course: any) => {
  const tags = course.tags.split(',').map((tag: string) => tag.trim().toLowerCase());
  const subCategory = course.subCategory?.name.toLowerCase(); // Optional chaining
  return [...tags, subCategory];
};

const Recommend = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/sign-in');
  }

  // Fetch all purchased courses
  const purchasedCourses = await db.purchase.findMany({
    where: {
      customerId: userId,
    },
    select: {
      course: {
        include: {
          category: true,
          subCategory: true,
          sections: {
            where: {
              isPublished: true,
            },
          },
        },
      },
    },
  });

  // Ensure we have purchased courses
  if (!purchasedCourses.length) {
    return <div className="px-16 text-2xl font-bold text-gray-600"></div>;
  }

  // Get purchased course IDs and their vector data for similarity
  const purchasedCourseIds = purchasedCourses.map(purchase => purchase.course.id);
  const purchasedVectors = purchasedCourses.map(purchase => {
    const vector = vectorizeCourse(purchase.course);
    return {
      course: purchase.course,
      vector,
    };
  });

  // Fetch all other courses for recommendations
  const allCourses = await db.course.findMany({
    where: {
      isPublished: true,
      id: {
        notIn: purchasedCourseIds,
      },
    },
    include: {
      category: true,
      subCategory: true,
    },
  });

  // Collect recommended courses based on tags and sub-category from purchased courses
  let recommendedCourses: any[] = [];

  // For each purchased course, find similar courses
  purchasedVectors.forEach(purchased => {
    const purchasedVector = purchased.vector;

    // Calculate similarity for each non-purchased course
    allCourses.forEach(course => {
      const courseVector = vectorizeCourse(course);
      const similarity = cosineSimilarity(purchasedVector, courseVector);
      
      if (similarity > 0.05 || (purchased.vector.some(tag => course.tags.includes(tag)) 
        || purchased.course.subCategory?.name.toLowerCase() === course.subCategory?.name.toLowerCase())) {
        recommendedCourses.push(course);
      }
    });
  });

  // Remove duplicates and keep top 5 recommendations
  recommendedCourses = Array.from(new Set(recommendedCourses.map(course => course.id)))
    .slice(0, 5) // Get top 5 recommendations
    .map(id => allCourses.find(course => course.id === id))
    .filter(course => course); // Filter out any undefined courses

  return (
     <div className="flex flex-col items-center justify-center md:mt-5 md:px-10 xl:px-16">
    <h2 className="text-2xl font-bold mt-10 text-center pr-8">Recommended Courses</h2>
    <ClientCarousel recommendedCourses={recommendedCourses} />
  </div>
  );
};

export default Recommend;
