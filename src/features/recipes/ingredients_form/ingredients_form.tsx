"use client";

import {
  CATEGORY_OPTIONS,
  UNIT_OPTIONS,
} from "@/src/shared/constants/select-ingredients";
import { Button } from "@/src/shared/ui/Button/button";
import { useRecipesStore } from "@/src/shared/store/recipesStore";
import { useState, useTransition } from "react";
import { createRecipe } from "../actions/ingredients";
import { toast } from "sonner";
// import { CATEGORY_OPTIONS } from "@/src/shared/constants/categories";
// import { UNIT_OPTIONS } from "@/src/shared/constants/units";

export const RecipeForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { loadUserRecipes } = useRecipesStore();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    unit: "",
    pricePerUnit: "",
    // image: String,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (form: FormData) => {
    startTransition(async () => {
      const result = await createRecipe(form);
      if (result?.error) {
        setError(result.error);
      } else {
        setError(null);
        toast.success("Ingredient successfully added ✅");
        loadUserRecipes();
        setForm({
          name: "",
          description: "",
          category: "",
          unit: "",
          pricePerUnit: "",
          // image: String,
        });
      }
    });
  };

  return (
    <form
      action={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow space-y-6"
    >
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* Title */}
      <div>
        <label className="block mb-1 font-medium">Recipe Title</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Kung Pao Chicken"
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description of the recipe..."
          className="w-full border rounded-lg px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select category</option>
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Unit */}
      <div>
        <label className="block mb-1 font-medium">Unit</label>
        <select
          name="unit"
          value={form.unit}
          onChange={handleChange}
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">Select unit</option>
          {UNIT_OPTIONS.map((unit) => (
            <option key={unit.value} value={unit.value}>
              {unit.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="block mb-1 font-medium">Price per Unit ($)</label>
        <input
          name="pricePerUnit"
          type="number"
          min={0}
          step="0.01"
          value={form.pricePerUnit}
          onChange={handleChange}
          placeholder="5.99"
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Image */}
      {/* <div>
        <label className="block mb-1 font-medium">Recipe Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {form.image && (
          <p className="text-sm text-gray-500 mt-1">
            Selected: {form.image.name}
          </p>
        )}
      </div> */}

      {/* Submit */}
      <Button
        type="submit"
        className="w-full  text-white py-2 rounded-lg hover:bg-orange-600 transition"
        isLoading={isPending}
      >
        Create Recipe 🍜
      </Button>
    </form>
  );
};
