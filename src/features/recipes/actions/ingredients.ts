"use server";

import { prisma } from "@/server/prisma";
import { ingredientSchema } from "@/src/shared/config/zod_schema";
import { ZodError } from "zod";
import { auth } from "@/src/shared/lib/auth";

export async function createRecipe(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Требуется авторизация для создания рецепта" };
    }

    const priceRaw = formData.get("pricePerUnit") as string;
    const pricePerUnit =
      priceRaw && priceRaw.trim() !== "" ? parseFloat(priceRaw) : null;

    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      pricePerUnit:
        pricePerUnit !== null && !isNaN(pricePerUnit) ? pricePerUnit : null,
    };

    const validateData = ingredientSchema.parse(data);

    const ingredient = await prisma.ingredient.create({
      data: {
        name: validateData.name,
        unit: validateData.unit,
        description: validateData.description,
        pricePerUnit: validateData.pricePerUnit,
        category: validateData.category,
        userId: session.user.id,
      },
    });
    return { success: true, ingredient };
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: error.issues.map((e) => e.message).join(", ") };
    }
    console.error("Ошибка при создании рецепта", error);
    return { error: "Ошибка при создании рецепта" };
  }
}

export async function getAllRecipes() {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return { success: true, ingredients };
  } catch (error) {
    console.error(error);
    return { error: "Ошибка при получении рецептов" };
  }
}

export async function getUserRecipes() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Требуется авторизация", ingredients: [] };
    }

    const ingredients = await prisma.ingredient.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, ingredients };
  } catch (error) {
    console.error(error);
    return {
      error: "Ошибка при получении рецептов пользователя",
      ingredients: [],
    };
  }
}

export async function deleteRecipe(id: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Требуется авторизация для удаления рецепта" };
    }

    const existing = await prisma.ingredient.findUnique({
      where: { id },
    });

    if (!existing) {
      return { error: "Рецепт не найден" };
    }

    if (existing.userId !== session.user.id) {
      return { error: "У вас нет прав на удаление этого рецепта" };
    }

    const ingredient = await prisma.ingredient.delete({
      where: {
        id,
      },
    });

    return { success: true, ingredient };
  } catch (error) {
    console.error(error);
    return { error: "Ошибка при удалении рецепта" };
  }
}
