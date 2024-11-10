// lib/featureExtraction.ts

import { prisma } from '../lib/prisma'; // Adjust the path as needed

export async function getCourseFeatures(courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: {
      category: true,
      subCategory: true,
      level: true,
    },
  });

  return {
    title: course?.title,
    description: course?.description,
    category: course?.category?.name,
    subCategory: course?.subCategory?.name,
    level: course?.level?.name,
  };
}
