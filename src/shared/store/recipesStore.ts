import { IIngredients } from "@/src/entities/recipes/types/types";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getUserRecipes,
} from "@/src/features/recipes/actions/ingredients";
import { create } from "zustand";

interface IRecipeState {
  ingredients: IIngredients[];
  userIngredients: IIngredients[];
  isLoading: boolean;
  error: string | null;
  loadIngrediants: () => Promise<void>;
  loadUserRecipes: () => Promise<void>;
  addIngredient: (formData: FormData) => Promise<void>;
  removeIngrediant: (id: string) => Promise<void>;
}
export const useRecipesStore = create<IRecipeState>((set) => ({
  ingredients: [],
  userIngredients: [],
  isLoading: false,
  error: null,
  loadIngrediants: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getAllRecipes();
      if (result.success) {
        set({ ingredients: result.ingredients, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: null });
      console.log(error);
    }
  },
  loadUserRecipes: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getUserRecipes();
      if (result.success) {
        set({ userIngredients: result.ingredients, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: null });
      console.log(error);
    }
  },
  addIngredient: async (formData: FormData) => {
    set({ isLoading: true, error: null });

    try {
      const result = await createRecipe(formData);

      if (result?.success && result.ingredient) {
        const ingredient: IIngredients = result.ingredient;

        set((state) => ({
          ingredients: [...state.ingredients, ingredient],
          userIngredients: [...state.userIngredients, ingredient],
          isLoading: false,
        }));
      } else {
        set({ error: result?.error, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: null });
      console.log(error);
    }
  },
  removeIngrediant: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const result = await deleteRecipe(id);

      if (result?.success) {
        set((state) => ({
          ingredients: state.ingredients.filter((ing) => ing.id !== id),
          userIngredients: state.userIngredients.filter((ing) => ing.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: result?.error, isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false, error: null });
      console.log(error);
    }
  },
}));
