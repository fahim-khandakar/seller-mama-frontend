import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  description: z
    .array(z.string().min(1, 'Description cannot be empty'))
    .min(1, 'At least one description is required'),
  basePrice: z.coerce.number().min(1, 'Base price is required'),
  discountPrice: z.coerce.number().optional(),
  isActive: z.boolean().default(true), // ✅ fixed
});

export type ProductFormData = z.infer<typeof productSchema>;

export const headerForProduct = [
  'Name',
  'Type',
  'Base Price',
  'Stock',
  'Status',
  'Created Date',
  'Delete',
];
export const tableLayout = [
  'item?.name',
  'item?.type?.name',
  'item?.basePrice',
  'item?.totalStock',
  'item?.isActive ? "Active" : "Inactive"',
  'item?.createdAt?.slice(0,10)',
];

export const keys = ['searchTerm'];
