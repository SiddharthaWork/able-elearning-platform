export interface Course {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
    isPublished: boolean;
    categoryId: string;
    subCategoryId: string;
    levelId?: string;
    tags: string;
    // Add any other properties you might need
  }