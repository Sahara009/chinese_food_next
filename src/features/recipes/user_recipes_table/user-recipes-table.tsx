"use client";

import { useRecipesStore } from "@/src/shared/store/recipesStore";
import { Button } from "@/src/shared/ui/Button/button";
import { useEffect } from "react";
import { toast } from "sonner";

const unitLabels: Record<string, string> = {
  GRAM: "г",
  KILOGRAM: "кг",
  MILLILITER: "мл",
  LITER: "л",
  TEASPOON: "ч.л.",
  TABLESPOON: "ст.л.",
  CUP: "стакан",
  PIECE: "шт",
  PINCH: "щепотка",
};

const categoryLabels: Record<string, string> = {
  VEGETABLES: "Овощи",
  MEAT: "Мясо",
  CHICKEN: "Курица",
  SEAFOOD: "Морепродукты",
  NOODLES: "Лапша",
  RICE: "Рис",
  DUMPLINGS: "Пельмени/Димсамы",
  SOUPS: "Супы",
  STREET_FOOD: "Уличная еда",
  SPICY: "Острое",
  DESSERTS: "Десерты",
  SAUCES: "Соусы",
  TOFU: "Тофу",
  VEGAN: "Веган",
  SICHUAN: "Сычуаньская кухня",
  CANTONESE: "Кантонская кухня",
  BEIJING: "Пекинская кухня",
};

export const UserRecipesTable = () => {
  const { userIngredients, loadUserRecipes, removeIngrediant, isLoading } =
    useRecipesStore();

  useEffect(() => {
    loadUserRecipes();
  }, [loadUserRecipes]);

  const handleDelete = async (id: string, name: string | null) => {
    await removeIngrediant(id);
    toast.success(`"${name ?? "Рецепт"}" удален`);
  };

  if (isLoading && userIngredients.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p className="text-center text-gray-500">Загрузка...</p>
      </div>
    );
  }

  if (userIngredients.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Мои рецепты</h2>
        <p className="text-gray-500 text-center py-8">
          У вас пока нет созданных рецептов. Создайте первый рецепт выше!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Мои рецепты</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 uppercase bg-gray-50">
            <tr>
              <th className="px-4 py-3 rounded-tl-lg">Название</th>
              <th className="px-4 py-3">Категория</th>
              <th className="px-4 py-3">Единица</th>
              <th className="px-4 py-3">Цена за ед.</th>
              <th className="px-4 py-3">Описание</th>
              <th className="px-4 py-3 rounded-tr-lg text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {userIngredients.map((ing, idx) => (
              <tr
                key={ing.id}
                className={`border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-orange-50 transition`}
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {ing.name ?? "—"}
                </td>
                <td className="px-4 py-3">
                  {categoryLabels[ing.category] ?? ing.category}
                </td>
                <td className="px-4 py-3">
                  {unitLabels[ing.unit] ?? ing.unit}
                </td>
                <td className="px-4 py-3">
                  {ing.pricePerUnit !== null
                    ? `$${ing.pricePerUnit.toFixed(2)}`
                    : "—"}
                </td>
                <td
                  className="px-4 py-3 max-w-xs truncate"
                  title={ing.description}
                >
                  {ing.description}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(ing.id, ing.name)}
                    disabled={isLoading}
                  >
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
