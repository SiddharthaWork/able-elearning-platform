import CourseCard from "@/components/courses/CourseCard";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// Cosine similarity function
const cosineSimilarity = (vecA: number[], vecB: number[]) => {
  const dotProduct = vecA.reduce((sum, val, idx) => sum + val * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val ** 2, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val ** 2, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

// Vectorize the course data (tags and subcategory)
const vectorizeCourse = (course : any ) => {
  const tags = course.tags.split(',').map((tag: any) => tag.trim().toLowerCase());
  const subCategory = course.subCategory?.name.toLowerCase(); // Optional chaining
  return [...tags, subCategory];
};

const LearningPage = async () => {
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

  // console.log('Purchased Courses:', purchasedCourses); // Debugging log

  // Ensure we have purchased courses
  if (!purchasedCourses.length) {
    return <div className="px-12 text-2xl font-bold">No purchased courses found.</div>;
  }

  // Get purchased course IDs and their vector data for similarity
  const purchasedCourseIds = purchasedCourses.map(purchase => purchase.course.id);
  const purchasedVectors = purchasedCourses.map(purchase => {
    const vector = vectorizeCourse(purchase.course);
    // console.log('Purchased Course Vector:', vector); // Log each vector
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

  // console.log('All Courses:', allCourses); // Debugging log

  // Collect recommended courses based on tags and sub-category from purchased courses
  let recommendedCourses: any[] = [];

  // For each purchased course, find similar courses
  purchasedVectors.forEach(purchased => {
    const purchasedVector = purchased.vector;

    // Calculate similarity for each non-purchased course
    allCourses.forEach(course => {
      const courseVector = vectorizeCourse(course);
      const similarity = cosineSimilarity(purchasedVector, courseVector);
      
      // Log similarity
      // console.log(`Similarity between ${purchased.course.title} and ${course.title}:`, similarity); 

      // Lower similarity threshold to allow more recommendations
      if (similarity > 0.05 || (purchased.vector.some(tag => course.tags.includes(tag)) || purchased.course.subCategory?.name.toLowerCase() === course.subCategory?.name.toLowerCase())) {
        recommendedCourses.push(course);
      }
    });
  });

  // console.log('Recommended Courses:', recommendedCourses); // Debugging log

  // Remove duplicates and keep top 5 recommendations
  recommendedCourses = Array.from(new Set(recommendedCourses.map(course => course.id)))
    .slice(0, 5) // Get top 5 recommendations
    .map(id => allCourses.find(course => course.id === id))
    .filter(course => course); // Filter out any undefined courses

  return (
    <div className="px-4 py-6 md:mt-5 md:px-10 xl:px-16">
      <h1 className="text-2xl font-bold">Your courses</h1>
      <div className="flex flex-wrap gap-7 mt-7">
        {purchasedCourses.map((purchase) => (
          <CourseCard key={purchase.course.id} course={purchase.course} />
        ))}
      </div>

      {/* Display recommended courses */}
      <h2 className="text-2xl font-bold mt-10">Recommended Courses</h2>
      <div className="flex flex-wrap gap-7 mt-7">
        {recommendedCourses.map((course) => (
          course ? <CourseCard key={course.id} course={course} /> : null
        ))}
      </div>
    </div>
  );
};

export default LearningPage;
