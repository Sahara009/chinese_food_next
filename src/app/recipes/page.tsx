import { RecipeForm } from "@/src/features/recipes/ingredients_form/ingredients_form";
import { Title } from "@/src/shared/ui/Title/Title";
import React from "react";

const RecipesPage = () => {
  return (
    <div>
      <div className="text-center space-y-4 animate-fade-in">
        <Title
          size="xl"
          className=" mt-15 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
        >
          RECEPIS
        </Title>
      </div>
      <RecipeForm />
    </div>
  );
};

export default RecipesPage;
