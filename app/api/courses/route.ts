import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Extract title, categoryId, subCategoryId, and tags from the request body
    const { title, categoryId, subCategoryId, tags } = await req.json();

    // Create a new course entry in the database
    const newCourse = await db.course.create({
      data: {
        title,
        categoryId,
        subCategoryId,
        instructorId: userId,
        tags: tags.join(", "), // Store tags as a comma-separated string
      },
    });

    return NextResponse.json(newCourse, { status: 200 });
  } catch (err) {
    console.log("[courses_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
