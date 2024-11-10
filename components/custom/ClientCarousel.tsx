// /components/ui/ClientCarousel.tsx

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel"; // Ensure your Carousel imports are correct
import CourseCard from "@/components/courses/CourseCard"; // Adjust the import based on your structure

type Course = {
    id: string;
    instructorId: string;
    title: string;
    subtitle: string | null;
    description: string | null;
    imageUrl: string | null;
    price: number | null;
    isPublished: boolean;
    categoryId: string;
    subCategoryId: string;
    levelId: string | null;
    tags: string;
    createdAt: Date;
    updatedAt: Date;
    instructor: {
      id: string;
      name: string;
    };
};
const ClientCarousel = ({ recommendedCourses = [] }: { recommendedCourses: Course[] }) => {
  if (recommendedCourses.length === 0) {
    return <div>No recommended courses available.</div>;
  }

  return (
    <div className="max-w-sm my-8 pl-4"> {/* Adjust max width and styling */}
      <Carousel>
        <CarouselPrevious />
        <CarouselContent>
          {recommendedCourses.map(course => (
            <CarouselItem key={course.id}>
              <CourseCard course={course} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ClientCarousel;
