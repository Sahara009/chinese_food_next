"use server";

import { prisma } from "@/server/prisma";
import { ingredientSchema } from "@/src/shared/config/zod_schema";
import { ZodError, success } from "zod";

export async function createRecipe(formData: FormData) {
  try {
    console.log(formData);

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit: formData.get("pricePerUnit")
        ? parseFloat(formData.get("pricePerUnit") as string)
        : null,
    };

    const validateData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validateData.name,
        unit: validateData.unit,
        description: validateData.description,
        pricePerUnit: validateData.pricePerUnit,
        category: validateData.category,
      },
    });
    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.errors.map((e) => e.message).join(", ") };
    }
    console.log("Ошибка при создании рецепта");
  }
}
