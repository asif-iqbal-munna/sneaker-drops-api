import dayjs from "dayjs";
import { z } from "zod";

export const dropCreationSchema = z
  .object({
    name: z
    .string({ message: "Name is required" })
    .trim()
    .min(1, "Name is required"),
    
    price: z.coerce
      .number({ message: "Price is required" })
      .min(0, "Price cannot be negative"),
    
    total_stock: z.coerce
      .number({ message: "Total stock is required" })
      .int()
      .min(1, "Total stock must be at least 1"),
    
    drops_date: z.iso
      .datetime({ local: true })
      .nullable()
      .optional(),
  })
  .refine((data) => {
    if(!data.drops_date) return true
    return dayjs(data.drops_date).isAfter(dayjs())
  }, {
    message: "Invalid drop date",
    path: ["drops_date"],
  });