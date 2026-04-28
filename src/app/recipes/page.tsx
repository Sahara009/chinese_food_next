import { RecipeForm } from "@/src/features/recipes/ingredients_form/ingredients_form";
import { UserRecipesTable } from "@/src/features/recipes/user_recipes_table/user-recipes-table";
import { auth } from "@/src/shared/lib/auth";
import { Title } from "@/src/shared/ui/Title/Title";
import Link from "next/link";
import React from "react";

const RecipesPage = async () => {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4 animate-fade-in">
        <Title
          size="xl"
          className="mt-15 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
        >
          RECIPES
        </Title>
      </div>

      {isAuthenticated ? (
        <>
          <RecipeForm />
          <UserRecipesTable />
        </>
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow text-center space-y-4">
          <p className="text-gray-600">
            Чтобы создавать и управлять рецептами, необходимо войти в систему.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center rounded-4xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition"
            >
              Log in
            </Link>
            <Link
              href="/auth/registration"
              className="inline-flex items-center justify-center rounded-4xl border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesPage;
